const { Router } = require('express')
const routerTools = Router()

const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
const { authUserMiddleware } = require('../middlewares/authUser.middleware.js')

const GetTools = require('../controllers/maquinas.controller.js')
const getTools = GetTools.ToolsController
const tools = new getTools()

//---------------- Get All Tools in DB ------------------
routerTools.get('/', checkAuthentication, authUserMiddleware, tools.getAllTools)

//---------------- Get Tool by Id  ----------------------
routerTools.get('/:id', checkAuthentication, authUserMiddleware, tools.getToolById)

//---------------- Create a New Tool  -------------------
routerTools.post('/newTool', checkAuthentication, authUserMiddleware, tools.createNewTool)

//---------------- Update a Tool  -----------------------
routerTools.post('/update/:id', checkAuthentication, authUserMiddleware, tools.updateTool)

//---------------- Delete a Tool  -----------------------
routerTools.get('/delete/:id', checkAuthentication, authUserMiddleware, tools.deleteToolById)

//---------------- Search a Tool sort by designation -----------------------
//routerTools.get('/searchTools/:designation', checkAuthentication, authUserMiddleware, tools.searchTools)

module.exports = routerTools