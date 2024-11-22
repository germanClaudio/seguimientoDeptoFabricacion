const { Router } = require('express')
const routerAjustes = Router()

const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
// const { authUserMiddleware} = require('../middlewares/authUser.middleware.js')

const GetAjustes = require('../controllers/ajustes.controller.js')
const getAjustes = GetAjustes.AjustesController
const ajustes = new getAjustes()

// -------------------  Seleccionar todos los Proyectos Ganados --------------
routerAjustes.get('/', checkAuthentication, ajustes.getAllProjectsWon)

// -------------------  Ver detalles del Proyecto Ganado por Id del proyecto ------------------ 
routerAjustes.get('/selectAjusteProjects/:id', checkAuthentication, ajustes.selectProjectById)


// -------------------  Agregar informacion Distribution a Detalle --------------------------- 
// routerAjustes.post('/infoOtDistribucion/:id', checkAuthentication, ajustes.addInfoOtDistribucion)

// -------------------  Agregar informacion Programacion 1° Parte a Detalle ------------------------ 
// routerAjustes.post('/otInfoProgramacionPrimera/:id', checkAuthentication, ajustes.addInfoProgramacionPrimera)

// // -------------------  Agregar informacion Programacion 2° Parte a Detalle ------------------------ 
// routerAjustes.post('/otInfoProgramacionSegunda/:id', checkAuthentication, ajustes.addInfoProgramacionSegunda)

// // -------------------  Agregar informacion Mecanizado 1° Parte a Detalle ------------------------ 
// routerAjustes.post('/otInfoMecanizadoPrimera/:id', checkAuthentication, ajustes.addInfoMecanizadoPrimera)

// // -------------------  Agregar informacion Mecanizado 2° Parte a Detalle ------------------------ 
// routerAjustes.post('/otInfoMecanizadoSegunda/:id', checkAuthentication, ajustes.addInfoMecanizadoSegunda)


module.exports = routerAjustes