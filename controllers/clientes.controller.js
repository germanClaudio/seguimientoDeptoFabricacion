const ClientsService = require("../services/clients.service.js"),
    UserService = require("../services/users.service.js"),
    ProjectsService = require("../services/projects.service.js"),
    CartsService = require("../services/carts.service.js"),
    OrdersService = require("../services/orders.service.js"),

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
    catchError400_5,
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
        this.carts = new CartsService()
        this.orders = new OrdersService()
    }

    getAllClients = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const clientes = await this.clients.getAllClients()
            !clientes ? catchError401(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('addNewClients', {
                username,
                userInfo,
                userCart,
                ordenes,
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
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const cliente = await this.clients.getClientById(id)
            !cliente ? catchError401(req, res, next) : null

            const proyectos = await this.projects.getProjectsByClientId(id)
            !proyectos ? catchError400(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('clientProjectsDetails', {
                username,
                userInfo,
                userCart,
                ordenes,
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
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const cliente = await this.clients.getClientById(id)
            !cliente ? catchError401(req, res, next) : null
            
            const proyectos = await this.projects.getProjectsByClientId(id)
            !proyectos ? catchError400(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('clientProjectsDetails', {
                cliente,
                username,
                userInfo,
                userCart,
                ordenes,
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
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const cliente = await this.clients.getClientById(id)
            !cliente ? catchError401(req, res, next) : null

            const proyectos = await this.projects.getProjectsByClientId(id)
            !proyectos ? catchError401_1(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('clientDetails', {
                cliente,
                username,
                userInfo,
                userCart,
                ordenes,
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
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        uploadMulterSingleLogoClient(req, res, async (err) => {
            
            try {
                const userId = userInfo.id
                const userCreator = await this.users.getUserById(userId)
                !userCreator.visible ? catchError401_3(req, res, next) : null
            
                const clientNameInput = req.body.name.replace(/[!@#$%^*]/g, "");
                const codeInput = req.body.code

                req.file ? await uploadToGCS(req, res, next) : null

                const newClientValid = {
                    name: clientNameInput,
                    status: req.body.statusClient === 'on' ? Boolean(true) : Boolean(false) || Boolean(true),
                    code: codeInput,
                    project: 0,
                    projectLineas: 0,
                    logo: req.body.imageTextLogoClient || imageNotFound,
                    creator: await dataUserCreator(userCreator),
                    timestamp: new Date(),
                    modificator: await dataUserModificatorEmpty(),
                    modifiedOn: new Date(),
                    visible: true
                }

                const clientExist = await this.clients.getExistingClient(newClientValid);
                clientExist ? catchError400_4(req, res, next) : null

                const cliente = await this.clients.addClient(newClientValid)
                !cliente ? catchError401(req, res, next) : null

                const ordenes = await this.orders.getAllOrders()
                !ordenes ? catchError400_5(req, res, next) : null

                const userCart = await this.carts.getCartByUserId(userId)

                const csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('addNewClients', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
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
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        uploadMulterSingleLogoUpdate(req, res, async (err) => {
            try {
                const clienteToModify = await this.clients.getClientById(id)
                !clienteToModify ? catchError401(req, res, next) : null

                const userId = userInfo.id
                const userCreator = await this.users.getUserById(userId)
                !userCreator ? catchError401_3(req, res, next) : null

                req.file ? await uploadToGCS(req, res, next) : null

                const nameInput = req.body.name.replace(/[!@#$%^&*]/g, ""),
                    codeInput = req.body.code.replace(/[!@#$%^&*]/g, ""),
                    clientValid = await this.clients.getClientByNameOrCode(nameInput, codeInput),
                    otherClients = await this.clients.getAllClients()

                // Función para eliminar un cliente de la lista si coincide con el cliente a comparar
                function eliminarCliente(lista) { //, cliente) {
                    return lista.filter(c => {
                        // Compara los campos que sean necesarios
                        return c._id.toString() !== clienteToModify._id.toString()
                    })

                    // lista.some(cliente => 
                    //     cliente._id.toString() !== clienteToModify._id.toString() //&& 
                    //     //cliente.code === clienteToModify.code
                    // )
                }

                // Eliminar el cliente de la lista
                let clientesRestantes = []
                if (clientValid) {
                    clientesRestantes = eliminarCliente(otherClients) //, nameValid)
                    const clientesNamesOrCodes = clientesRestantes.map(cliente => cliente.name) || clientesRestantes.map(cliente => cliente.code)
                    console.log('clientesNamesOrCodes: ', clientesNamesOrCodes)
                    clientesNamesOrCodes.includes(clienteToModify.name || clienteToModify.code) ? catchError400_4(req, res, next) : null
                }
                
                // if (codeInput) {
                //     clientesRestantes = eliminarCliente(otherClients) //, codeInput)
                //     const clientesCodes = clientesRestantes.some(cliente => cliente.code)
                //     clientesCodes.includes(clienteToModify.code) ? catchError400_4(req, res, next) : null
                // }
                
                const updatedCliente = {
                    name: req.body.name,
                    status: req.body.statusClient === 'on' ? true : false,
                    code: codeInput,
                    logo: req.body.imageTextLogoUpdate,
                    modificator: await dataUserModificatorNotEmpty(userCreator),
                    modifiedOn: new Date(),
                }
                
                if (clienteToModify) {
                    const clientUpdated = await this.clients.updateClient(
                        id, 
                        updatedCliente, 
                        updatedCliente.modificator
                    )
                    !clientUpdated ? catchError401(req, res, next) : null

                    const ordenes = await this.orders.getAllOrders()
                    !ordenes ? catchError400_5(req, res, next) : null

                    const userCart = await this.carts.getCartByUserId(userId)

                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    return res.render('addNewClients', {
                        username,
                        userInfo,
                        userCart,
                        ordenes,
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
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

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

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)
        
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('clientProjectsDetails', {
                cliente,
                username,
                userInfo,
                userCart,
                ordenes,
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
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null

            const proyectos = await this.projects.getProjectsByClientId(id)
            const clientToUpdateProjectQty = await this.clients.getClientById(id)
            !proyectos || !clientToUpdateProjectQty ? catchError401_1(req, res, next) : null

            const cliente = await this.clients.reduceClientProjectQty(
                id, 
                clientToUpdateProjectQty, 
                dataUserModificatorNotEmpty(userCreator))
            !cliente ? catchError401(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('clientProjectsDetails', {
                username,
                userInfo,
                userCart,
                ordenes,
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
        const clientId = req.params.id,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null

            const cliente = await this.clients.deleteClientById(clientId, await dataUserModificatorNotEmpty(userCreator))
            !cliente ? catchError401(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('addNewClients', {
                username,
                userInfo,
                userCart,
                ordenes,
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
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const clientsDeleted = await this.clients.deleteAllClients()
            !clientsDeleted ? catchError401(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userInfo._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('addNewClients', {
                username,
                userInfo,
                userCart,
                ordenes,
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