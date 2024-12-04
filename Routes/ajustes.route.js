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


// 0 -------------------  Agregar informacion Armado --------------------------- 
routerAjustes.post('/otInfoArmado/:id', checkAuthentication, ajustes.addInfoArmado)

// 1 -------------------  Agregar informacion Etapa 1 ------------------------ 
routerAjustes.post('/otInfoEtapaPrimera/:id', checkAuthentication, ajustes.addInfoEtapaPrimera)

// 2 -------------------  Agregar informacion Etapa 2 1° Parte ------------------------ 
routerAjustes.post('/otInfoEtapaSegundaPrimera/:id', checkAuthentication, ajustes.addInfoEtapaSegundaPrimera)

// 3 -------------------  Agregar informacion Etapa 2 2° Parte ------------------------ 
routerAjustes.post('/otInfoEtapaSegundaSegunda/:id', checkAuthentication, ajustes.addInfoEtapaSegundaSegunda)

// 4 -------------------  Agregar informacion Analisis Critico ------------------------ 
routerAjustes.post('/otInfoAnalisisCritico/:id', checkAuthentication, ajustes.addInfoAnalisisCritico)

// 5 -------------------  Agregar informacion Etapa 3 1° Parte ------------------------ 
routerAjustes.post('/otInfoEtapaTerceraPrimera/:id', checkAuthentication, ajustes.addInfoEtapaTerceraPrimera)

// 6 -------------------  Agregar informacion Etapa 3 2° Parte ------------------------ 
routerAjustes.post('/otInfoEtapaTerceraSegunda/:id', checkAuthentication, ajustes.addInfoEtapaTerceraSegunda)

// 7 -------------------  Agregar informacion Ciclo Correccion 1 ------------------------ 
routerAjustes.post('/otInfoCicloCorreccionPrimera/:id', checkAuthentication, ajustes.addInfoCicloCorreccionPrimera)

// 8 -------------------  Agregar informacion Ciclo Correccion 2 ------------------------ 
routerAjustes.post('/otInfoCicloCorreccionSegunda/:id', checkAuthentication, ajustes.addInfoCicloCorreccionSegunda)

// 9 -------------------  Agregar informacion Ciclo Correccion 3 ------------------------ 
routerAjustes.post('/otInfoCicloCorreccionTercera/:id', checkAuthentication, ajustes.addInfoCicloCorreccionTercera)

// 10 -------------------  Agregar informacion Liberacion para buyoff 1° parte ------------------------ 
routerAjustes.post('/otInfoLiberacionBuyOffPrimera/:id', checkAuthentication, ajustes.addInfoLiberacionBuyOffPrimera)

// 11 -------------------  Agregar informacion Liberacion para buyoff 2° parte ------------------------ 
routerAjustes.post('/otInfoLiberacionBuyOffSegunda/:id', checkAuthentication, ajustes.addInfoLiberacionBuyOffSegunda)

// 12 -------------------  Agregar informacion Buyoff ------------------------ 
routerAjustes.post('/otInfoBuyOff/:id', checkAuthentication, ajustes.addInfoBuyOff)

// 13 -------------------  Agregar informacion Pendinetes Finales ------------------------ 
routerAjustes.post('/otInfoPendientesFinales/:id', checkAuthentication, ajustes.addInfoPendientesFinales)

module.exports = routerAjustes