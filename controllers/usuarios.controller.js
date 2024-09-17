const UserService = require("../services/users.service.js")
const ProyectosService = require("../services/projects.service.js")
const ClientesService = require("../services/clients.service.js")
const MessagesService = require("../services/messages.service.js")
const ToolsService = require("../services/tools.service.js")

const { uploadToGCS } = require("../utils/uploadFilesToGSC.js")
const { uploadMulterSingleAvatarUser } = require("../utils/uploadMulter.js")
const { generateToken } = require('../utils/generateToken')

let now = require('../utils/formatDate.js')
const bCrypt = require('bcrypt')

const csrf = require('csrf');
const csrfTokens = csrf();

let userPictureNotFound = "../../../src/images/upload/AvatarUsersImages/incognito.jpg"
const cookie = require('../utils/cookie.js')

const data = require('../utils/variablesInicializator.js')

const { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty } = require('../utils/generateUsers.js')

const sessionTime = parseInt(process.env.SESSION_TIME) // 12 HORAS

function validateSelectField(value) {
    const validOptions = [
        'diseno', 'simulacion', 'disenoSimulacion', 'projectManager',
        'cadCam', 'mecanizado', 'ajuste', 'todos',
        'ingenieria', 'fabricacion', 'proyectos', 'administracion', 'todas'
    ]
    return validOptions.includes(value);
}

const {catchError400,
    catchError400_1,
    catchError400_2,
    catchError400_3,
    catchError400_4,
    catchError400_5,
    catchError400_6,
    catchError403,
    catchError401,
    catchError401_1,
    catchError401_2,
    catchError401_3,
    catchError401_4,
    catchError500
} = require('../utils/catchErrors.js')

class UsersController {  
    constructor(){
        this.projects = new ProyectosService()
        this.clients = new ClientesService()
        this.users = new UserService()
        this.messages = new MessagesService()
        this.tools = new ToolsService()
    }

