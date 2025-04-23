const { Storage } = require('@google-cloud/storage'),
    sharp = require('sharp');

// @ts-ignore
//**************** */
const { readEncodedFile } = require('../options/fileHandler.js');
//********************** */

const csrf = require('csrf'),
    csrfTokens = csrf();

//------Almacenar una sola imagen en GSC ---------
async function uploadToGCS(req, res, next) {

    if (csrfTokens.verify(req.csrfSecret, req.cookies.csrfSecret)) {
        const err = new Error ('Invalid CSRF token')
        err.statusCode = 403
        return next(err)
    }
    
    if (!req.file) {
        const err = new Error('No se agregó ningún archivo válido')
        err.statusCode = 400
        return next(err)
    }

    const credentials = await readEncodedFile(),
        storageToGCS = new Storage({
        projectId: process.env.PROJECT_ID_GCS,
        credentials: credentials,
    });

    let bucket = storageToGCS.bucket(process.env.STORE_BUCKET_GCS), // Nombre bucket en Google Cloud Storage
        folderName = 'upload', subFolderName = '', newItemOrUpdate = ''

    const mapping = {
        imageTextAvatarUser: 'AvatarUsersImages',
        imageTextLogoClient: 'LogoClientImages',
        imageTextLogoUpdate: 'LogoClientImages',
        imageProjectFileName: 'projectImages',
        imageOciFileName: 'projectImages',
        imageTextImageTool: 'ToolsImages',
        imageTextImageCuttingTool: 'CuttingToolsImages',
        imageTextImageConsumibles: 'ConsumiblesImages',
        imageTextImageSupplier: 'SuppliersImages'
    };
    
    // Iterar sobre el objeto `mapping` para encontrar la coincidencia
    for (const [key, folder] of Object.entries(mapping)) {
        if (req.body[key]) {
            newItemOrUpdate = req.body[key];
            subFolderName = folder;
            break; // Salir del bucle una vez que se encuentra la coincidencia
        }
    }

    let originalname = (newItemOrUpdate).match(/[^\/]+$/)[0],
        cleanOriginalName = originalname.replace(/[^a-zA-Z0-9./_ ]/g, '-');
    const blob = bucket.file(`${folderName}/${subFolderName}/${cleanOriginalName}`);

    //**************Comprimir imagenes********************/
    // Detectar el formato de la imagen
    const image = sharp(req.file.buffer),
        metadata = await image.metadata();

    // Procesar la imagen según su formato
    let processedImage;
    if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
        processedImage = image
            .resize({ width: 1024, withoutEnlargement: true }) // Redimensionar si es necesario
            .jpeg({ quality: 80, progressive: true }); // Ajustar la calidad
    } else if (metadata.format === 'png') {
        processedImage = image
            .resize({ width: 1024, withoutEnlargement: true }) // Redimensionar si es necesario
            .png({ compressionLevel: 9 }); // Ajustar la compresión
    } else if (metadata.format === 'bmp') {
        processedImage = image
            .resize({ width: 1024, withoutEnlargement: true })
            .bmp({ quality: 80, compressionLevel: 9 }); // Ajustar la compresión
    } else {
        processedImage = image
        .resize({ width: 1024, withoutEnlargement: true })
    }

    const data = await processedImage.toBuffer();
    //**************Fin Comprimir imagenes********************/ 

    const blobStream = blob.createWriteStream({
        resumable: false,
    });

    blobStream.on('error', (err) => {
        console.error('Error uploading to Google Cloud:', err);
        err.statusCode = 500
        return next(err)
    });

    blobStream.on('finish', () => {
        req.file.cloudStorageObject = `${cleanOriginalName}`;
        // console.log('cleanOriginalName: ', cleanOriginalName)
        // console.log('blob.name: ', blob.name)
        req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${folderName}/${subFolderName}/${blob.name}`;
    });
    blobStream.end(data)
    //console.log('Llego acá!!')
}

Promise.all(uploadToGCS)
.then(() => {
//   next();
})
.catch((err) => {
//   next(err);
});



//------Almacenar una o varias imagenes (de una en una) en GSC ---------
async function uploadToGCSingleFile(req, res, next) {
        
    if (csrfTokens.verify(req.csrfSecret, req.cookies.csrfSecret)) {
        const err = new Error ('Invalid CSRF token')
        err.statusCode = 403
        return next(err)
    }

    if (!req.files) {
        const err = new Error('Error en carga de Imagen o Imagenes a Google Cloud Storage')
        err.statusCode = 400
        return next(err)
    }

    const credentials = await readEncodedFile();
    const storageToGCS = new Storage({
        projectId: process.env.PROJECT_ID_GCS,
        credentials: credentials,
    });
    
    let bucket = storageToGCS.bucket(process.env.STORE_BUCKET_GCS), // Nombre bucket en Google Cloud Storage
        folderName = 'upload',
        subFolderName = 'projectImages',
        updateProjectOrOci = [],
        originalname,
        blob

    async function compressAndUpload(blob, originalname, f) {
        //**************Comprimir imagenes********************/
        // Detectar el formato de la imagen
        const image = sharp(req.files[f].buffer),
            metadata = await image.metadata();

        // Procesar la imagen según su formato
        let processedImage;
        if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
            processedImage = image
                .resize({ width: 1024, withoutEnlargement: true }) // Redimensionar si es necesario
                .jpeg({ quality: 80, progressive: true, compressionLevel: 9 }); // Ajustar la calidad

        } else if (metadata.format === 'png') {
            processedImage = image
                .resize({ width: 1024, withoutEnlargement: true }) // Redimensionar si es necesario
                .png({ quality: 80, compressionLevel: 9 }); // Ajustar la compresión

        } else if (metadata.format === 'bmp') {
            processedImage = image
                .resize({ width: 1024, withoutEnlargement: true })
                .bmp({ quality: 80, compressionLevel: 9 }); // Ajustar la compresión
        } else {
            processedImage = image
            .resize({ width: 1024, withoutEnlargement: true })
        }
    
        const data = await processedImage.toBuffer();
        //**************Fin Comprimir imagenes********************/    
    
        const blobStream = blob.createWriteStream({
            resumable: false,
        });
    
        blobStream.on('error', (err) => {
            err.statusCode = 500
            return next(err)
        });
                
        blobStream.on('finish', () => {
            req.files.cloudStorageObject = `${originalname}`
            console.log('Single_originalname: ', originalname)
            console.log('Single_blob.name: ', blob.name)
            req.files.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${folderName}/${subFolderName}/${blob.name}`;
        });
        blobStream.end(data);
    }

    if (req.body.imageProject || req.body.imageOciFileName) {
        for (const key in req.body) {
            if (key.startsWith('imageProject')) {
                updateProjectOrOci.push(req.body[key])

            } else if (key.startsWith('imageOciFileName')) {
                updateProjectOrOci.push(req.body[key])
            }
        }

        for (let f=0; f<updateProjectOrOci.length; f++) {
            originalname = (updateProjectOrOci[f]).match(/[^\/]+$/)[0]
            let cleanOriginalName = originalname.replace(/[^a-zA-Z0-9./_ ]/g, '-');
    console.log('cleanOriginalName: ', cleanOriginalName)
            blob = bucket.file(`${folderName}/${subFolderName}/${cleanOriginalName}`);
            await compressAndUpload(blob, cleanOriginalName, f)
        }

    } else {
        for (const key in req.body) {
            if (key.startsWith('imageOciFileNameModal')) {
                updateProjectOrOci.push(req.body[key])
            }
        }

        for (let f=0; f<updateProjectOrOci.length; f++) {
            originalname = (updateProjectOrOci[f]).match(/[^\/]+$/)[0]
            let cleanOriginalName = originalname.replace(/[^a-zA-Z0-9./_ ]/g, '-');
    console.log('cleanOriginalName: ', cleanOriginalName)
            blob = bucket.file(`${folderName}/${subFolderName}/${cleanOriginalName}`);
            await compressAndUpload(blob, cleanOriginalName, f)
        }
    }
};

