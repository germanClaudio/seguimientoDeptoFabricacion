const { Router } = require('express')
const routerClientes = Router()
const { authMiddleware } = require('../middlewares/auth.middleware.js')
const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
const { authUserMiddleware, authProductMiddleware} = require('../middlewares/authUser.middleware.js')

const GetClients = require('../controllers/clientes.controller.js')
const getClients = GetClients.ClientsController
const clients = new getClients()

// -------------------  Seleccionar todos los Clientes ------------------
routerClientes.get('/', checkAuthentication, clients.getAllClients)

// -------------------  Seleccionar Cliente por Id ------------------ 
routerClientes.get('/:id', checkAuthentication, clients.getClientById)

// -------------------  Ver detalles del Cliente por Id ------------------ 
routerClientes.get('/select/:id', checkAuthentication, clients.selectClientById)

// -------------------  Ver proyectos del Cliente ------------------ 
routerClientes.get('/projects/:id', checkAuthentication, clients.getClientProjectsById)

// -------------------  Crear Nuevo Cliente ------------------------ 
routerClientes.post('/', checkAuthentication, authUserMiddleware, clients.createNewClient)

// -------------------  Actualizar Cliente por Id ------------------ 
routerClientes.post('/update/:id', checkAuthentication, authUserMiddleware, clients.updateClient)

// -------------------  Eliminar Cliente por Id (Status = Inactivo) ------------------ 
routerClientes.get('/delete/:id', checkAuthentication, authUserMiddleware, clients.deleteClientById)

// -------------------  Eliminar todos los Clientes (Status = Inactivo) ------------------ 
routerClientes.get('/all/delete', checkAuthentication, authUserMiddleware, clients.deleteAllClients)

module.exports = routerClientes