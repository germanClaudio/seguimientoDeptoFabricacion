const UserService = require("../services/users.service.js")
const ProyectosService = require("../services/projects.service.js")
const ClientesService = require("../services/clients.service.js")
const MessagesService = require("../services/messages.service.js")
const FileService = require("../services/files.service.js")

let now = require('../utils/formatDate.js')
const { generateToken } = require('../utils/generateToken')

const bCrypt = require('bcrypt')

const csrf = require('csrf');
const csrfTokens = csrf();


const multer = require('multer')
const catchErrors = require("../utils/catchErrors.js")
let userPictureNotFound = "../../../src/images/upload/AvatarUsersImages/incognito.jpg"


class UsersController {  
    constructor(){
        this.projects = new ProyectosService()
        this.clients = new ClientesService()
        this.users = new UserService()
        this.messages = new MessagesService()
        this.files = new FileService()
    }
       
    getAllUsers = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        const csrfToken = csrfTokens.create(req.csrfSecret);
        
        try {
            const usuarios = await this.users.getAllUsers()
            if(usuarios.error) {
                const err = new Error('No existen Usuarios Cargados')
                err.dirNumber = 400
                return next(err)
            }
            res.render('addNewUser', {
                usuarios,
                username,
                userInfo,
                expires,
                csrfToken
            })

        } catch (err) {
            err.dirNumber = 500
            return next(err)
        }
    }

    getUserById = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        const csrfToken = csrfTokens.create(req.csrfSecret);
        
        try {
            const usuario = await this.users.getUserById(id)
            if(!usuario) {
                const err = new Error('No existe Usuario')
                err.dirNumber = 400
                return next(err)
            }
            
            res.render('userDetails', {
                usuario,
                username,
                userInfo,
                expires,
                csrfToken
            })

        } catch (err) {
            err.dirNumber = 400
            return next(err)
        }
    }

    getUserByUsername = async (req, res, next) => {
        const { username } = req.params
        
        let userInfo = res.locals.userInfo
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        const csrfToken = csrfTokens.create(req.csrfSecret);
        
        try {
            const usuario = await this.users.getUserByUsername(username)
            if(!usuario) {
                const error = new Error('No existe Usuario')
                error.dirNumber = 400
                return next(error)
            }
            
            res.render('userDetails', {
                usuario,
                username,
                userInfo,
                expires,
                csrfToken
            })

        } catch (error) {
            error.dirNumber = 500
            return next(error)
        }
    }

    getUserByUsernameAndPassword = async (req, res, next) => {
        const { username } = req.params
        const { password } = req.body
        
        //const csrfToken = csrfTokens.create(req.csrfSecret);
        
        try {
            const usuario = await this.users.getUserByUsernameAndPassword(username, password)
            if(!usuario) {
                const err = new Error('Username desconocido o password incorrecto!!')
                err.dirNumber = 400
                return next(err)
            }

        } catch (err) {
            err.dirNumber = 500
            return next(err)
        }
    }

    createNewUser = async (req, res, next) => {
        //------ Storage New User Image in Google Store --------        
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
        }).single('imageAvatarUser');
    
        // Almacena la imagen y maneja cualquier error
        uploadMulter(req, res, async (err) => {
            if (err) {
                err.dirNumber = 400;
                return next(err);
            }
    
            try {
                if (req.file) {
                    await this.files.uploadToGCS(req, res);
                }
    
                let username = res.locals.username;
                let userInfo = res.locals.userInfo;
                let userManager = await this.users.getUserByUsername(username);
                const userId = userManager._id;
                const userCreator = await this.users.getUserById(userId);
    
                const user = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }];
    
                const modificator = [{
                    name: "",
                    lastName: "",
                    username: "",
                    email: ""
                }];
    
                const cookie = req.session.cookie;
                const time = cookie.expires;
                const expires = new Date(time);
    
                const usernameInput = req.body.username.replace(/[!@#$%^&*]/g, "");
                const emailInput = req.body.email;
                const legajoIdInput = req.body.userLegajoId;
    
                const newUserValid = {
                    username: usernameInput,
                    legajoId: parseInt(legajoIdInput),
                    email: emailInput
                };
    
                const userExist = await this.users.getExistingUser(newUserValid);
    
                if (userExist) {
                    const err = new Error(`Ya existe un Usuario con estos datos.`);
                    err.dirNumber = 400;
                    err.data = newUserValid
                    console.log('6-err:', err);
                    return next(err);
                }
    
                if (req.body.password !== req.body.confirmPassword) {
                    const err = new Error('Los password no coinciden, no se agregó el usuario');
                    err.dirNumber = 400;
                    return next(err);
                }
    
                const csrfToken = req.body._csrf;
                if (!csrfTokens.verify(req.csrfSecret, csrfToken)) {
                    const err = new Error('Invalid CSRF token');
                    err.dirNumber = 400;
                    return next(err);
                }
    
                const selectFieldPermiso = req.body.permiso;
                const selectFieldArea = req.body.area;
    
                if (validateSelectField(selectFieldPermiso) && validateSelectField(selectFieldArea)) {
                    if (userInfo.admin && !userInfo.superAdmin) {
                        req.body.superAdmin = 'off';
                        req.body.admin = 'off';
                    }
    
                    const newUser = {
                        name: req.body.name,
                        lastName: req.body.lastName,
                        email: emailInput,
                        username: usernameInput,
                        legajoId: legajoIdInput,
                        avatar: req.body.imageTextAvatarUser || userPictureNotFound,
                        password: req.body.password,
                        permiso: selectFieldPermiso,
                        area: selectFieldArea,
                        status: req.body.status === 'on' ? Boolean(true) : Boolean(false) || Boolean(true),
                        admin: req.body.admin === 'on' ? Boolean(true) : Boolean(false),
                        superAdmin: req.body.superAdmin === 'on' ? Boolean(true) : Boolean(false),
                        creator: user,
                        timestamp: new Date(),
                        modificator: modificator,
                        modifiedOn: '',
                        visible: true
                    };
    
                    const usuario = await this.users.addNewUser(newUser);
                    const usuarioLog = await this.users.getUserByUsername(username);
    
                    if (!usuarioLog) {
                        const err = new Error('Usuario desconocido!!');
                        err.dirNumber = 401;
                        return next(err);
                    }
    
                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    
                    return res.render('addNewUser', {
                        usuario,
                        username,
                        userInfo,
                        expires,
                        csrfToken
                    });
    
                } else {
                    const err = new Error('Datos inválidos');
                    err.dirNumber = 400;
                    return next(err);
                }
            
                function validateSelectField(value) {
                    const validOptions = [
                        'diseno', 'simulacion', 'disenoSimulacion', 'projectManager',
                        'cadCam', 'mecanizado', 'ajuste', 'todos',
                        'ingenieria', 'fabricacion', 'proyectos', 'administracion', 'todas'
                    ];
                    return validOptions.includes(value);
                }
    
            } catch (err) {
                err.dirNumber = 400;
                return next(err);
            }
        })
    }
    
    updateUser = async (req, res, next) => {
         //------ Storage User Image in Google Store --------
         const storage = multer.memoryStorage({
            fileFilter: (req, file, cb) => {
                if (file.mimetype.startsWith('image/')) {
                    cb(null, true);
                } else {
                    cb(new Error('Solo se permiten imágenes'));
                }
            },
        });

        const upload = multer({
            storage: storage
        }).single('imageAvatarUser')

        upload(req, res, async (err) => {
            if (err) {
                err.dirNumber = 400;
                return next(err);
            }

            try {
                if(req.file) {
                    await this.files.uploadToGCS(req, res)
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

                const csrfToken = req.body._csrf;
                if (!csrfTokens.verify(req.csrfSecret, csrfToken)) {
                    const err = new Error ('Invalid CSRF token')
                    err.dirNumber = 400
                    return next(err);
                }

                const usernameInput = req.body.username.replace(/[!@#$%^&*]/g, "")
                const usernameValid = await this.users.getUserByUsername(usernameInput)
            
                if (usernameValid) {
                    const err = new Error (`Ya existe un Usuario con este Username ${usernameInput} o Username inválido!!`)
                    err.dirNumber = 400
                    return next(err);
                }

                const emailInput = req.body.email
                const emailValid = await this.users.getUserByEmail(emailInput)
                console.log('emailValid', emailValid)
                if (emailValid) {
                    const err = new Error (`Ya existe un Usuario con este Em@il ${emailInput} o Em@il inválido!!`)
                    err.dirNumber = 400
                    return next(err);
                }

                const legajoIdInput = req.body.userLegajoId
                const legajoIdValid = await this.users.getUserByLegajoId(legajoIdInput)
                console.log('legajoIdValid', legajoIdValid)
                if (legajoIdValid) {
                    const err = new Error (`Ya existe un Usuario con este Legajo # ${legajoIdInput} o # Legajo inválido!!`)
                    err.dirNumber = 400
                    return next(err);
                }

                const selectFieldPermiso = req.body.permiso
                const selectFieldArea = req.body.area

                // Validar y sanitizar los datos recibidos
                if (validateSelectField(selectFieldPermiso) && validateSelectField(selectFieldArea)) {
                    // Procesar los datos si son válidos
                    if (userInfo.admin && !userInfo.superAdmin) {
                        req.body.superAdmin = 'off'
                        req.body.admin = 'off'
                    }

                    if(userToModify && userLogged) {
                        var updatedUser = {
                            name: req.body.name,
                            lastName: req.body.lastName,
                            email: emailInput,
                            username: usernameInput,
                            avatar: req.body.imageTextAvatarUser,
                            permiso: selectFieldPermiso, //req.body.permisoHidden,
                            area: selectFieldArea,
                            status: req.body.status === 'on' ? Boolean(true) : Boolean(false),
                            admin: req.body.admin === 'on' ? Boolean(true) : Boolean(false),
                            superAdmin: req.body.superAdmin === 'on' ? Boolean(true) : Boolean(false),
                            modificator: userModificator,
                            modifiedOn: now
                        }

                        const usuario = await this.users.updateUser(id, updatedUser, userModificator)
                    
                        if(!usuario) {
                            const err = new Error('No fue posible Actualizar el Usuario!')
                            err.dirNumber = 400
                            next(err);
                        }
                                
                        const csrfToken = csrfTokens.create(req.csrfSecret);
                        return res.render('addNewUser', {
                            usuario,
                            username,
                            userInfo,
                            expires,
                            csrfToken
                        })

                    } else {
                        const err = new Error('userToModify || userLogged error')
                        err.dirNumber = 400
                        next(err);
                    }

                } else {
                    const err = new Error('Error en permiso o área seleccionada')
                    err.dirNumber = 400
                    next(err);
                }

            } catch (err) {
                err.dirNumber = 400
                next(err);
            }
             
            function validateSelectField(value) {
                const validOptions = [
                    'diseno', 'simulacion', 'disenoSimulacion', 'projectManager',
                    'cadCam', 'mecanizado', 'ajuste', 'todos',
                    'ingenieria', 'fabricacion', 'proyectos', 'administracion', 'todas'
                ]
                return validOptions.includes(value);
            }
        })
    }

    updateUserPreferences = async (req, res, next) => {
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

        const csrfToken = req.body._csrf;
        if (!csrfTokens.verify(req.csrfSecret, csrfToken)) {
            
            const error = new Error ('Invalid CSRF token')
            const dirNumber = 500
            let errorInfo = errorInformation(dirNumber)

            return res.render('errorPages', {
                error,
                errorInfo
            })
        }
        
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

                    if(!usuario) {
                        const error = new Error('No fue posible Actualizar el Usuario!')
                        const dirNumber = 404
                        let errorInfo = errorInformation(dirNumber)
                        
                        res.render('errorPages', {
                            error,
                            errorInfo
                        })
                    }
                        
                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    res.render('userSettings', {
                        usuario,
                        username,
                        userInfo,
                        expires,
                        csrfToken
                    })

                } catch (error) {
                    const dirNumber = 500
                    let errorInfo = errorInformation(dirNumber)
                    
                    res.render('errorPages', {
                        error,
                        errorInfo
                    })
                }
            })

        } else {
            const error = new Error('userToModify || userLogged error')
            const dirNumber = 500
            let errorInfo = errorInformation(dirNumber)
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    getUserSettings = async (req, res, next) => {
        const id = req.params.id

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id
        const usuario = await this.users.getUserById(userId)

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        try {
            if (!usuario) {
                const error = new Error(`No fue posible encontrar el Usuario con el id#: ${id}!`)
                const dirNumber = 404
                let errorInfo = errorInformation(dirNumber)
                
                res.render('errorPages', {
                    error,
                    errorInfo
                })
            }

            const csrfToken = csrfTokens.create(req.csrfSecret); 
            res.render('userSettings', {
                usuario,
                username,
                userInfo,
                expires,
                csrfToken
            })

        } catch (error) {
            const dirNumber = 500
            let errorInfo = errorInformation(dirNumber)
            
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    searchUsers = async (req, res, next) => {
        const users = await this.users.getAllUsers()
        
        try {
            if(users.error) {
                const error = new Error(`No hoy Usuarios cargados!`)
                const dirNumber = 404
                let errorInfo = errorInformation(dirNumber)
                
                res.render('errorPages', {
                    error,
                    errorInfo
                })
            }

        } catch (error) {
            catchError(error, res)
        }
    }

    deleteUserById = async (req, res, next) => {
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

        const csrfToken = req.body._csrf;
        if (!csrfTokens.verify(req.csrfSecret, csrfToken)) {
            
            const error = new Error ('Invalid CSRF token')
            catchError(error, res)
        }

        try {
            const usuario = await this.users.deleteUserById(id, userModificator)

            if(!usuario) {
                const error = new Error(`No hoy Usuarios cargados!`)
                const dirNumber = 404
                let errorInfo = errorInformation(dirNumber)
                
                res.render('errorPages', {
                    error,
                    errorInfo
                })
            }
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewUser', {
                usuario,
                username,
                userInfo,
                expires,
                csrfToken
            })

        } catch (error) {
            catchError(error, res)
        }
    }

    login = async (req, res, next) => {
        const { username, password, sessionStarted } = req.body
        let visits = req.session.visits
    
        const cookie = req.session.cookie
        const time = cookie.expires
        let expires = new Date(time)

        const csrfToken = req.body._csrf;
        if (!csrfTokens.verify(req.csrfSecret, csrfToken)) {
            
            const error = new Error ('Invalid CSRF token')
            const dirNumber = 500
            let errorInfo = errorInformation(dirNumber)

            return res.render('errorPages', {
                error,
                errorInfo
            })
        }
        
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
                    const usuario = await this.users.getUserByUsernameAndPassword(user.username, user.password)
                    const userInfo = await this.users.getUserByUsername(user.username)

                    const clientes = await this.clients.getAllClients()
                    const usuarios = await this.users.getAllUsers()
                    const proyectos = await this.projects.getAllProjects()
                    const mensajes = await this.messages.getAllMessages()
                    const sessionLogin = await this.users.getAllSessions()
                    
                    const sessions = parseInt(sessionLogin.length+1)

                        if (!usuario) {
                            const csrfToken = csrfTokens.create(req.csrfSecret);
                            return res.render('login', {
                                flag: false,
                                fail: false,
                                csrfToken
                            })

                        } else if (usuario && userInfo.status ) {
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

                        } else {
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
                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    setTimeout(() => {
                        return res.render('login', {
                            flag,
                            fail,
                            csrfToken
                        })
                    }, 600)
                }

        } catch (error) {
            catchError(error, res)
        }
    }

    resetUserPassword = async (req, res, next) => {
        try {
            const existeUsuario = await this.users.getUserByEmail(req.body.email)

            const csrfToken = req.body._csrf;
            if (!csrfTokens.verify(req.csrfSecret, csrfToken)) {
                
                const error = new Error ('Invalid CSRF token')
                const dirNumber = 500
                let errorInfo = errorInformation(dirNumber)

                return res.render('errorPages', {
                    error,
                    errorInfo
                })
            }
            
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
            catchError(error, res)
        }
    }

    updatePasswordByUser = async (req, res, next) => {
        const id = req.params.id
        const newPassword = req.body.password
        const confirmNewPassword = req.body.confirmPassword

        const csrfToken = req.body._csrf;
        if (!csrfTokens.verify(req.csrfSecret, csrfToken)) {
            
            const error = new Error ('Invalid CSRF token')
            const dirNumber = 500
            let errorInfo = errorInformation(dirNumber)

            return res.render('errorPages', {
                error,
                errorInfo
            })
        }
        
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
                        
                        setTimeout(() => {                            
                            res.render('200-PasswordResetSuccess', {
                            })

                        }, 3000)
    
                    } catch (error) {
                        catchError(error, res)
                    }
    
            } else {
                const error = new Error('Usuario no existe!')
                catchError(error, res)
            }

        } else {
            const error = new Error('Password no coinciden!')
            catchError(error, res)
        }
    }

    userLogout = async (req, res, next) => {
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
            catchError(error, res)
        }    
    }

    authBloq = async (req, res, next) => {
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
            catchError(error, res)
        }
    }

    authNoBloq = async (req, res, next) => {
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
            catchError(error, res)
        }

    }

    index = async (req, res, next) => {
   
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
                const csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('login', {
                    flag,
                    fail,
                    csrfToken
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
            catchError(error, res)
        }
    }

    clientes = async (req, res, next) => {
    
        let username = res.locals.username
        let userInfo = res.locals.userInfo
    
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const csrfToken = req.body._csrf;
        if (!csrfTokens.verify(req.csrfSecret, csrfToken)) {
            
            const error = new Error ('Invalid CSRF token')
            const dirNumber = 500
            let errorInfo = errorInformation(dirNumber)

            return res.render('errorPages', {
                error,
                errorInfo
            })
        }
        
        try {
            const visits = req.session.visits
            const user = await this.users.getUserByUsername(username)
            
            const { flag, fail } = true
            
            if (!user) {
                const error = new Error('No fue posible encontrar el Usuario!')
                const dirNumber = 404
                let errorInfo = errorInformation(dirNumber)
                
                res.render('errorPages', {
                    error,
                    errorInfo
                })

            } else if ( user && user.status ) {
                const access_token = generateToken(user)
                req.session.admin = true
                req.session.username = userInfo.username
                const csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('clientes', {
                    userInfo,
                    username,
                    expires,
                    csrfToken
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
            catchError(error, res)
        }
    }
}

module.exports = { UsersController }