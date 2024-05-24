const FilesService = require("../services/files.service.js")
const catchErrors = require("../utils/catchErrors.js")

const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

const storageToGCS = new Storage({
    projectId: process.env.PROJECT_ID_GCS,
    keyFilename: process.env.URL_LOCATION_CREDENTIALS,
});


class FilesController {  
    constructor() {
        this.archivos = new FilesService()
    }

    uploadToGCS = async (req, res) => {
        if (!req.file) {
            const error = new Error('No se agregó ningún archivo válido')
            catchErrors.catchError400(error, res)
        }
    
        let bucket = storageToGCS.bucket(process.env.STORE_BUCKET_GCS); // Nombre bucket en Google Cloud Storage
        let folderName = 'upload';
        let subFolderName = 'AvatarUsersImages';
        let newUserOrUpdate = req.body.imageTextAvatarUser || req.body.imageTextAvatarUser
    
        let originalname = (newUserOrUpdate).match(/[^\/]+$/)[0]
    
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
        } else {
            // Para otros formatos, solo redimensionar
            processedImage = image.resize({ width: 1024, withoutEnlargement: true });
        }
    
        const data = await processedImage.toBuffer();
        //**************Fin Comprimir imagenes********************/ 
    
        const blobStream = blob.createWriteStream({
            resumable: false,
        });
    
        blobStream.on('error', (err) => {
            catchErrors.catchError400(err, res)
        });
                
        blobStream.on('finish', () => {
            req.file.cloudStorageObject = `${originalname}`;
            req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${folderName}/${subFolderName}/${blob.name}`;
        });
    
        blobStream.end(data)
    };

}

module.exports = { FilesController }