    getAllUsers = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const usuarios = await this.users.getAllUsers()
            !usuarios ? catchError400_5(req, res, next) : null

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewUser', {
                usuarios,
                username,
                userInfo,
                expires,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getUserById = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const usuario = await this.users.getUserById(id)
            !usuario ? catchError401_3(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('userDetails', {
                usuario,
                username,
                userInfo,
                expires,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getUserByUsername = async (req, res, next) => {
        const { username } = req.params
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('userDetails', {
                usuario,
                username,
                userInfo,
                expires,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getUserByUsernameAndPassword = async (req, res, next) => {
        const { username } = req.params
        const { password } = req.body

        try {
            const usuario = await this.users.getUserByUsernameAndPassword(username, password)
            !usuario ? catchError400_3(req, res, next) : null

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    createNewUser = async (req, res, next) => {
        let username = res.locals.username;
        let userInfo = res.locals.userInfo;
        const expires = cookie(req)

        //------ Storage New User Image in Google Store --------        
        uploadMulterSingleAvatarUser(req, res, async (err) => {
            try {
                req.file ? await uploadToGCS(req, res, next) : null

                let userManager = await this.users.getUserByUsername(username);
                const userId = userManager._id;
                const userCreator = await this.users.getUserById(userId);
                !userCreator ? catchError401_3(req, res, next) : null

                const usernameInput = req.body.username.replace(/[!@#$%^&*]/g, "");
                const emailInput = req.body.email;
                const legajoIdInput = req.body.userLegajoId;

                const newUserValid = {
                    username: usernameInput,
                    legajoId: parseInt(legajoIdInput),
                    email: emailInput
                };

                const userExist = await this.users.getExistingUser(newUserValid);
                userExist ? catchError400_6(req, res, next) : null

                req.body.password !== req.body.confirmPassword ? catchError400_3(req, res, next) : null

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
                        legajoId: parseInt(legajoIdInput),
                        avatar: req.body.imageTextAvatarUser || userPictureNotFound,
                        password: req.body.password,
                        permiso: selectFieldPermiso,
                        area: selectFieldArea,
                        status: req.body.status === 'on' ? Boolean(true) : Boolean(false) || Boolean(true),
                        admin: req.body.admin === 'on' ? Boolean(true) : Boolean(false),
                        superAdmin: req.body.superAdmin === 'on' ? Boolean(true) : Boolean(false),
                        creator: dataUserCreator(userCreator),
                        timestamp: now,
                        modificator: dataUserModificatorEmpty(),
                        modifiedOn: '',
                        visible: true
                    };

                    const usuario = await this.users.addNewUser(newUser);
                    !usuario ? catchError400_6(req, res, next) : null

                    const usuarioLog = await this.users.getUserByUsername(username);
                    !usuarioLog ? catchError401_3(req, res, next) : null

                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    return res.render('addNewUser', {
                        usuario,
                        username,
                        userInfo,
                        expires,
                        data,
                        csrfToken
                    });

                } else {
                    catchError400_3(req, res, next)
                }
                validateSelectField(value)

            } catch (err) {
                catchError500(err, req, res, next)
            }
        })
    }
    
    updateUser = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        uploadMulterSingleAvatarUser(req, res, async (err) => {
            try {
                req.file ? await uploadToGCS(req, res, next) : null
                
                const userId = userInfo.id
                const userToModify = await this.users.getUserById(id)
                const userLogged = await this.users.getUserById(userId)
                !userLogged || !userToModify ? catchError401_3(req, res, next) : null

                const usernameInput = req.body.username.replace(/[!@#$%^&* ]/g, "")
                const usernameValid = await this.users.getUserByUsername(usernameInput)
                const otherUsers = await this.users.getAllUsers()

                // Función para eliminar un usuario de la lista si coincide con el usuario a comparar
                function eliminarUsuario(lista, usuario) {
                    return lista.filter(u => {
                        // Compara los campos que sean necesarios
                        return u._id.toString() !== usuario._id.toString()
                    })
                }

                // Eliminar el usuario de la lista
                let usuariosRestantes = eliminarUsuario(otherUsers, usernameValid)

                const usernames = usuariosRestantes.map(usuario => usuario.username)
                if (usernames.includes(userToModify.username)) {
                    const err = new Error (`Ya existe un Usuario con este Username ${usernameInput} o Username inválido!!`)
                    err.statusCode = 400
                    return next(err);
                }

                const emailInput = req.body.email
                const emails = usuariosRestantes.map(usuario => usuario.email)

                if (emails.includes(userToModify.email)) {
                    const err = new Error (`Ya existe un Usuario con este Em@il ${emailInput} o Em@il inválido!!`)
                    err.statusCode = 400
                    return next(err);
                }

                const legajoIdInput = req.body.legajoIdDisable
                const legajosId = usuariosRestantes.map(usuario => usuario.legajoId);

                if (legajosId.includes(userToModify.legajoId)) {
                    const err = new Error (`Ya existe un Usuario con este Legajo #${legajoIdInput} o # Legajo inválido!!`)
                    err.statusCode = 400
                    return next(err);
                }

                const selectFieldPermiso = req.body.permisoHidden
                const selectFieldArea = req.body.areaHidden

                // Validar y sanitizar los datos recibidos
                if (validateSelectField(selectFieldPermiso) && validateSelectField(selectFieldArea)) {
                    // Procesar los datos si son válidos
                    if (userInfo.admin && !userInfo.superAdmin) {
                        req.body.superAdmin = 'off'
                        req.body.admin = 'off'
                    }

                    if(userLogged.superAdmin) {
                        var updatedUser = {
                            name: req.body.name,
                            lastName: req.body.lastName,
                            email: emailInput,
                            username: usernameInput,
                            avatar: req.body.imageTextAvatarUser,
                            legajoId: legajoIdInput,
                            area: selectFieldArea,
                            admin: req.body.admin === 'on' ? Boolean(true) : Boolean(false),
                            superAdmin: req.body.superAdmin === 'on' ? Boolean(true) : Boolean(false),
                            status: req.body.status === 'on' ? Boolean(true) : Boolean(false),
                            permiso: selectFieldPermiso,
                            modificator: dataUserModificatorNotEmpty(userLogged),
                            modifiedOn: now
                        }

                    } else {
                        var updatedUser = {
                            name: req.body.name,
                            lastName: req.body.lastName,
                            email: emailInput,
                            avatar: req.body.imageTextAvatarUser,
                            area: selectFieldArea,
                            status: req.body.status === 'on' ? Boolean(true) : Boolean(false),
                            permiso: selectFieldPermiso,
                            modificator: dataUserModificatorNotEmpty(),
                            modifiedOn: now
                        }
                    }

                        const usuario = await this.users.updateUser(id, updatedUser, dataUserModificatorNotEmpty(userLogged))
                        !usuario ? catchError400_3(req, res, next) : null
                                
                        const csrfToken = csrfTokens.create(req.csrfSecret);
                        return res.render('addNewUser', {
                            usuario,
                            username,
                            userInfo,
                            expires,
                            data,
                            csrfToken
                        })

                } else {
                    catchError400_3(req, res, next)
                }

            } catch (err) {
                catchError500(err, req, res, next)
            }
            validateSelectField(value)
        })
    }

    updateUserPreferences = async (req, res, next) => {
        const id = req.params.id
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
            //------ Storage User Image in Google Store --------
            uploadMulterSingleAvatarUser(req, res, async (err) => {
                try {
                    req.file ? await uploadToGCS(req, res, next) : null

                    const userId = userInfo.id
                    const userToModify = await this.users.getUserById(id)
                    const userLogged = await this.users.getUserById(userId)
                    !userLogged || !userToModify ? catchError401_3(req, res, next) : null

                    const emailInput = req.body.email
                    const emailValid = await this.users.getUserByEmail(emailInput)
                    if (emailValid) {
                        const err = new Error (`Ya existe un Usuario con este Em@il ${emailInput} o Em@il inválido!!`)
                        err.statusCode = 400
                        return next(err);
                    }

                    if(userToModify && userLogged) {
                        var updatedUser = {
                            name: req.body.name,
                            lastName: req.body.lastName,
                            email: emailInput,
                            avatar: req.body.imageTextAvatarUser,
                            modificator: dataUserModificatorNotEmpty(userLogged),
                            modifiedOn: now
                        }
                    
                        const usuario = await this.users.updateUserPreferences(id, updatedUser, dataUserModificatorNotEmpty(userLogged))
                        !usuario ? catchError401_3(req, res, next) : null
                        
                        const csrfToken = csrfTokens.create(req.csrfSecret);
                        res.render('userSettings', {
                            usuario,
                            username,
                            userInfo,
                            expires,
                            data,
                            csrfToken
                        })

                    } else {
                        catchError401_3(req, res, next)
                    }

                } catch (err) {
                    catchError500(err, req, res, next)
                }
            })
    }

    getUserSettings = async (req, res, next) => {
        const id = req.params.id
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        const csrfToken = req.body._csrf;
        !csrfTokens.verify(req.csrfSecret, csrfToken) ? catchError403(req, res, next) : null

        try {
            const userId = userInfo.id
            const usuario = await this.users.getUserById(userId)
            if (!usuario) {
                const err = new Error(`No fue posible encontrar el Usuario con el id#: ${id}!`)
                err.statusCode = 404
                next(err);
            }

            const csrfToken = csrfTokens.create(req.csrfSecret); 
            res.render('userSettings', {
                usuario,
                username,
                userInfo,
                expires,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    searchUsers = async (req, res, next) => {
        try {
            const users = await this.users.getAllUsers()
            !users ? catchError400_5(req, res, next) : null
            res.send(users)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    deleteUserById = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const userToDelete = await this.users.getUserById(id)
            userToDelete ? catchError401_3(req, res, next) : null

            const userId = userInfo.id
            const userLogged = await this.users.getUserById(userId)
            !userLogged ? catchError401_3(req, res, next) : null

            const usuario = await this.users.deleteUserById(id, dataUserModificatorNotEmpty(userLogged))
            !usuario ? catchError401_3(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewUser', {
                usuario,
                username,
                userInfo,
                expires,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    login = async (req, res, next) => {
        const { username, password, sessionStarted } = req.body
        let visits = req.session.visits
    
        const cookie = req.session.cookie
        const time = cookie.expires
        let expires = new Date(time)

        const csrfToken = req.body._csrf;
        !csrfTokens.verify(req.csrfSecret, csrfToken) ? catchError403(req, res, next) : null
        
        try {
            if (sessionStarted) {
                req.session.cookie.expires = new Date(Date.now() + sessionTime )
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
                const maquinas = await this.tools.getAllTools()
                
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
                            usuario,
                            username,
                            userInfo,
                            visits,
                            expires,
                            clientes,
                            usuarios,
                            proyectos,
                            mensajes,
                            data,
                            sessions,
                            maquinas
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

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    resetUserPassword = async (req, res, next) => {
        const csrfToken = req.body._csrf;
        !csrfTokens.verify(req.csrfSecret, csrfToken) ? catchError403(req, res, next) : null

        try {
            const existeUsuario = await this.users.getUserByEmail(req.body.email)
            if (!existeUsuario) {
                setTimeout(() => {
                    return res.render('notAllowedEmail', {
                    })
                }, 2000)

            } else {
                const sendEmailToUser = await this.users.resetUserPassword(existeUsuario)
                if (sendEmailToUser) {
                    setTimeout(() => {
                        return res.render('emailSent', {
                        })
                    }, 2000)

                } else {
                    setTimeout(() => {
                        return res.render('notAllowedEmail', {
                        })
                    }, 2000)
                }
            }

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    updatePasswordByUser = async (req, res, next) => {
        const id = req.params.id
        const newPassword = req.body.password
        const confirmNewPassword = req.body.confirmPassword
        let userInfo = res.locals.userInfo

        const csrfToken = req.body._csrf;
        !csrfTokens.verify(req.csrfSecret, csrfToken) ? catchError403(req, res, next) : null
        
        if (newPassword === confirmNewPassword) {
            const userToModify = await this.users.getUserById(id)

            const userId = userInfo.id
            const userLogged = await this.users.getUserById(userId)
            !userLogged ? catchError401_3(req, res, next) : null
        
            if(userToModify.visible && userToModify.status) {
                const updatedUserPassword = {
                    password: newPassword || confirmNewPassword,
                    modificator: dataUserModificatorNotEmpty(userLogged),
                    modifiedOn: now
                }

                try {
                    const usuario = await this.users.updatePasswordByUser(id,
                        updatedUserPassword,
                        dataUserModificatorNotEmpty(userLogged)
                    )
                    if(!usuario) {
                        const err = new Error('No fue posible Actualizar el Password!')
                        err.statusCode = 400
                        next(err);
                    }
                    
                    setTimeout(() => {
                        res.render('200-PasswordResetSuccess', {
                        })
                    }, 500)

                } catch (err) {
                    catchError500(err, req, res, next)
                }
    
            } else {
                catchError401_3(req, res, next)
            }

        } else {
            const err = new Error('Password no coinciden!')
            err.statusCode = 400
            return next(err);
        }
    }

    userLogout = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const usuario = await this.users.userLogout(userInfo._id, username)
            !usuario ? catchError401_3(req, res, next) : null
            
            req.session.destroy(err => {
                err ? catchError400_3(req, res, next) : null
            })

            setTimeout(() => {
                return res.render('logout', {
                    usuario,
                    username,
                    userInfo,
                    expires
                })
            }, 1000)

        } catch (err) {
            catchError500(err, req, res, next)
        }   
    }

    authBloq = async (req, res, next) => {
        let username = req.query.username || ""
        let password = req.query.password || ""
        username = username.replace(/[!@#$%^&*]/g, "")
    
        try {
            const usuario = await this.users.userLogout(password, username)
            !usuario ? catchError400_3(req, res, next) : null

            (!username || !password || !users[username]) ? process.exit(1) : null

            const { salt, hash } = users[username]
            const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512")
        
            crypto.timingSafeEqual(hash, encryptHash) ? res.sendStatus(200) : process.exit(1)
            
        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    authNoBloq = async (req, res, next) => {
        let username = req.query.username || ""
        const password = req.query.password || ""
        username = username.replace(/[!@#$%^&*]/g, "")
    
        try {
            const usuario = await this.users.userLogout(password, username)
            !usuario ? catchError400_3(req, res, next) : null

            (!username || !password || !users[username]) ? process.exit(1) : null

            crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
                (users[username].hash.toString() === hash.toString()) ? res.sendStatus(200) : process.exit(1)
            })
            
        } catch (err) {
            catchError500(err, req, res, next)
        }

    }

    index = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const visits = req.session.visits
            const clientes = await this.clients.getAllClients()
            const usuarios = await this.users.getAllUsers()
            const maquinas = await this.tools.getAllTools()
            const proyectos = await this.projects.getAllProjects()
            const mensajes = await this.messages.getAllMessages()
            const sessionsIndex = await this.users.getAllSessions()
            const sessions = sessionsIndex.length

            const { flag, fail } = true

            const user = await this.users.getUserByUsername(username)
            if (!user) {
                const csrfToken = csrfTokens.create(req.csrfSecret);
                setTimeout(() => {
                    return res.render('login', {
                        flag,
                        fail,
                        csrfToken
                    })
                }, 500)

            } else if ( user.status ) {
                const access_token = generateToken(user)
                const fail = false
                
                req.session.admin = user.admin //req.session.admin = true
                req.session.username = userInfo.username
                
                setTimeout(() => {
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
                        data,
                        sessions,
                        maquinas
                    })
                }, 350)
                
            } else {
                setTimeout(() => {
                    return res.render('notAuthorizated', {
                        userInfo,
                        username,
                        visits,
                        flag,
                        expires
                    })
                }, 500)
            }

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    clientes = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        const visits = req.session.visits
        const { flag, fail } = true

        const csrfToken = req.body._csrf;
        !csrfTokens.verify(req.csrfSecret, csrfToken) ? catchError403(req, res, next) : null
        
        try {            
            const user = await this.users.getUserByUsername(username)
            if (!user) {
                catchError401_3(req, res, next);

            } else if ( user && user.status ) {
                const access_token = generateToken(user)
                req.session.admin = true
                req.session.username = userInfo.username

                const csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('clientes', {
                    userInfo,
                    username,
                    expires,
                    data,
                    csrfToken
                })

            } else {
                setTimeout(() => {
                    return res.render('notAuthorizated', {
                        userInfo,
                        username,
                        visits,
                        flag
                    })
                }, 500)
            }
            
        } catch (err) {
            catchError500(err, req, res, next)
        }
    }
}

module.exports = { UsersController }