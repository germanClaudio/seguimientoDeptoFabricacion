const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

// @ts-ignore
//**************** */
const { readEncodedFile } = require('../options/fileHandler.js');
//********************** */

const csrf = require('csrf');
const csrfTokens = csrf();

//------Almacenar una sola imagen en GSC ---------
async function uploadToGCS(req, res, next) {

    if (csrfTokens.verify(req.csrfSecret, req.cookies.csrfSecret)) {
        const err = new Error ('Invalid CSRF token')
        err.dirNumber = 403
        return next(err)
    }
    
    if (!req.file) {
        const err = new Error('No se agregó ningún archivo válido')
        err.dirNumber = 400
        return next(err)
    }

    const credentials = await readEncodedFile();
    const storageToGCS = new Storage({
        projectId: process.env.PROJECT_ID_GCS,
        credentials: credentials,
    });

    let bucket = storageToGCS.bucket(process.env.STORE_BUCKET_GCS); // Nombre bucket en Google Cloud Storage
    let folderName = 'upload'
    let subFolderName = ''
    let newItemOrUpdate = ''

    if (req.body.imageTextAvatarUser ) {
        newItemOrUpdate = req.body.imageTextAvatarUser
        subFolderName = 'AvatarUsersImages';
    } else if (req.body.imageTextLogoUpdate) {
        newItemOrUpdate = req.body.imageTextLogoUpdate
        subFolderName = 'LogoClientImages';
    } else if (req.body.imageProjectFileName) {
        newItemOrUpdate = req.body.imageProjectFileName
        subFolderName = 'projectImages';
    } else if (req.body.imageOciFileName) {
        newItemOrUpdate = req.body.imageOciFileName
        subFolderName = 'projectImages';
    }

    let originalname = (newItemOrUpdate).match(/[^\/]+$/)[0]
    const blob = bucket.file(`${folderName}/${subFolderName}/${originalname}`);

    //**************Comprimir imagenes********************/
    // Detectar el formato de la imagen
    const image = sharp(req.file.buffer);
    const metadata = await image.metadata();

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
    }

    const data = await processedImage.toBuffer();
    //**************Fin Comprimir imagenes********************/ 

    const blobStream = blob.createWriteStream({
        resumable: false,
    });

    blobStream.on('error', (err) => {
        err.dirNumber = 500
        return next(err)
    });
            
    blobStream.on('finish', () => {
        req.file.cloudStorageObject = `${originalname}`;
        req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${folderName}/${subFolderName}/${blob.name}`;
    });
    blobStream.end(data)
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
        err.dirNumber = 403
        return next(err)
    }

    if (!req.files) {
        const err = new Error('Error en carga de Imagen o Imagenes a Google Cloud Storage')
        err.dirNumber = 400
        return next(err)
    }

    const credentials = await readEncodedFile();
    const storageToGCS = new Storage({
        projectId: process.env.PROJECT_ID_GCS,
        credentials: credentials,
    });
    
    let bucket = storageToGCS.bucket(process.env.STORE_BUCKET_GCS); // Nombre bucket en Google Cloud Storage
    let folderName = 'upload';
    let subFolderName = 'projectImages';
    let updateProjectOrOci = []
    let originalname
    let blob

    async function compressAndUpload(blob, originalname, f) {
        //**************Comprimir imagenes********************/
        // Detectar el formato de la imagen
        const image = sharp(req.files[f].buffer);
        const metadata = await image.metadata();

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
        }
    
        const data = await processedImage.toBuffer();
        //**************Fin Comprimir imagenes********************/    
    
        const blobStream = blob.createWriteStream({
            resumable: false,
        });
    
        blobStream.on('error', (err) => {
            err.dirNumber = 500
            return next(err)
        });
                
        blobStream.on('finish', () => {
            req.files.cloudStorageObject = `${originalname}`
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
            blob = bucket.file(`${folderName}/${subFolderName}/${originalname}`);
            await compressAndUpload(blob, originalname, f)
        }

    } else {
        for (const key in req.body) {
            if (key.startsWith('imageOciFileNameModal')) {
                updateProjectOrOci.push(req.body[key])
            }
        }

        for (let f=0; f<updateProjectOrOci.length; f++) {
            originalname = (updateProjectOrOci[f]).match(/[^\/]+$/)[0]
            blob = bucket.file(`${folderName}/${subFolderName}/${originalname}`);
            await compressAndUpload(blob, originalname, f)
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

module.exports = {
    uploadToGCS,
    uploadToGCSingleFile
}