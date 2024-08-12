const ClientsService = require("../services/clients.service.js")
const UserService = require("../services/users.service.js")
const ProjectsService = require("../services/projects.service.js")

const { uploadToGCS } = require("../utils/uploadFilesToGSC.js")

const multer = require('multer')

let now = require('../utils/formatDate.js')
let imageNotFound = "../../../src/images/upload/LogoClientImages/noImageFound.png"

const csrf = require('csrf');
const csrfTokens = csrf();


class ClientsController {
    constructor() {
        this.clients = new ClientsService()
        this.users = new UserService()
        this.projects = new ProjectsService()
    }

    getAllClients = async (req, res, next) => {

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        const csrfToken = csrfTokens.create(req.csrfSecret);
        
        try {
            const clientes = await this.clients.getAllClients()

            if (clientes.error) {
                const err = new Error('No existen Clientes Cargados')
                err.dirNumber = 400
                return next(err)
            }
            
            return res.render('addNewClients', {
                clientes,
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

    getClientProjectsById = async (req, res, next) => {
        const { id } = req.params

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const csrfToken = csrfTokens.create(req.csrfSecret);

        try {
            const proyectos = await this.projects.getProjectsByClientId(id)
            const cliente = await this.clients.getClientById(id)

            if (!proyectos) {
                const err = new Error('No existen Proyectos')
                err.dirNumber = 400
                return next(err)
            }
            
            return res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                proyectos,
                cliente,
                csrfToken
            })

        } catch (err) {
            err.dirNumber = 400
            return next(err)
        }
    }

    getClientById = async (req, res, next) => {
        const { id } = req.params
        
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const csrfToken = csrfTokens.create(req.csrfSecret);

        try {
            const cliente = await this.clients.getClientById(id)
            const proyectos = await this.projects.getProjectsByClientId(id)
            
            if (!cliente) {
                const err = new Error('No existe Cliente')
                err.dirNumber = 400
                return next(err)
            }

            return res.render('clientProjectsDetails', {
                cliente,
                username,
                userInfo,
                expires,
                proyectos,
                csrfToken
            })

        } catch (err) {
            err.dirNumber = 400
            return next(err)
        }
    }

    selectClientById = async (req, res, next) => {
        const { id } = req.params
        
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const csrfToken = csrfTokens.create(req.csrfSecret);

        try {
            const cliente = await this.clients.getClientById(id)
            const proyectos = await this.projects.getProjectsByClientId(id)
            
            if (!cliente) {
                const err = new Error('No existe Cliente')
                err.dirNumber = 400
                return next(err)
            }
            
            return res.render('clientDetails', {
                cliente,
                username,
                userInfo,
                expires,
                proyectos,
                csrfToken
            })

        } catch (err) {
            err.dirNumber = 400
            return next(err)
        }
    }

    createNewClient = async (req, res, next) => {
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
        
        uploadMulter(req, res, next, async (err) => {
            if (err) {
                err.dirNumber = 400;
                return next(err);
            }

            try {
                if(req.file) {
                    await uploadToGCS(req, res, next)
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

                const clientNameInput = req.body.name.replace(/[!@#$%^*]/g, "");
                const codeInput = req.body.code

                const newClientValid = {
                    creator: user,
                    name: clientNameInput,
                    status: req.body.statusClient === 'on' ? Boolean(true) : Boolean(false) || Boolean(true),
                    code: codeInput,
                    project: 0,
                    logo: req.body.imageTextLogoClient || imageNotFound,
                    timestamp: now,
                    modificator: modificator,
                    modifiedOn: '',
                    visible: true
                }

                const clientExist = await this.clients.getExistingClient(newClientValid);
                
                if (clientExist) {
                    const err = new Error(`Ya existe un Cliente con estos datos.`);
                    err.dirNumber = 400;
                    err.data = newUserValid
                    return next(err);
                }

                if (err) {
                    const error = new Error('No se agregó ningún archivo')
                    error.httpStatusCode = 400
                    return error
                }

                const csrfToken = req.body._csrf;
                if (!csrfTokens.verify(req.csrfSecret, csrfToken)) {
                    const err = new Error('Invalid CSRF token');
                    err.dirNumber = 403;
                    return next(err);
                }

                const cliente = await this.clients.addClient(newClientValid)

                if (!cliente) {
                    const err = new Error('No se pudo guardar el Cliente!');
                    err.dirNumber = 401;
                    return next(err);
                }

                csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('addNewClients', {
                    cliente,
                    username,
                    userInfo,
                    expires,
                    csrfToken
                })

            } catch (err) {
                err.dirNumber = 400;
                return next(err);
            }
        })
    }

    updateClient = async (req, res, next) => {
         //------ Storage Client Logo Image in Google Store --------
         const storage = multer.memoryStorage({
            fileFilter: (req, file, cb) => {
                if (file.mimetype.startsWith('image/')) {
                    cb(null, true);
                } else {
                    cb(new Error('Solo se permiten imágenes'));
                }
            },
        });
             
        const uploadMulter = multer({
            storage: storage
        }).single('imageLogoUpdate')

        
        uploadMulter(req, res, next, async (err) => {
            if (err) {
                err.dirNumber = 400;
                return next(err);
            }

            try {
                if (req.file) {
                    await uploadToGCS(req, res, next)
                }

                const id = req.params.id
                const clienteToModify = await this.clients.getClientById(id)
            
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

                const csrfToken = req.body._csrf;
                if (!csrfTokens.verify(req.csrfSecret, csrfToken)) {
                    const err = new Error ('Invalid CSRF token')
                    err.dirNumber = 403
                    return next(err)
                }

                const nameInput = req.body.name.replace(/[!@#$%^&*]/g, "")             
                const nameValid = await this.clients.getClientByName(nameInput)
                const otherClients = await this.clients.getAllClients()

                // Función para eliminar un cliente de la lista si coincide con el cliente a comparar
                function eliminarCliente(lista, cliente) {
                    return lista.filter(c => {
                        // Compara los campos que sean necesarios
                        return c._id.toString() !== cliente._id.toString()
                    })
                }
                // Eliminar el cliente de la lista
                let clientesRestantes = eliminarCliente(otherClients, nameValid)
                
                const clientesNames = clientesRestantes.map(cliente => cliente.name)
                
                if (clientesNames.includes(clienteToModify.name)) {
                    const err = new Error (`Ya existe un Cliente con este nombre ${nameInput}`)
                    err.dirNumber = 400
                    return next(err);
                }
                
                const codeInput = req.body.code.replace(/[!@#$%^&*]/g, "")
                const clientesCodes = clientesRestantes.map(cliente => cliente.code)
                
                if (clientesCodes.includes(clienteToModify.code)) {
                    const err = new Error (`Ya existe un Cliente con este código ${codeInput}`)
                    err.dirNumber = 400
                    return next(err);
                }
                
                const updatedCliente = {
                    name: req.body.name,
                    status: req.body.statusClient === 'on' ? true : false,
                    code: req.body.code,
                    logo: req.body.imageTextLogoUpdate,
                    modificator: userModificator,
                    modifiedOn: now
                }
                
                if (err) {
                    const err = new Error('No se agregó ningún archivo')
                    err.dirNumber = 400
                    return next(err)
                }
                
                if (clienteToModify) {
                    const clientUpdated = await this.clients.updateClient(
                        id, 
                        updatedCliente, 
                        userModificator
                    )
                    if(!clientUpdated) {
                        const err = new Error('No fue posible Actualizar el Cliente!')
                        err.dirNumber = 400
                        next(err);
                    }

                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    return res.render('addNewClients', {
                        clientUpdated,
                        username,
                        userInfo,
                        expires,
                        csrfToken
                    })
                                    
                } else {
                    const err = new Error('Error de cliente!')
                    err.dirNumber = 400
                    next(err);
                }  
    
            } catch (err) {
                err.dirNumber = 400
                next(err);
            }
        })       
    }

    updateClientProjectsQty = async (req, res, next) => {
        const id = req.params.id
        
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

        const csrfToken = csrfTokens.create(req.csrfSecret);

        try {
            const proyectos = await this.projects.getProjectsByClientId(id)
            const clientToUpdateProjectQty = await this.clients.getClientById(id)

            const cliente = await this.clients.updateClientProjectsQty(id, clientToUpdateProjectQty, modifier)

            if (!cliente) {
                const err = new Error('Cantidad de proyectos de Cliente no actualizada!')
                err.dirNumber = 400
                return next(err)
            }
                        
            return res.render('clientProjectsDetails', {
                cliente,
                username,
                userInfo,
                expires,
                proyectos,
                csrfToken
            })

        } catch (err) {
            err.dirNumber = 400
            return next(err)
        }
    }

    reduceClientProjectQty = async (req, res, next) => {
        const id = req.params.id
        
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

        const csrfToken = csrfTokens.create(req.csrfSecret);

        try {
            const proyectos = await this.projects.getProjectsByClientId(id)
            const clientToUpdateProjectQty = await this.clients.getClientById(id)
            const cliente = await this.clients.reduceClientProjectQty(id, clientToUpdateProjectQty, modifier)
            
            if (!cliente) {
                const err = new Error('Cantidad de proyectos de Cliente no actualizada!')
                err.dirNumber = 400
                return next(err)
            }
                
            return res.render('clientProjectsDetails', {
                    cliente,
                    username,
                    userInfo,
                    expires,
                    proyectos,
                    csrfToken
                })

        } catch (err) {
            err.dirNumber = 400
            return next(err)
        }
    }

    deleteClientById = async (req, res, next) => {
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

        const csrfToken = csrfTokens.create(req.csrfSecret);

        try {
            const cliente = await this.clients.deleteClientById(clientId, modificator)

            if (!cliente) {
                const err = new Error('No se pudo eliminar el Cliente!')
                err.dirNumber = 400
                return next(err)
            }
            
            return res.render('addNewClients', {
                cliente,
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

    deleteAllClients = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const csrfToken = csrfTokens.create(req.csrfSecret);

        try {
            const clientsDeleted = await this.clients.deleteAllClients()

            return res.render('addNewClients', {
                clientsDeleted,
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

}

module.exports = { ClientsController }