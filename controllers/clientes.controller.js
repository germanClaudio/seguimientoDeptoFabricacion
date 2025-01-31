const ClientsService = require("../services/clients.service.js"),
    UserService = require("../services/users.service.js"),
    ProjectsService = require("../services/projects.service.js"),

    csrf = require('csrf'),
    csrfTokens = csrf(),

    imageNotFound = 'https://storage.googleapis.com/imagenesproyectosingenieria/upload/LogoClientImages/noImageFound.png',  //"../../../src/images/upload/LogoClientImages/noImageFound.png"
    cookie = require('../utils/cookie.js'),
    data = require('../utils/variablesInicializator.js'),
    { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty } = require('../utils/generateUsers.js'),
    { uploadToGCS } = require("../utils/uploadFilesToGSC.js"),
    { uploadMulterSingleLogoClient, uploadMulterSingleLogoUpdate } = require("../utils/uploadMulter.js");

let formatDate = require('../utils/formatDate.js')

const {catchError400,
    catchError400_1,
    catchError400_2,
    catchError400_3,
    catchError400_4,
    catchError403,
    catchError401,
    catchError401_1,
    catchError401_2,
    catchError401_3,
    catchError401_4,
    catchError500
} = require('../utils/catchErrors.js')

class ClientsController {
    constructor() {
        this.clients = new ClientsService()
        this.users = new UserService()
        this.projects = new ProjectsService()
    }

    getAllClients = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)         
        
        try {
            const clientes = await this.clients.getAllClients()
            !clientes ? catchError401(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('addNewClients', {
                username,
                userInfo,
                expires,
                clientes,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getClientProjectsById = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const cliente = await this.clients.getClientById(id)
            !cliente ? catchError401(req, res, next) : null

            const proyectos = await this.projects.getProjectsByClientId(id)
            !proyectos ? catchError400(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                proyectos,
                cliente,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getClientById = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const cliente = await this.clients.getClientById(id)
            !cliente ? catchError401(req, res, next) : null
            
            const proyectos = await this.projects.getProjectsByClientId(id)
            !proyectos ? catchError400(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('clientProjectsDetails', {
                cliente,
                username,
                userInfo,
                expires,
                proyectos,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    selectClientById = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const cliente = await this.clients.getClientById(id)
            !cliente ? catchError401(req, res, next) : null

            const proyectos = await this.projects.getProjectsByClientId(id)
            !proyectos ? catchError401_1(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('clientDetails', {
                cliente,
                username,
                userInfo,
                expires,
                proyectos,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    createNewClient = async (req, res, next) => {
                
        uploadMulterSingleLogoClient(req, res, async (err) => {
            let username = res.locals.username
            let userInfo = res.locals.userInfo
            const expires = cookie(req)
            
            try {
                const userId = userInfo.id
                const userCreator = await this.users.getUserById(userId)
                !userCreator.visible ? catchError401_3(req, res, next) : null
            
                const clientNameInput = req.body.name.replace(/[!@#$%^*]/g, "");
                const codeInput = req.body.code

                if(req.file) {
                    await uploadToGCS(req, res, next)
                }

                const newClientValid = {
                    name: clientNameInput,
                    status: req.body.statusClient === 'on' ? Boolean(true) : Boolean(false) || Boolean(true),
                    code: codeInput,
                    project: 0,
                    logo: req.body.imageTextLogoClient || imageNotFound,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: '',
                    visible: true
                }

                const clientExist = await this.clients.getExistingClient(newClientValid);
                if (clientExist) {
                    catchError400_4(req, res, next)
                }

                const cliente = await this.clients.addClient(newClientValid)
                !cliente ? catchError401(req, res, next) : null

                const csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('addNewClients', {
                    username,
                    userInfo,
                    expires,
                    cliente,
                    data,
                    csrfToken
                })

            } catch (err) {
                catchError500(err, req, res, next)
            }
        })
    }

    updateClient = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        uploadMulterSingleLogoUpdate(req, res, async (err) => {
            try {
                const clienteToModify = await this.clients.getClientById(id)
                !clienteToModify ? catchError401(req, res, next) : null

                const userId = userInfo.id
                const userCreator = await this.users.getUserById(userId)
                !userCreator ? catchError401_3(req, res, next) : null

                if (req.file) {
                    await uploadToGCS(req, res, next)
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
                clientesNames.includes(clienteToModify.name) ? catchError400_4(req, res, next) : null
                
                const codeInput = req.body.code.replace(/[!@#$%^&*]/g, "")
                const clientesCodes = clientesRestantes.map(cliente => cliente.code)
                
                clientesCodes.includes(clienteToModify.code) ? catchError400_4(req, res, next) : null
                
                const updatedCliente = {
                    name: req.body.name,
                    status: req.body.statusClient === 'on' ? true : false,
                    code: codeInput,
                    logo: req.body.imageTextLogoUpdate,
                    modificator: dataUserModificatorNotEmpty(userCreator),
                    modifiedOn: formatDate()
                }
                                
                if (clienteToModify) {
                    const clientUpdated = await this.clients.updateClient(
                        id, 
                        updatedCliente, 
                        dataUserModificatorNotEmpty(userCreator)
                    )
                    !clientUpdated ? catchError401(req, res, next) : null

                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    return res.render('addNewClients', {
                        username,
                        userInfo,
                        expires,
                        clientUpdated,
                        data,
                        csrfToken
                    })
                                    
                } else {
                    catchError401(req, res, next)
                }  
    
            } catch (err) {
                catchError500(err, req, res, next)
            }
        })       
    }

    updateClientProjectsQty = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        !userCreator ? catchError401_3(req, res, next) : null 

        try {
            const proyectos = await this.projects.getProjectsByClientId(id)
            const clientToUpdateProjectQty = await this.clients.getClientById(id)
            !proyectos || !clientToUpdateProjectQty ? catchError401_1(req, res, next) : null

            const cliente = await this.clients.updateClientProjectsQty(
                id, 
                clientToUpdateProjectQty, 
                dataUserModificatorNotEmpty(userCreator))
            !cliente ? catchError401(req, res, next) : null
        
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('clientProjectsDetails', {
                cliente,
                username,
                userInfo,
                expires,
                proyectos,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    reduceClientProjectQty = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            if (!userCreator) {
                catchError401_3(req, res, next)
            }

            const proyectos = await this.projects.getProjectsByClientId(id)
            const clientToUpdateProjectQty = await this.clients.getClientById(id)
            if (!proyectos || !clientToUpdateProjectQty) {
                catchError401_1(req, res, next)
            }

            const cliente = await this.clients.reduceClientProjectQty(
                id, 
                clientToUpdateProjectQty, 
                dataUserModificatorNotEmpty(userCreator))
            if (!cliente) {
                catchError401(req, res, next)
            }
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                cliente,
                proyectos,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    deleteClientById = async (req, res, next) => {
        const clientId = req.params.id
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            if (!userCreator) {
                catchError401_3(req, res, next)
            }

            const cliente = await this.clients.deleteClientById(clientId, dataUserModificatorNotEmpty(userCreator))
            if (!cliente) {
                catchError401(req, res, next)
            }
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('addNewClients', {
                username,
                userInfo,
                expires,
                cliente,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    deleteAllClients = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const clientsDeleted = await this.clients.deleteAllClients()
            if (!clientsDeleted) {
                catchError401(req, res, next)
            }
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('addNewClients', {
                username,
                userInfo,
                expires,
                clientsDeleted,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

}

module.exports = { ClientsController }