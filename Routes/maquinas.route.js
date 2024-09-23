const { Router } = require('express')
const routerTools = Router()

const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
const { authUserMiddleware } = require('../middlewares/authUser.middleware.js')

const GetTools = require('../controllers/maquinas.controller.js')
const getTools = GetTools.ToolsController
const tools = new getTools()

//---------------- Get All Tools in DB ------------------
routerTools.get('/', checkAuthentication, tools.getAllTools)

//---------------- Get Tool by Id  ----------------------
routerTools.get('/:id', checkAuthentication, tools.getToolById) //authUserMiddleware,

//---------------- Create a New Tool  -------------------
routerTools.post('/newTool', checkAuthentication, tools.createNewTool) //authUserMiddleware,

//---------------- Update a Tool  -----------------------
routerTools.post('/update/:id', checkAuthentication, tools.updateTool) //authUserMiddleware,

//---------------- Delete a Tool  -----------------------
routerTools.get('/delete/:id', checkAuthentication, tools.deleteToolById) //authUserMiddleware,

//---------------- Search a Tool sort by designation -----------------------
routerTools.get('/searchTools/all', checkAuthentication, tools.searchTools) //authUserMiddleware,

module.exports = routerTools