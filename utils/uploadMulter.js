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


// const multer = require('multer')

// //------ Storage Projects Images in Google Store --------
// // Almacenamiento en memoria para cargar archivos temporalmente
// const storage = multer.memoryStorage();

// const uploadMulterMultiImages = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Solo se permiten imágenes'));
//         }
//     }
// }).any()

// const uploadMulterSingleImageProject = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Solo se permiten imágenes'));
//         }
//     }
// }).single('imageProject')

// const uploadMulterSingleImageOci = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Solo se permiten imágenes'));
//         }
//     }
// }).single('imageOci')

// const uploadMulterSingleLogoClient = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Solo se permiten imágenes'));
//         }
//     }
// }).single('imageLogoClient')

// const uploadMulterSingleLogoUpdate = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Solo se permiten imágenes'));
//         }
//     }
// }).single('imageLogoUpdate')

// const uploadMulterSingleAvatarUser = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Solo se permiten imágenes'));
//         }
//     }
// }).single('imageAvatarUser')

// const uploadMulterSingleImageTool = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Solo se permiten imágenes'));
//         }
//     }
// }).single('imageImageTool')

// const uploadMulterSingleImageSupplier = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Solo se permiten imágenes'));
//         }
//     }
// }).single('imageImageSupplier')

// const uploadMulterSingleImageCuttingTool = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Solo se permiten imágenes'));
//         }
//     }
// }).single('imageImageCuttingTool')

// const uploadMulterSingleImageConsumibles = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Solo se permiten imágenes'));
//         }
//     }
// }).single('imageImageConsumibles')

// module.exports = {
//     uploadMulterMultiImages,
//     uploadMulterSingleImageProject,
//     uploadMulterSingleImageOci,
//     uploadMulterSingleLogoClient,
//     uploadMulterSingleLogoUpdate,
//     uploadMulterSingleAvatarUser,
//     uploadMulterSingleImageTool,
//     uploadMulterSingleImageSupplier,
//     uploadMulterSingleImageCuttingTool,
//     uploadMulterSingleImageConsumibles
// }