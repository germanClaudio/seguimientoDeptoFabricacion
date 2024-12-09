const { Router } = require('express')
const routerProyectos = Router()

const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
const { authUserMiddleware } = require('../middlewares/authUser.middleware.js')

const GetProjects = require('../controllers/proyectos.controller.js')
const getProjects = GetProjects.ProjectsController
const projects = new getProjects()

// -------------------  Seleccionar todos los Proyectos ------------------
routerProyectos.get('/', checkAuthentication, projects.getAllProjects)

// -------------------  Seleccionar Proyecto por Cliente Id ------------------ 
routerProyectos.get('/:id', checkAuthentication, projects.getProjectsByClientId)

// -------------------  Ver detalles del Proyecto por Id del proyecto ------------------ 
routerProyectos.get('/selectProject/:id', checkAuthentication, projects.selectProjectById)

// -------------------  Ver listado de OCI completo ------------------ 
routerProyectos.get('/oci-list/all', checkAuthentication, projects.getAllOciProjects)

// -------------------  Crear Nuevo Proyecto ------------------------ 
routerProyectos.post('/newProject/:id', checkAuthentication, authUserMiddleware, projects.createNewProject) //authUserMiddleware

// -------------------  Agregar informacion R14 a OT --------------------------- 
routerProyectos.post('/otInfoR14', checkAuthentication, projects.addInfoR14ToOtProject)

// -------------------  Agregar informacion Proceso 3D a OT ------------------------ 
routerProyectos.post('/otInfoProceso3d', checkAuthentication, projects.addInfoProceso3dToOtProject)

// -------------------  Agregar informacion Avance Diseno Primera Parte a OT ------------------------ 
routerProyectos.post('/otInfoAvDisenoPrimera', checkAuthentication, projects.addInfoDisenoPrimeraToOtProject)

// -------------------  Agregar informacion Avance Diseno Segunda Parte a OT ------------------------ 
routerProyectos.post('/otInfoAvDisenoSegunda', checkAuthentication, projects.addInfoDisenoSegundaToOtProject)

// -------------------  Agregar informacion 80% a OT ------------------------ 
routerProyectos.post('/otInfo80', checkAuthentication, projects.addInfo80ToOtProject)

// -------------------  Agregar informacion 100% a OT ------------------------ 
routerProyectos.post('/otInfo100', checkAuthentication, projects.addInfo100ToOtProject)

// -------------------  Agregar simulacion 0 a OT ------------------------ 
routerProyectos.post('/otSimulacion0', checkAuthentication, projects.addInfoSim0ToOtProject)

// -------------------  Agregar simulacion 1 a OT ------------------------ 
routerProyectos.post('/otSimulacion1', checkAuthentication, projects.addInfoSim1ToOtProject)

// -------------------  Agregar simulacion 2_3 a OT ------------------------ 
routerProyectos.post('/otSimulacion2_3', checkAuthentication, projects.addInfoSim2_3ToOtProject)

// -------------------  Agregar simulacion 4 Primera a OT ------------------------ 
routerProyectos.post('/otSimulacion4Primera', checkAuthentication, projects.addInfoSim4PrimeraToOtProject)

// -------------------  Agregar simulacion 4 Segunda a OT ------------------------ 
routerProyectos.post('/otSimulacion4Segunda', checkAuthentication, projects.addInfoSim4SegundaToOtProject)

// -------------------  Agregar simulacion 5 a OT ------------------------ 
routerProyectos.post('/otSimulacion5', checkAuthentication, projects.addInfoSim5ToOtProject)



// -------------------  Agregar OT a OCI ---------------- 
routerProyectos.post('/oci', checkAuthentication, authUserMiddleware, projects.addOtToOciProject)

// -------------------  Actualizar Estado del Proyecto por Id ------------------ 
routerProyectos.post('/updateStatusProject/:id', checkAuthentication, authUserMiddleware, projects.updateStatusProject)

// -------------------  Actualizar Nivel del Proyecto por Id ------------------ 
routerProyectos.post('/updateLevelProject/:id', checkAuthentication, authUserMiddleware, projects.updateLevelProject)

// -------------------  Actualizar Estado de OCI por Id Proyecto ------------------ 
routerProyectos.post('/updateStatusOci/:id', checkAuthentication, authUserMiddleware, projects.updateStatusOci)

// -------------------  Actualizar Estado de OT por Id Proyecto ------------------ 
routerProyectos.post('/updateStatusOt/:id', checkAuthentication, authUserMiddleware, projects.updateStatusOt)

// -------------------  Agregar Nueva OCI a Proyecto por Id Proyecto ------------------ 
routerProyectos.post('/addNewOciToProject/:id', checkAuthentication, authUserMiddleware, projects.addNewOciToProject)

// -------------------  Editar Proyecto por Id ------------------ 
routerProyectos.post('/updateProject/:id', checkAuthentication, authUserMiddleware, projects.updateProject)

// -------------------  Editar OCI por Id de Proyecto ------------------ 
routerProyectos.post('/updateOci/:id', checkAuthentication, authUserMiddleware, projects.updateOci)

// -------------------  Eliminar OCI por Id de Proyecto ------------------ 
routerProyectos.post('/deleteOci/:id', checkAuthentication, authUserMiddleware, projects.deleteOci)

// -------------------  Editar OT por Id de Proyecto ------------------ 
routerProyectos.post('/updateOt/:id', checkAuthentication, projects.updateOt)

// -------------------  Eliminar OT por Id de Proyecto ------------------ 
routerProyectos.post('/deleteOt/:id', checkAuthentication, projects.deleteOt)

// -------------------  Eliminar Proyecto por Id (Visible = false) ------------------ 
routerProyectos.post('/deleteProject/:id', checkAuthentication, authUserMiddleware, projects.deleteProjectById)

// // -------------------  Agregar Nuevo Dueño de OCI a Proyecto por Id Proyecto ------------------ 
// routerProyectos.post('/newOciOwner/:id', checkAuthentication, authUserMiddleware, projects.addNewDuenoOci)

module.exports = routerProyectos