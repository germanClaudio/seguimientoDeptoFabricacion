const multer = require('multer')

//------ Storage Project and OCI Images in Google Store --------
// Almacenamiento en memoria para cargar archivos temporalmente
const storage = multer.memoryStorage();

const uploadMulterMultiImages = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes'));
        }
    }
}).any()

const uploadMulterSingleImageProject = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes'));
        }
    }
}).single('imageProject')

const uploadMulterSingleImageOci = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes'));
        }
    }
}).single('imageOci')


module.exports = {
    uploadMulterMultiImages,
    uploadMulterSingleImageProject,
    uploadMulterSingleImageOci
}