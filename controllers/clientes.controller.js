const ClientsService = require("../services/clients.service.js")
const UserService = require("../services/users.service.js")
const ProjectsService = require("../services/projects.service.js")

const multer = require('multer')

let now = require('../utils/formatDate.js')
let imageNotFound = "../../../src/images/upload/LogoClientImages/noImageFound.png"

const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

const storageToGCS = new Storage({
    projectId: process.env.PROJECT_ID_GCS,
    keyFilename: process.env.URL_LOCATION_CREDENTIALS, // Ruta al archivo de credenciales de servicio
});

async function uploadToGCS(req, res) {
    const error = 'Error en controllerError'
    const flag = {
        dirNumber: 500
    }

    if (!req.file) {
        const errorInfo = {
            errorNumber: 17,
            status: false,
            msg: 'controllerError - No es un archivo.....'
        }
        res.render('errorPages', {
            error,
            errorInfo,
            flag
        })
    }

    let bucket = storageToGCS.bucket(process.env.STORE_BUCKET_GCS); // Nombre bucket en Google Cloud Storage
    let folderName = 'upload';
    let subFolderName = 'LogoClientImages';
    let newClientOrUpdate = req.body.imageTextLogoClient || req.body.imageTextLogoUpdate
    
    let originalname = (newClientOrUpdate).match(/[^\/]+$/)[0]

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
        const errorInfo = {
            errorNumber: 17,
            status: false,
            msg: err
        }
        res.render('errorPages', {
            error,
            errorInfo,
            flag
        })

    });
            
    blobStream.on('finish', () => {
        req.file.cloudStorageObject = `${originalname}`
        req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${folderName}/${subFolderName}/${blob.name}`;
    });

    blobStream.end(data);
};

class ClientsController {
    constructor() {
        this.clients = new ClientsService()
        this.users = new UserService()
        this.projects = new ProjectsService()
    }

    getAllClients = async (req, res) => {
        const clientes = await this.clients.getAllClients()

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            const flag = {
                dirNumber: 404
            }
            const errorInfo = {
                errorNumber: 74,
                status: false,
                msg: 'controllerError - No hay clientes cargados'
            }

            if (clientes.error) return res.render('errorPages', {error, errorInfo, flag})
            
            res.render('addNewClients', {
                clientes,
                username,
                userInfo,
                expires
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 18,
                status: false,
                msg: 'controllerError - getAllClients'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    getClientProjectsById = async (req, res) => {
        const { id } = req.params
        const proyectos = await this.projects.getProjectsByClientId(id)

        const cliente = await this.clients.getClientById(id)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const flag = {
            dirNumber: 404
        }
        try {
            if (!proyectos) return res.render('errorPages', {username, userInfo, expires, flag})
            
            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                proyectos,
                cliente
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 55,
                status: false,
                msg: 'controllerError - getClientProjectsById'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    getClientById = async (req, res) => {
        const { id } = req.params
        const cliente = await this.clients.getClientById(id)

        const proyectos = await this.projects.getProjectsByClientId(id)
        // console.log('getClientById__proyectos....... ',proyectos)
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const flag = {
            dirNumber: 404
        }

        try {
            if (!cliente) return res.render('errorPages', {username, userInfo, expires, flag})

            res.render('clientProjectsDetails', {
                cliente,
                username,
                userInfo,
                expires,
                proyectos
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 98,
                status: false,
                msg: 'controllerError - getClientById'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
            // res.status(500).json({
            //     status: false,
            //     msg: 'controllerError - getClientById',
            //     error: error
            // })
        }
    }

    selectClientById = async (req, res) => {
        const { id } = req.params
        const cliente = await this.clients.getClientById(id)

        const proyectos = await this.projects.getProjectsByClientId(id)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const flag = {
            dirNumber: 404
        }

        try {
            if (!cliente) return res.render('errorPages', {username, userInfo, expires, flag})
            
            res.render('clientDetails', {
                cliente,
                username,
                userInfo,
                expires,
                proyectos
            })
        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 141,
                status: false,
                msg: 'controllerError - selectClientById'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    createNewClient = async (req, res) => {
        //------ Storage Client Logo Image in Google Store --------
        const storage = multer.memoryStorage({
            fileFilter: (req, file, cb) => {
                if (file.mimetype.startsWith('image/')) {
                    cb(null, true);
                } else {
                    cb(new Error('Solo se permiten imágenes'));
                }
            },
        }); // Almacenamiento en memoria para cargar archivos temporalmente
                
        const uploadMulter = multer({
            storage: storage
        }).single('imageLogoClient')
        
        uploadMulter(req, res, async (err) => {
            if(req.file) {
                uploadToGCS(req, res)
            }

            let username = res.locals.username
            const userInfo = res.locals.userInfo
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            
            const user = [{
                name: userCreator.name,
                lastName: userCreator.lastName,
                username: userCreator.username,
                email: userCreator.email
            }]

            const modificator = [{
                name: "",
                lastName: "",
                username: "",
                email: ""
            }]

            const cookie = req.session.cookie
            const time = cookie.expires
            const expires = new Date(time)

            const newCliente = {
                creator: user,
                name: req.body.name,
                status: req.body.statusClient === 'on' ? Boolean(true) : Boolean(false) || Boolean(true),
                code: req.body.code,
                project: 0,
                logo: req.body.imageTextLogoClient || imageNotFound,
                timestamp: now,
                modificator: modificator,
                modifiedOn: '',
                visible: true
            }
            
            if (err) {
                const error = new Error('No se agregó ningún archivo')
                error.httpStatusCode = 400
                return error
            }

            try {
                const cliente = await this.clients.addClient(newCliente)

                const flag = {
                    dirNumber: 404
                }

                if (!cliente) return res.render('errorPages', {username, userInfo, expires, flag})

                res.render('addNewClients', {
                    cliente,
                    username,
                    userInfo,
                    expires
                })

            } catch (error) {
                const flag = {
                    dirNumber: 500
                }
                const errorInfo = {
                    errorNumber: 183,
                    status: false,
                    msg: 'controllerError - createNewClient'
                }
                res.render('errorPages', {
                    error,
                    errorInfo,
                    flag
                })

            }
        })
    }

    updateClient = async (req, res) => {
         //------ Storage Client Logo Image in Google Store --------
         const storage = multer.memoryStorage({
            storage: multer.memoryStorage(),
            fileFilter: (req, file, cb) => {
                if (file.mimetype.startsWith('image/')) {
                    cb(null, true);
                } else {
                    cb(new Error('Solo se permiten imágenes'));
                }
            },
        }); // Almacenamiento en memoria para cargar archivos temporalmente
             
        const uploadMulter = multer({
            storage: storage
        }).single('imageLogoUpdate')

        
        uploadMulter(req, res, async (err) => {
            if (req.file) {
                uploadToGCS(req, res)
            }

            const id = req.params.id
        
            let username = res.locals.username
            const userInfo = res.locals.userInfo
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            
            const userModificator = [{
                name: userCreator.name,
                lastName: userCreator.lastName,
                username: userCreator.username,
                email: userCreator.email
            }]

            const cookie = req.session.cookie
            const time = cookie.expires
            const expires = new Date(time)
                        
            const updatedCliente = {
                name: req.body.name,
                status: req.body.statusClient === 'on' ? true : false,
                code: req.body.code,
                logo: req.body.imageTextLogoUpdate,
                modificator: userModificator,
                modifiedOn: now
            }
            
            if (err) {
                const error = new Error('No se agregó ningún archivo')
                error.httpStatusCode = 400
                return error
            }

            try {
                const cliente = await this.clients.getClientById(id)
                
                if (cliente) {
                    const clientUpdated = this.clients.updateClient(
                        id, 
                        updatedCliente, 
                        userModificator
                    )
                    res.render('addNewClients', {
                        clientUpdated,
                        username,
                        userInfo,
                        expires
                    })
                                    
                } else {
                    const flag = {
                        dirNumber: 404
                    }
                    return res.render('errorPages', {username, userInfo, expires, flag})
                }  
    
            } catch (error) {
                const flag = {
                    dirNumber: 500
                }
                const errorInfo = {
                    errorNumber: 271,
                    status: false,
                    msg: 'controllerError - updateClient'
                }
                res.render('errorPages', {
                    error,
                    errorInfo,
                    flag
                })
            }
        })       
    }

    updateClientProjectsQty = async (req, res) => {
        const id = req.params.id
        const proyectos = await this.projects.getProjectsByClientId(id)
        
        const clientToUpdateProjectQty = await this.clients.getClientById(id)
        
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const modifier = [{
            name: userInfo.name,
            lastName: userInfo.lastName,
            username: userInfo.username,
            email: userInfo.email
        }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            const cliente = await this.clients.updateClientProjectsQty(id, clientToUpdateProjectQty, modifier)

            const flag = {
                dirNumber: 404
            }

            if (!cliente) return res.render('errorPages', {username, userInfo, expires, flag})
            //res.status(404).json({ Msg: 'Cantidad de proyectos de Cliente no actualizada' })
            
            res.render('clientProjectsDetails', {
                cliente,
                username,
                userInfo,
                expires,
                proyectos
            })
        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 356,
                status: false,
                msg: 'controllerError - updateClientProjectsQty'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    reduceClientProjectQty = async (req, res) => {
        const id = req.params.id
        const proyectos = await this.projects.getProjectsByClientId(id)
        
        const clientToUpdateProjectQty = await this.clients.getClientById(id)
        
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const modifier = [{
            name: userInfo.name,
            lastName: userInfo.lastName,
            username: userInfo.username,
            email: userInfo.email
        }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            const cliente = await this.clients.reduceClientProjectQty(id, clientToUpdateProjectQty, modifier)
            if (!cliente) return res.status(404).json({ Msg: 'Cantidad de proyectos de Cliente no actualizada' })
                res.render('clientProjectsDetails', {
                    cliente,
                    username,
                    userInfo,
                    expires,
                    proyectos
                })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 473,
                status: false,
                msg: 'controllerError - reduceClientProjectQty'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    deleteClientById = async (req, res) => {
        const clientId = req.params.id

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const modificator = [{
            name: userInfo.name,
            lastName: userInfo.lastName,
            username: userInfo.username,
            email: userInfo.email
        }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            const cliente = await this.clients.deleteClientById(clientId, modificator)
            
            const flag = {
                dirNumber: 404
            }

            if (!cliente) return res.render('errorPages', {username, userInfo, expires, flag})
            // res.status(404).json({ Msg: 'Cliente no eliminado' })
            
            res.render('addNewClients', {
                cliente,
                username,
                userInfo,
                expires
            })
        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 433,
                status: false,
                msg: 'controllerError - deleteClientById'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    deleteAllClients = async (req, res) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            const clientsDeleted = await this.clients.deleteAllClients()
            res.render('addNewClients', {
                clientsDeleted,
                username,
                userInfo,
                expires
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 517,
                status: false,
                msg: 'controllerError - deleteAllClients'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

}

module.exports = { ClientsController }