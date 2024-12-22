//------ Storage Projects Images in Google Store --------
const multer = require('multer'),
    storage = multer.memoryStorage(); // Almacenamiento en memoria para cargar archivos temporalmente

// Función para crear configuraciones multer genéricas
const createMulterUpload = (fieldName, isMultiple = false) => {
    const uploadMethod = isMultiple ? multer({ storage, fileFilter }).any()
    :
    multer({ storage, fileFilter }).single(fieldName);
    return uploadMethod;
};

// Función común de filtro de archivos
const fileFilter = (req, file, cb) => {
    file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Solo se permiten imágenes'))
};

// Creación de los métodos de carga específicos
const uploadMulterMultiImages = createMulterUpload(null, true),
    uploadMulterSingleImageProject = createMulterUpload('imageProject'),
    uploadMulterSingleImageOci = createMulterUpload('imageOci'),
    uploadMulterSingleLogoClient = createMulterUpload('imageLogoClient'),
    uploadMulterSingleLogoUpdate = createMulterUpload('imageLogoUpdate'),
    uploadMulterSingleAvatarUser = createMulterUpload('imageAvatarUser'),
    uploadMulterSingleImageTool = createMulterUpload('imageImageTool'),
    uploadMulterSingleImageSupplier = createMulterUpload('imageImageSupplier'),
    uploadMulterSingleImageCuttingTool = createMulterUpload('imageImageCuttingTool'),
    uploadMulterSingleImageConsumibles = createMulterUpload('imageImageConsumibles');

// Exportación de las configuraciones
module.exports = {
    uploadMulterMultiImages,
    uploadMulterSingleImageProject,
    uploadMulterSingleImageOci,
    uploadMulterSingleLogoClient,
    uploadMulterSingleLogoUpdate,
    uploadMulterSingleAvatarUser,
    uploadMulterSingleImageTool,
    uploadMulterSingleImageSupplier,
    uploadMulterSingleImageCuttingTool,
    uploadMulterSingleImageConsumibles
};