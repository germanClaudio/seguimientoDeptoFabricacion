const { Router } = require('express')
const routerCuttingTools = Router()

const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
// const { authUserMiddleware } = require('../middlewares/authUser.middleware.js')

const GetCuttingTools = require('../controllers/herramientas.controller.js')
const getCuttingTools = GetCuttingTools.CuttingToolsController
const cuttingTools = new getCuttingTools()

//---------------- Get All CuttingTools in DB ------------------
routerCuttingTools.get('/', checkAuthentication, cuttingTools.getAllCuttingTools)

//---------------- Get CuttingTool by Id  ----------------------
routerCuttingTools.get('/:id', checkAuthentication, cuttingTools.getCuttingToolById)

//---------------- Create a New CuttingTool  -------------------
routerCuttingTools.post('/newCuttingTool', checkAuthentication, cuttingTools.createNewCuttingTool)

//---------------- Update a CuttingTool  -----------------------
routerCuttingTools.post('/update/:id', checkAuthentication, cuttingTools.updateCuttingTool)

//---------------- Delete a CuttingTool  -----------------------
routerCuttingTools.get('/delete/:id', checkAuthentication, cuttingTools.deleteCuttingToolById)

//---------------- Search a CuttingTool sort by designation -----------------------
routerCuttingTools.get('/searchCuttingTools/all', checkAuthentication, cuttingTools.searchCuttingTools)

module.exports = routerCuttingTools