Promise.all(uploadToGCSingleFile)
.then(() => {
//   next();
})
.catch((err) => {
//   next(err);
});


//------Almacenar un solo pdf en GSC ---------
async function uploadPdfToGCS(req, res, next, invoiceName, pdfFileOrder) {
    try {
        if (!pdfFileOrder) {
            throw new Error('No file uploaded');
        }

        // Ensure pdfFileOrder is resolved if it's a Promise
        const pdfBuffer = await Promise.resolve(pdfFileOrder);

        if (!Buffer.isBuffer(pdfBuffer)) {
            throw new TypeError('pdfFileOrder must be a Buffer or a Promise that resolves to a Buffer');
        }
        
        const credentials = await readEncodedFile(),
            storageToGCS = new Storage({
            projectId: process.env.PROJECT_ID_GCS,
            credentials: credentials,
        });

        let bucket = storageToGCS.bucket(process.env.STORE_BUCKET_GCS), // Nombre bucket en Google Cloud Storage
            folderName = 'upload', subFolderName = 'PdfOrders', newItemOrUpdate = `${invoiceName}`

        let cleanOriginalName = newItemOrUpdate
        const blob = bucket.file(`${folderName}/${subFolderName}/${cleanOriginalName}`);
        // console.log('blob: ', blob)

        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream.on('error', (err) => {
            console.error('Error uploading to Google Cloud:', err);
            err.statusCode = 500
            return next(err)
        });

        blobStream.on('finish', () => {
            pdfFileOrder.cloudStorageObject = `${cleanOriginalName}`; //
            // console.log('cleanOriginalName: ', cleanOriginalName);
            // console.log('blob.name: ', blob.name); 
            pdfFileOrder.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${folderName}/${subFolderName}/${blob.name}`;
            
        });
        // Write the resolved Buffer to the stream
        blobStream.end(pdfBuffer);

    } catch (err) {
        console.error('Error in uploadPdfToGCS:', err);
        next(err);
    }
}

Promise.all(uploadPdfToGCS)
.then(() => {
//   next();
})
.catch((err) => {
//   next(err);
});

// ------Almacenar varios pdf en GSC ---------
async function uploadMultiPdfToGCS(req, res, next, invoiceName, pdfFileOrder) {
    try {
        if (!pdfFileOrder) {
            throw new Error('No file uploaded');
        }

        // Ensure pdfFileOrder is resolved if it's a Promise
        const pdfBuffer = await Promise.resolve(pdfFileOrder);

        if (!Buffer.isBuffer(pdfBuffer)) {
            throw new TypeError('pdfFileOrder must be a Buffer or a Promise that resolves to a Buffer');
        }
        
        const credentials = await readEncodedFile(),
            storageToGCS = new Storage({
            projectId: process.env.PROJECT_ID_GCS,
            credentials: credentials,
        });

        let bucket = storageToGCS.bucket(process.env.STORE_BUCKET_GCS), // Nombre bucket en Google Cloud Storage
            folderName = 'upload', subFolderName = 'PdfResumenOrders', newItemOrUpdate = `${invoiceName}`
            
        let cleanOriginalName = newItemOrUpdate
        const blob = bucket.file(`${folderName}/${subFolderName}/${cleanOriginalName}`);
        // console.log('blob: ', blob)

        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream.on('error', (err) => {
            console.error('Error uploading to Google Cloud:', err);
            err.statusCode = 500
            return next(err)
        });

        blobStream.on('finish', () => {
            pdfFileOrder.cloudStorageObject = `${cleanOriginalName}`; //
            // console.log('cleanOriginalName: ', cleanOriginalName);
            // console.log('blob.name: ', blob.name); 
            pdfFileOrder.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${folderName}/${subFolderName}/${blob.name}`;
            
        });
        // Write the resolved Buffer to the stream
        blobStream.end(pdfBuffer);

    } catch (err) {
        console.error('Error in uploadPdfToGCS:', err);
        next(err);
    }
}

Promise.all(uploadMultiPdfToGCS)
.then(() => {
//   next();
})
.catch((err) => {
//   next(err);
});

module.exports = {
    uploadToGCS,
    uploadToGCSingleFile,
    uploadPdfToGCS,
    uploadMultiPdfToGCS
}