const { Router } = require('express')
const routerLineas = Router()

const { checkAuthentication } = require('../middlewares/chekAuthentication.js')

const GetLineas = require('../controllers/lineas.controller.js')
const getLineas = GetLineas.LineasController
const lineas = new getLineas()

// --------------  Seleccionar todas las Funciones --------------
routerLineas.get('/searchFunciones', checkAuthentication, lineas.getAllFunciones)


module.exports = routerLineas