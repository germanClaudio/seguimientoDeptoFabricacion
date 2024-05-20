const UserService = require("../services/users.service.js")
const ProyectosService = require("../services/projects.service.js")
const ClientesService = require("../services/clients.service.js")
const MessagesService = require("../services/messages.service.js")

const bCrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')

const multer = require('multer')

let now = require('../utils/formatDate.js')
let userPictureNotFound = "../../../src/images/upload/AvatarUsersImages/incognito.jpg"

const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

const storageToGCS = new Storage({
    projectId: process.env.PROJECT_ID_GCS,
    keyFilename: process.env.URL_LOCATION_CREDENTIALS, // Ruta al archivo de credenciales de servicio
});

async function uploadToGCS(req, res) {
    const flag = {
        dirNumber: 404
    }
    if (!req.file) {
        const errorInfo = {
            errorNumber: 18,
            status: false,
            msg: 'controllerError - No es un archivo.....'
        }
        res.render('errorPages', {
            errorInfo,
            flag
        })
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
        const errorInfo = {
            errorNumber: 18,
            status: false,
            msg: err
        }
        res.render('errorPages', {
            errorInfo,
            flag
        })

    });
            
    blobStream.on('finish', () => {
        req.file.cloudStorageObject = `${originalname}`;
        req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${folderName}/${subFolderName}/${blob.name}`;
    });

    blobStream.end(data)//(req.file.buffer);
};

class UsersController {  
    constructor(){
        this.projects = new ProyectosService()
        this.clients = new ClientesService()
        this.users = new UserService()
        this.messages = new MessagesService()
      }
       
    getAllUsers = async (req, res) => {
        const usuarios = await this.users.getAllUsers()
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            if(usuarios.error) return res.status(400).json({msg: 'No hay usuarios cargados!'}) 
            res.render('addNewUser', {
                usuarios,
                username,
                userInfo,
                expires
            })
        } catch (error) {
            const errorInfo = {
                errorNumber: 24,
                status: false,
                msg: 'controllerError - getAllUsers'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    getUserById = async (req, res) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const usuario = await this.users.getUserById(id)

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const flag = {
            dirNumber: 404
        }

        try {
            if(!usuario) return res.render('errorPages', {username, userInfo, expires, flag})
            //res.status(404).json({msg: 'Usuario no encontrado'})
            
            res.render('userDetails', {
                usuario,
                username,
                userInfo,
                expires
            })
        } catch (error) {
            const errorInfo = {
                errorNumber: 54,
                status: false,
                msg: 'controllerError - getUserById'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    getUserByUsername = async (req, res) => {
        const { username } = req.params
        
        const usuario = await this.users.getUserByUsername(username)
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
          
        const flag = {
            dirNumber: 404
        }

        try {
            if(!usuario) return res.render('errorPages', {userInfo, expires, flag})
            // res.status(404).json({msg: 'Usuario no encontrado'})
            
            res.render('userDetails', {
                usuario,
                username,
                userInfo,
                expires
            })
        } catch (error) {
            const errorInfo = {
                errorNumber: 86,
                status: false,
                msg: 'controllerError - getUserByUsername'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    getUserByUsernameAndPassword = async (req, res) => {
        const { username } = req.params
        const { password } = req.body
        const usuario = await this.users.getUserByUsernameAndPassword(username, password)
        
        const flag = {
            dirNumber: 404
        }

        try {
            if(!usuario) return res.render('errorPages', {flag})
            
            res.status(404).json({msg: 'Username desconocido o password incorrecto!!'})
            res.status(200).json({ Data: usuario })

        } catch (error) {
            const errorInfo = {
                errorNumber: 118,
                status: false,
                msg: 'controllerError - getUserByUsernameAndPassword'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    createNewUser = async (req, res) => {
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
        }).single('imageAvatarUser')

        uploadMulter(req, res, async (err) => {
            if(req.file) {
                uploadToGCS(req, res)
            }

            let username = res.locals.username
            let userInfo = res.locals.userInfo
            let userManager = await this.users.getUserByUsername(username)
            const userId = userManager._id
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

            if(req.body.password != req.body.confirmPassword) {
                const error = new Error('Los password no coinciden, no se agregó el usuario')
                error.httpStatusCode = 400
                return error
            }

            const usernameInput = req.body.username.replace(/[!@#$%^&*]/g, "")

            const newUser = {
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                username: usernameInput,
                legajoId: req.body.userLegajoId,
                avatar: req.body.imageTextAvatarUser || userPictureNotFound,
                password: req.body.password,
                permiso: req.body.permiso,
                status: req.body.status === 'on' ? Boolean(true) : Boolean(false) || Boolean(true),
                admin: req.body.admin === 'on' ? Boolean(true) : Boolean(false),
                creator: user,
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
                const usuario = await this.users.addNewUser(newUser)
                const usuarioLog = await this.users.getUserByUsername(username)
                
                const flag = {
                    dirNumber: 404
                }

                if(!usuarioLog) return res.render('errorPages', {username, userInfo, expires, flag})
                
                res.render('addNewUser', {
                    usuario,
                    username,
                    userInfo,
                    expires
                })
        
            } catch (error) {
                const errorInfo = {
                    errorNumber: 139,
                    status: false,
                    msg: 'controllerError - CreateNewUser'
                }
                res.render('errorPages', {
                    error,
                    errorInfo
                })
            }
        })
    }

    updateUser = async (req, res) => {
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

        const upload = multer({
            storage: storage
        }).single('imageAvatarUser')

        upload(req, res, async (err) => {
            if(req.file){
                uploadToGCS(req, res)
            }

            const id = req.params.id

            let username = res.locals.username
            let userInfo = res.locals.userInfo
            const userId = userInfo.id
            const userToModify = await this.users.getUserById(id)
            const userLogged = await this.users.getUserById(userId)

            const userModificator = [{
                name: userInfo.name,
                lastName: userInfo.lastName,
                username: userInfo.username,
                email: userInfo.email
            }]

            const cookie = req.session.cookie
            const time = cookie.expires
            const expires = new Date(time)
            
            if(userToModify && userLogged) {
                               
                const updatedUser = {
                    name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    username: req.body.username,
                    avatar: req.body.imageTextAvatarUser,
                    permiso: req.body.permisoHidden,
                    status: req.body.status === 'on' ? Boolean(true) : Boolean(false),
                    admin: req.body.admin === 'on' ? Boolean(true) : Boolean(false),
                    modificator: userModificator,
                    modifiedOn: now
                }
                
                if (err) {
                    const error = new Error('No se agregó ningún archivo')
                    error.httpStatusCode = 400
                    return error
                }
                            
                try {
                    const usuario = await this.users.updateUser(id, updatedUser, userModificator)

                    const flag = {
                        dirNumber: 404
                    }
            
                    if(!usuario) return res.render('errorPages', {username, userInfo, expires, flag})
                    
                        res.render('addNewUser', {
                            usuario,
                            username,
                            userInfo,
                            expires
                        })

                } catch (error) {
                    const flag = {
                        dirNumber: 500
                    }
                    const errorInfo = {
                        errorNumber: 238,
                        status: false,
                        msg: 'controllerError - UpdateUser'
                    }
                    res.render('errorPages', {
                        error,
                        errorInfo,
                        flag
                    })
                }

            } else {
                const flag = {
                    dirNumber: 500
                }
                const error = new Error('userToModify || userLogged error')
                const errorInfo = {
                    errorNumber: 238,
                    status: false,
                    msg: 'controllerError - UpdateUser - Usuario no existe'
                }
                res.render('errorPages', {
                    error,
                    errorInfo,
                    flag
                })
            }
        })
    }

    updateUserPreferences = async (req, res) => {
        const id = req.params.id

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userToModify = await this.users.getUserById(id)
        const userLogged = await this.users.getUserById(userId)

        const userModificator = [{
            name: userInfo.name,
            lastName: userInfo.lastName,
            username: userInfo.username,
            email: userInfo.email
        }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        if(userToModify && userLogged) {
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
            }).single('imageAvatarUser')

            
            uploadMulter(req, res, async (err) => {
                if(req.file){
                    uploadToGCS(req)
                }
                                
                const updatedUser = {
                    name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    avatar: req.body.imageTextAvatarUser,
                    modificator: userModificator,
                    modifiedOn: now
                }
                
                if (err) {
                    const error = new Error('No se agregó ningún archivo')
                    error.httpStatusCode = 400
                    return error
                }
                            
                try {
                    const usuario = await this.users.updateUserPreferences(id, updatedUser, userModificator)

                    const flag = {
                        dirNumber: 404
                    }
            
                    if(!usuario) return res.render('errorPages', {username, userInfo, expires, flag})
                        res.render('userSettings', {
                            usuario,
                            username,
                            userInfo,
                            expires
                        })

                } catch (error) {
                    const errorInfo = {
                        errorNumber: 238,
                        status: false,
                        msg: 'controllerError - UpdateUser'
                    }
                    res.render('errorPages', {
                        error,
                        errorInfo
                    })
                }
            })

        } else {
            const error = new Error('userToModify || userLogged error')
            const errorInfo = {
                errorNumber: 238,
                status: false,
                msg: 'controllerError - UpdateUser - Usuario no existe'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    getUserSettings = async (req, res) => {
        const id = req.params.id

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id
        const usuario = await this.users.getUserById(userId)

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        try {           
            res.render('userSettings', {
                usuario,
                username,
                userInfo,
                expires
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 354,
                status: false,
                msg: 'controllerError - getUserSettings'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    searchUsers = async (req, res) => {
        const users = await this.users.getAllUsers()
        
        try {
            if(users.error) return res.status(400).json({msg: 'No hay usuarios cargados!'}) 
            res.send({
                usersAll: users
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 323,
                status: false,
                msg: 'controllerError - SearchUsers'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    deleteUserById = async (req, res) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const userModificator = [{
            name: userInfo.name,
            lastName: userInfo.lastName,
            username: userInfo.username,
            email: userInfo.email
        }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            const usuario = await this.users.deleteUserById(id, userModificator)

            const flag = {
                dirNumber: 404
            }

            if(!usuario) return res.render('errorPages', {username, userInfo, expires, flag})
            
            res.render('addNewUser', {
                usuario,
                username,
                userInfo,
                expires
            })
        } catch (error) {
            const errorInfo = {
                errorNumber: 345,
                status: false,
                msg: 'controllerError - deleteUserById'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    login = async (req, res) => {
        const { username, password, sessionStarted } = req.body
        let visits = req.session.visits
    
        const cookie = req.session.cookie
        const time = cookie.expires
        let expires = new Date(time)
        
        try {
       
            if (sessionStarted) {
                req.session.cookie.expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // new: 24hs -- old: una semana
                expires = req.session.cookie.expires
            }

            let boolean = false
            
            const user = await this.users.getUserByUsername(username)

            function isValidPassword(user, password) {
                if(user) {
                const bCrypto = bCrypt.compareSync(password, user.password)
                    return bCrypto
                } else {
                    return false
                }
            }

            boolean = isValidPassword(user, password)
                
                if (boolean) {
                    const usuario = await this.users.getUserByUsernameAndPassword(username, user.password)
                    const userInfo = await this.users.getUserByUsername(username)

                    const clientes = await this.clients.getAllClients()
                    const usuarios = await this.users.getAllUsers()
                    const proyectos = await this.projects.getAllProjects()
                    const mensajes = await this.messages.getAllMessages()
                    const sessionLogin = await this.users.getAllSessions()
                    
                    const sessions = parseInt(sessionLogin.length+1)

                        if (!usuario) {
                            return res.render('login', {
                                flag: false,
                                fail: false
                            }) 
                        }
                        else if (usuario && userInfo.status ) {
                            const access_token = generateToken(usuario)
                            
                            req.session.admin = userInfo.admin
                            req.session.username = userInfo.username
                            
                            setTimeout(() => {
                                return res.render('index', {
                                    userInfo,
                                    username,
                                    visits,
                                    expires,
                                    clientes,
                                    usuarios,
                                    proyectos,
                                    mensajes,
                                    sessions
                                })
                            }, 350)
                        }
                        else {
                            setTimeout(() => {
                                return res.render('notAuthorizated', {
                                    userInfo,
                                    username,
                                    visits,
                                    expires
                                })
                            }, 1000)
                        }
                
                } else {
                    const flag = true
                    const fail = true
                    setTimeout(() => {
                        return res.render('login', {
                            flag,
                            fail
                        })
                    }, 600)
                }

        } catch {
            // res.status(500).send(error)
            const errorInfo = {
                errorNumber: 384,
                status: false,
                msg: 'controllerError - Login'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    resetUserPassword = async (req, res) => {
        try {
            const existeUsuario = await this.users.getUserByEmail(req.body.email) 
            
            if (!existeUsuario) {
                setTimeout(() => {
                    return res.render('notAllowedEmail', {
                    })
                }, 3000)
            } else {
                const sendEmailToUser = await this.users.resetUserPassword(existeUsuario)

                if (sendEmailToUser) {
                    setTimeout(() => {
                        return res.render('emailSent', {
                        })
                    }, 3000) 
                } else {
                    setTimeout(() => {
                        return res.render('notAllowedEmail', {
                        })
                    }, 3000)   
                }
            }
       
        } catch (error) {
            const errorInfo = {
                errorNumber: 488,
                status: false,
                msg: 'controllerError -  Reset User Password'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
            // res.status(500).json({
            //     status: false,
            //     msg: 'controllerError - Reset User Password',
            //     error: error
            // })
        }
    }

    updatePasswordByUser = async (req, res) => {
        const id = req.params.id
        const newPassword = req.body.password
        const confirmNewPassword = req.body.confirmPassword 
        
        if (newPassword === confirmNewPassword) {
            const userToModify = await this.users.getUserById(id)
        
            if(userToModify.visible && userToModify.status) {

                const userModificator = [{
                    name: userToModify.name,
                    lastName: userToModify.lastName,
                    username: userToModify.username,
                    email: userToModify.email
                }]
                
                const updatedUserPassword = {
                    password: newPassword || confirmNewPassword,
                    modificator: userModificator,
                    modifiedOn: now
                }
                                
                    try {
                        const usuario = await this.users.updatePasswordByUser(id, updatedUserPassword, userModificator)
    
                        if(!usuario) {
                            const errorInfo = {
                                errorNumber: 560,
                                status: false,
                                msg: 'controllerError -  Password NO guardado'
                            }
                            res.render('errorPages', {
                                error,
                                errorInfo
                            }) 
                        } 
                        //res.status(404).json({ Msg: 'Password NO guardado' })
                        
                        setTimeout(() => {
                            const flag = false
                            const fail = false
                            
                            res.render('200-PasswordResetSuccess', {
                            })

                        }, 3000)
    
                    } catch (error) {
                        const errorInfo = {
                            errorNumber: 530,
                            status: false,
                            msg: 'controllerError -  updatePasswordByUser'
                        }
                        res.render('errorPages', {
                            error,
                            errorInfo
                        })
                    }
    
            } else {
                const errorInfo = {
                    errorNumber: 560,
                    status: false,
                    msg: 'controllerError - Usuario no existe!'
                }
                res.render('errorPages', {
                    error,
                    errorInfo
                })
                //return res.status(404).json({ Msg: 'Usuario no existe!' })
            }

        } else {
            const errorInfo = {
                errorNumber: 560,
                status: false,
                msg: 'controllerError - Password no coinciden!'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
            // return res.status(404).json({ Msg: 'Password no coinciden!' })
        }
    }

    userLogout = async (req, res) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        let expires = new Date(time)
        
        try {
            const usuario = await this.users.userLogout(userInfo._id, username)
            
            if(!usuario) return res.status(404).json({ Msg: 'Usuario no deslogueado' })
            
            req.session.destroy(err => {
                if(err) return res.send(err)

                try {
                    return res.render('logout', { usuario, username, userInfo, expires })

                } catch(err) {
                    return res.json(err)
                }
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 619,
                status: false,
                msg: 'controllerError - UserLogout'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
            // res.status(500).json({
            //     status: false,
            //     error: error
            // })
        }    
    }

    authBloq = async (req, res) => {
        let username = req.query.username || ""
        const password = req.query.password || ""
    
        username = username.replace(/[!@#$%^&*]/g, "")
    
        try {
            const usuario = await this.users.userLogout(password, username)
            
            if(!usuario) return res.status(404).json({ Msg: 'Usuario no deslogueado' })

            if (!username || !password || !users[username]) {
                process.exit(1)
            }

            const { salt, hash } = users[username]
            const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512")
        
            if (crypto.timingSafeEqual(hash, encryptHash)) {
                res.sendStatus(200)
            } else {
                process.exit(1)
            }
            
        } catch (error) {
            const errorInfo = {
                errorNumber: 655,
                status: false,
                msg: 'controllerError - authBloq'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    authNoBloq = async (req, res) => {
        let username = req.query.username || ""
        const password = req.query.password || ""
    
        username = username.replace(/[!@#$%^&*]/g, "")
    
        try {
            const usuario = await this.users.userLogout(password, username)
            
            if(!usuario) return res.status(404).json({ Msg: 'Usuario no deslogueado' })

            if (!username || !password || !users[username]) {
                process.exit(1)
            }

            crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
                if (users[username].hash.toString() === hash.toString()) {
                  res.sendStatus(200);
                } else {
                  process.exit(1)
                }
            })
            
        } catch (error) {
            const errorInfo = {
                errorNumber: 692,
                status: false,
                msg: 'controllerError -  authNoBloq'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }

    }

    index = async (req, res) => {
   
        let username = res.locals.username
        let userInfo = res.locals.userInfo
    
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        try {
            const visits = req.session.visits
            const user = await this.users.getUserByUsername(username)

            const clientes = await this.clients.getAllClients()
            const usuarios = await this.users.getAllUsers()
            const proyectos = await this.projects.getAllProjects()
            const mensajes = await this.messages.getAllMessages()
            const sessionsIndex = await this.users.getAllSessions()
            const sessions = sessionsIndex.length
            const { flag, fail } = true
    
            if (!user) {
                return res.render('login', {
                    flag,
                    fail
                })

            } else if ( user.status ) {
                const access_token = generateToken(user)
                const fail = false
                
                req.session.admin = user.admin
                //req.session.admin = true
                req.session.username = userInfo.username
                
                return res.render('index', {
                    userInfo,
                    username,
                    visits,
                    flag,
                    fail,
                    expires,
                    clientes,
                    usuarios,
                    proyectos,
                    mensajes,
                    sessions
                })
                
            } else {
                return res.render('notAuthorizated', {
                    userInfo,
                    username,
                    visits,
                    flag,
                    expires
                })
            }
             
        } catch (error) {
            const errorInfo = {
                errorNumber: 759,
                status: false,
                msg: 'controllerError - getIndex (UserController)'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    clientes = async (req, res) => {
    
        let username = res.locals.username
        let userInfo = res.locals.userInfo
    
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        try {
            const visits = req.session.visits
            const user = await this.users.getUserByUsername(username)
            
            const { flag, fail } = true
            
            if (!user) {
                return res.render('register', {
                    flag,
                    fail
                })
            } else if ( user.status ) {
                const access_token = generateToken(user)
                req.session.admin = true
                req.session.username = userInfo.username
                return res.render('clientes', {
                    userInfo,
                    username,
                    expires
                })
            } else {
                return res.render('notAuthorizated', {
                    userInfo,
                    username,
                    visits,
                    flag
                })
            }
            
        } catch (error) {
            const errorInfo = {
                errorNumber: 792,
                status: false,
                msg: 'controllerError - clientes(User Controller)'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }
}

module.exports = { UsersController }