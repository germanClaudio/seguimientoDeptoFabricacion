const { Router } = require('express')
const routerProgramas = Router()
// const routerProyectos = Router()

const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
const { authUserMiddleware} = require('../middlewares/authUser.middleware.js')

// const GetProjects = require('../controllers/proyectos.controller.js')
// const getProjects = GetProjects.ProjectsController
// const projects = new getProjects()

const GetProgramation = require('../controllers/programas.controller.js')
const getProgramation = GetProgramation.ProgramationController
const programation = new getProgramation()

// -------------------  Seleccionar todos los Proyectos Ganados --------------
routerProgramas.get('/', checkAuthentication, programation.getAllProjectsWon)

// -------------------  Ver detalles del Proyecto Ganado por Id del proyecto ------------------ 
routerProgramas.get('/selectWonProjects/:id', checkAuthentication, programation.selectProjectById)


// -------------------  Agregar informacion Distribution a Detalle --------------------------- 
routerProgramas.post('/infoOtDistribucion/:id', checkAuthentication, programation.addInfoOtDistribucion)

// // -------------------  Agregar informacion Programacion 1° Parte a Detalle ------------------------ 


// // -------------------  Agregar informacion Programacion 2° Parte a Detalle ------------------------ 


// // -------------------  Agregar informacion Mecanizado 1° Parte a Detalle ------------------------ 


// // -------------------  Agregar informacion Mecanizado 2° Parte a Detalle ------------------------ 



// // -------------------  Agregar OT a OCI ---------------- 
// routerProyectos.post('/oci', checkAuthentication, projects.addOtToOciProject)

// -------------------  Agregar Nuevo Detalle a OCI por Id Proyecto ------------------ 
routerProgramas.post('/addDetalleToOt/:id', checkAuthentication, programation.addDetailToOtProject)

// -------------------  Agregar Nuevo Detalle a OCI por Id Proyecto ------------------ 
routerProgramas.post('/addModalOtDetalleFromFile/:id', checkAuthentication, programation.addDetailsToOtProjectFromFile)

// // -------------------  Editar Detalle por Id ------------------ 
routerProgramas.post('/updateOtDetail/:id', checkAuthentication, programation.updateOtDetail)

// -------------------  Actualizar Estado de Detalle por Id Proyecto ------------------ 
routerProgramas.post('/updateStatusOtDetalle/:id', checkAuthentication, programation.updateStatusOtDetail)

// -------------------  Eliminar Detalle por Id de Proyecto ------------------ 
routerProgramas.post('/deleteOtDetalle/:id', checkAuthentication, programation.deleteOtDetail)

// // -------------------  Editar OT por Id de Proyecto ------------------ 
// routerProyectos.post('/updateOt/:id', checkAuthentication, projects.updateOt)

// // -------------------  Eliminar OT por Id de Proyecto ------------------ 
// routerProyectos.post('/deleteOt/:id', checkAuthentication, authUserMiddleware, projects.deleteOt)

// // -------------------  Eliminar Proyecto por Id (Visible = false) ------------------ 
// routerProyectos.post('/deleteProject/:id', checkAuthentication, authUserMiddleware, projects.deleteProjectById)

module.exports = routerProgramas