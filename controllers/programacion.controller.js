const ProyectosService = require("../services/projects.service.js")
const ClientesService = require("../services/clients.service.js")
const UserService = require("../services/users.service.js")
const ProgramasService = require("../services/programation.service.js")

const { uploadToGCS, uploadToGCSingleFile } = require("../utils/uploadFilesToGSC.js")

const multer = require('multer')

let now = require('../utils/formatDate.js')
let imageNotFound = "../../../src/images/upload/LogoClientImages/noImageFound.png"


class ProgramationController {
    constructor() {
        this.projects = new ProyectosService()
        this.clients = new ClientesService()
        this.users = new UserService()
        this.programms = new ProgramasService()
    }

    getAllProgramms = async (req, res) => {
        const programas = await this.programms.getAllProgramms()

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        let cliente = await this.clients.getClientById()

        try {
            if (programas.error) return res.status(400).json({ msg: 'No hay proyectos cargados' })
            res.render('projectsList', {
                programas,
                cliente,
                username,
                userInfo,
                expires
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 19,
                status: false,
                msg: 'controllerError - getAllProgramms'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    getAllProjects = async (req, res) => {
        const proyectos = await this.projects.getAllProjects()

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        let cliente = await this.clients.getClientById()

        try {
            if (proyectos.error) return res.status(400).json({ msg: 'No hay proyectos cargados' })
            res.render('projectsList', {
                proyectos,
                cliente,
                username,
                userInfo,
                expires
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 19,
                status: false,
                msg: 'controllerError - getAllProjects'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    getProjectsByClientId = async (req, res) => {
        const { id } = req.params
        const cliente = await this.clients.getClientById(id)
        //console.log('proyectosControler - Cliente -getProjectsByClientId ', id)
        const proyectos = await this.projects.getProjectsByClientId(id)
        //console.log('proyectosControler-getProjectsByClientId ', proyectos)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                proyectos,
                username,
                userInfo,
                expires,
                cliente
            })
        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 59,
                status: false,
                msg: 'controllerError - getProductById'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    selectProjectByClientId = async (req, res) => {
        const { id } = req.params
        const cliente = await this.clients.getClientById(id)

        const proyectosCargados = await this.projects.getProjectsByClientId(id)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        try {
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                proyectosCargados,
                username,
                userInfo,
                expires,
                cliente
            })
        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 100,
                status: false,
                msg: 'controllerError - selectProjectByClientId'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    selectProjectById = async (req, res) => {
        const { id } = req.params

        const proyecto = await this.projects.selectProjectByProjectId(id)
        const idCliente = proyecto[0].client[0]._id
        const cliente = await this.clients.getClientByProjectId(idCliente)

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0
        }

        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('projectSelectedDetail', {
                proyecto,
                username,
                userInfo,
                expires,
                cliente,
                data
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 140,
                status: false,
                msg: 'controllerError - selectProjectById'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    createNewProject = async (req, res) => {    
        //------ Storage Client Logo Image in Google Store --------
        const storage = multer.memoryStorage({
            fileFilter: (req, file, cb) => {
                if (file.mimetype.startsWith('image/')) {
                    cb(null, true);
                } else {
                    cb(new Error('Solo se permiten imágenes'));
                }
            },
        }); // Almacenamiento en memoria para cargar archivos temporalmente
        
        var uploadImageOciMulter = multer({
            storage: storage
        }).any()

        
        uploadImageOciMulter(req, res, async (err) => {
            //console.log('408-req.files: ', req.files)

            if(req.files && req.files.length != 0){
                await uploadToGCS(req, res, next) 
            }

            const clientId = req.body.clientIdHidden
            const clienteSeleccionado = await this.clients.selectClientById(clientId)

            const ociQuantity = parseInt(req.body.ociQuantity)
            
            const userId = req.body.idHidden
            const userCreator = await this.users.getUserById(userId)
            
            const user = [{
                name: userCreator.name,
                lastName: userCreator.lastName,
                username: userCreator.username,
                email: userCreator.email
            }]

            const modificator = [{
                name: "",
                lastName: "",
                username: "",
                email: ""
            }]

            let arrayOciNumber=[],
            arrayOciDescription=[],
            arrayOciAlias=[],
            arrayOciStatus=[],
            arrayOciImages=[]

            for (const key in req.body) {
                if (key.startsWith('ociNumber')) {
                    arrayOciNumber.push(req.body[key])
                }
                else if (key.startsWith('ociDescription')) {
                    arrayOciDescription.push(req.body[key])
                }
                else if (key.startsWith('ociAlias')) {
                    arrayOciAlias.push(req.body[key])
                }
                else if (key.startsWith('ociStatus')) {
                    arrayOciStatus.push(req.body[key])
                }
                else if (key.startsWith('imageOciFileName')) {
                    arrayOciImages.push(req.body[key])
                }
            }

            let arrayOciProjects = []
            for(let i=0; i<ociQuantity; i++) {
                var ociProject = {
                        ociNumber: arrayOciNumber[i],
                        ociDescription: arrayOciDescription[i],
                        ociAlias: arrayOciAlias[i],
                        ociStatus: arrayOciStatus[i] == 'on' ? true : false,
                        creator: user,
                        timestamp: now,
                        ociImage: arrayOciImages[i] || imageNotFound,
                        modificator: modificator,
                        modifiedOn: "",
                        visible: true
                }
                arrayOciProjects.push(ociProject)
            }
            
            const project = {
                projectName: req.body.projectName,
                statusProject: req.body.statusProject == 'on' ? true : false,
                levelProject: req.body.levelProject,
                codeProject: req.body.codeProject,
                projectDescription: req.body.projectDescription,
                prioProject: req.body.prioProject,
                imageProject: req.body.imageProject || imageNotFound,
                visible: true,
                creator: user,
                timestamp: now,
                modificator: modificator,
                modifiedOn: "",
                oci: arrayOciProjects
            }

            const newProject = {
                creator: user,
                client: clienteSeleccionado,
                project: project,
                timestamp: now,
                modificator: modificator,
                modifiedOn: "",
                visible: true
            }
      
            if (err) {
                const error = new Error('No se agregó ningún archivo')
                error.httpStatusCode = 400
                return error
            }

            try {
                await this.projects.addProjectToClient(newProject)
                const proyectos = await this.projects.getProjectsByClientId(clientId)

                let username = res.locals.username
                let userInfo = res.locals.userInfo

                const cookie = req.session.cookie
                const time = cookie.expires
                const expires = new Date(time)

                const cliente = await this.clients.updateClientProjectsQty(
                    clientId, 
                    clienteSeleccionado, 
                    user
                )

                if (!proyectos) return res.status(404).json({ Msg: 'Proyecto no guardado' })
                res.render('clientProjectsDetails', {
                    username,
                    userInfo,
                    expires,
                    cliente,
                    proyectos
                })

            } catch (error) {
                const flag = {
                    dirNumber: 500
                }
                const errorInfo = {
                    errorNumber: 188,
                    status: false,
                    msg: 'controllerError - createNewProject'
                }
                res.render('errorPages', {
                    error,
                    errorInfo,
                    flag
                })
            }
        })
    }

    getAllOciProjects = async (req, res) => {
        const proyectos = await this.projects.getAllOciProjects()

        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        // let cliente = await this.clients.getClientById()
        let clientes = await this.clients.getAllClients()

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            c: 0
        }

        try {
            if (proyectos.error) return res.status(400).json({ msg: 'No hay proyectos cargados' })
            res.render('nestableOciList', {
                username,
                userInfo,
                proyectos,
                clientes,
                expires,
                data
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 340,
                status: false,
                msg: 'controllerError - getAllOciProjects'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    addOtToOciProject = async (req, res) => {
        const { id } = req.params
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const numberOci = parseInt(req.body.ociNumber)
        const ociNumberK = parseInt(req.body.ociNumberK)
        
        const projectId = id || req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        let arrayOtNumber=[],
            arrayOpNumber=[],
            arrayOpDescription=[],
            arrayOtStatus=[],
            arrayOtDesign=[],
            arrayOtSimulation=[],
            arrayOtSupplier=[]

        for (const key in req.body) {
            if (key.startsWith('otNumber')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('opNumber')) {
                arrayOpNumber.push(req.body[key])
            }
            else if (key.startsWith('opDescription')) {
                arrayOpDescription.push(req.body[key])
            }
            else if (key.startsWith('otStatus')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('internoDiseno')) {
                arrayOtDesign.push(req.body[key])
            }
            else if (key.startsWith('internoSimulacion')) {
                arrayOtSimulation.push(req.body[key])
            }
            else if (key.startsWith('externoDiseno')) {
                arrayOtSupplier.push(req.body[key])
            }
        }

        const otInformationEmpty = [{
            otInfoR14: [],
            otInfoProceso: [],
            otInfoDiseno: [],
            otInfoInfo80: [],
            otInfoInfo100: [],
            otInfoSim0: [],
            otInfoSim1: [],
            otInfoSim2_3: [],
            otInfoSim4: [],
            otInfoSim5: []
          }]

        var arrayOtAddedToOci = []
        for(let i=0; i<otQuantity; i++) {
            var otAddedToOci = {
                otNumber: arrayOtNumber[i],
                opNumber: arrayOpNumber[i],
                opDescription: arrayOpDescription[i],
                otStatus: arrayOtStatus[i] == 'on' ? true : false,
                otDesign: arrayOtDesign[i],
                otSimulation: arrayOtSimulation[i],
                otSupplier: arrayOtSupplier[i],
                creator: user,
                timestamp: now,
                modificator: modificator,
                modifiedOn: "",
                otInformation: otInformationEmpty
            }
            arrayOtAddedToOci.push(otAddedToOci)
        }

        await this.projects.addOtToOciProject(
            projectId,
            numberOci,
            ociNumberK,
            arrayOtAddedToOci
        )

        await this.clients.updateClient(
            clientId, 
            cliente, 
            user
        )

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0
        }

        const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            // console.log('proyectoController ',proyecto)
        try {
            if (!proyecto) return res.status(404).json({ msg: 'OCI no encontrada' })
            res.render('projectSelectedDetail', {
                proyecto,
                username,
                userInfo,
                expires,
                cliente,
                data
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 389,
                status: false,
                msg: 'controllerError - Adding OT to OCI Proyect'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    addInfoR14ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        let arrayOtNumber=[],
            arrayOtStatus=[],
            arrayProcesoR14=[],
            arrayRevisionProcesoR14=[],
            arrayAprobadoR14=[],
            arrayRevisionAprobadoR14=[]

        for (const key in req.body) {
            
            if (key.startsWith('otNumberHidden')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('otStatusHidden')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('procesoR14Hidden')) {
                arrayProcesoR14.push(req.body[key])
            }
            else if (key.startsWith('revisionProcesoR14')) {
                arrayRevisionProcesoR14.push(req.body[key])
            }
            else if (key.startsWith('aprobadoR14Hidden')) {
                arrayAprobadoR14.push(req.body[key])
            }
            else if (key.startsWith('revisionAprobadoR14')) {
                arrayRevisionAprobadoR14.push(req.body[key])
            }
        }
        
// console.log('arrayOtStatus', arrayOtStatus)
// console.log('arrayProcesoR14', arrayProcesoR14)
// console.log('arrayAprobadoR14', arrayAprobadoR14)

        let arrayInfoAddedToOt = []
        for (let i=0; i<otQuantity; i++ ) {
            var infoAddedToOt = {
                otStatus: arrayOtStatus[i],
                otNumber: parseInt(arrayOtNumber[i]),
                procesoR14: arrayProcesoR14[i] || "sinDato",
                revisionProcesoR14: parseInt(arrayRevisionProcesoR14[i]) || 0,
                aprobadoR14: arrayAprobadoR14[i] || "sinDato",
                revisionAprobadoR14: parseInt(arrayRevisionAprobadoR14[i]) || 0,
                timestamp: now,
                creator: user,
                modificator: modificator,
                modifiedOn: "",
            }
            arrayInfoAddedToOt.push(infoAddedToOt)
        }
        // console.log('arrayInfoAddedToOt_Controller: ', arrayInfoAddedToOt)
        //const itemUpdated = 
        await this.projects.addInfoR14ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            arrayInfoAddedToOt
        )
        //console.log('itemUpdated_Controller: ', itemUpdated.project)    
        const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            slide: 0
        }
        
        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectSelectedDetail', {  //projectsList
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 538,
                status: false,
                msg: 'controllerError - Adding Info R14 to OT - Proyect'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    addInfoProceso3dToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        let arrayOtNumber=[],
            arrayOtStatus=[],
            arrayProceso3d=[],
            arrayRevisionProceso3d=[],
            arrayHorasProceso3d=[],
            arrayRevisionHorasProceso3d=[]

        for (const key in req.body) {
            
            if (key.startsWith('otNumberHidden')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('otStatusHidden')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('proceso3dHidden')) {
                arrayProceso3d.push(req.body[key])
            }
            else if (key.startsWith('revisionProceso3d')) {
                arrayRevisionProceso3d.push(req.body[key])
            }
            else if (key.startsWith('horasProceso3d')) {
                arrayHorasProceso3d.push(req.body[key])
            }
            else if (key.startsWith('revisionHorasProceso3d')) {
                arrayRevisionHorasProceso3d.push(req.body[key])
            }
        }

// console.log('arrayOtNmber', arrayOtNumber)        
// console.log('arrayOtStatus', arrayOtStatus)
// console.log('arrayProceso3d', arrayProceso3d)
// console.log('arrayHorasProceso3d', arrayHorasProceso3d)

        let arrayInfoAddedToOt = []
        for (let i=0; i<otQuantity; i++ ) {
            var infoAddedToOt = {
                otStatus: arrayOtStatus[i],
                otNumber: parseInt(arrayOtNumber[i]),
                proceso3d: arrayProceso3d[i] || "sinDato",
                revisionProceso3d: parseInt(arrayRevisionProceso3d[i]) || 0,
                horasProceso3d: parseInt(arrayHorasProceso3d[i]) || 0,
                revisionHorasProceso3d: parseInt(arrayRevisionHorasProceso3d[i]) || 0,
                timestamp: now,
                creator: user,
                modificator: modificator,
                modifiedOn: "",
            }
            arrayInfoAddedToOt.push(infoAddedToOt)
        }
        //console.log('arrayInfoAddedToOt_Controller: ', arrayInfoAddedToOt)
        //const itemUpdated = 
        await this.projects.addInfoProceso3dToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            arrayInfoAddedToOt
        )
        //console.log('itemUpdated_Controller: ', itemUpdated.project)    
        const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            slide: 1
        }
        
        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectSelectedDetail', {
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 666,
                status: false,
                msg: 'controllerError - Adding Info Proceso 3D to OT - Proyect'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    addInfoDisenoPrimeraToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        let arrayOtNumber=[],
            arrayOtStatus=[],
            arrayAvDiseno=[],
            arrayRevisionAvDiseno=[],
            arrayAv50Diseno=[],
            arrayRevisionAv50Diseno=[],
            arrayAv80Diseno=[],
            arrayRevisionAv80Diseno=[],
            arrayEnvioCliente=[],
            arrayRevisionEnvioCliente=[]

        for (const key in req.body) {

            if (key.startsWith('otNumberHidden')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('otStatusHidden')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('avDisenoHidden')) {
                arrayAvDiseno.push(req.body[key]) 
            }
            else if (key.startsWith('revisionAvDiseno')) {
                arrayRevisionAvDiseno.push(req.body[key])
            }
            else if (key.startsWith('av50DisenoHidden')) {
                arrayAv50Diseno.push(req.body[key])
            }
            else if (key.startsWith('revisionAv50Diseno')) {
                arrayRevisionAv50Diseno.push(req.body[key])
            }
            else if (key.startsWith('av80DisenoHidden')) {
                arrayAv80Diseno.push(req.body[key])
            }
            else if (key.startsWith('revisionAv80Diseno')) {
                arrayRevisionAv80Diseno.push(req.body[key])
            }
            else if (key.startsWith('envioClienteHidden')) {
                arrayEnvioCliente.push(req.body[key])
            }
            else if (key.startsWith('revisionEnvioCliente')) {
                arrayRevisionEnvioCliente.push(req.body[key])
            }
        }

// console.log('arrayOtNmber', arrayOtNumber)        
// console.log('arrayOtStatus', arrayOtStatus)
// console.log('arrayAvDiseno', arrayAvDiseno)
// console.log('arrayRevisionAvDiseno', arrayRevisionAvDiseno)
// console.log('arrayAvDiseno50Hidden', arrayAv50Diseno)
// console.log('arrayRevisionAvDiseno50', arrayRevisionAv50Diseno)
// console.log('arrayAvDiseno80Hidden', arrayAv80Diseno)
// console.log('arrayRevisionAvDiseno80Hidden', arrayRevisionAv80Diseno)
// console.log('arrayEnvioCliente', arrayEnvioCliente)
// console.log('arrayRevisionEnvioCliente', arrayRevisionEnvioCliente)

        let arrayInfoAddedToOt = []
        for (let i=0; i<otQuantity; i++ ) {
            var infoAddedToOt = {
                otStatus: arrayOtStatus[i],
                otNumber: parseInt(arrayOtNumber[i]),
                avDiseno: parseInt(arrayAvDiseno[i]) || 0,
                revisionAvDiseno: parseInt(arrayRevisionAvDiseno[i]) || 0,
                avDiseno50: arrayAv50Diseno[i] || 'sinDato',
                revisionAvDiseno50: parseInt(arrayRevisionAv50Diseno[i]) || 0,
                avDiseno80: arrayAv80Diseno[i] || 'sinDato',
                revisionAvDiseno80: parseInt(arrayRevisionAv80Diseno[i]) || 0,
                envioCliente: arrayEnvioCliente[i] || 'sinDato',
                revisionEnvioCliente: parseInt(arrayRevisionEnvioCliente[i]) || 0,
                timestamp: now,
                creator: user,
                modificator: modificator,
                modifiedOn: "",
            }
            arrayInfoAddedToOt.push(infoAddedToOt)
        }
        //console.log('arrayInfoAddedToOt_Controller: ', arrayInfoAddedToOt)
        //const itemUpdated = 
        await this.projects.addInfoDisenoPrimeraToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            arrayInfoAddedToOt
        )
        //console.log('itemUpdated_Controller: ', itemUpdated.project)    
        const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            slide: 2
        }
        
        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectSelectedDetail', {
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 795,
                status: false,
                msg: 'controllerError - Adding Info Diseno Primera to OT - Proyect'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    addInfoDisenoSegundaToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        let arrayOtNumber=[],
            arrayOtStatus=[],
            arrayAv100Diseno=[],
            arrayRevisionAv100Diseno=[],
            arrayRevisionCliente=[],
            arrayRevisionRevisionCliente=[],
            arrayLdmProvisoria=[],
            arrayRevisionLdmProvisoria=[],
            arrayAprobadoCliente=[],
            arrayRevisionAprobadoCliente=[]

        for (const key in req.body) {

            if (key.startsWith('otNumberHidden')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('otStatusHidden')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('av100DisenoHidden')) {
                arrayAv100Diseno.push(req.body[key]) 
            }
            else if (key.startsWith('revisionAv100Diseno')) {
                arrayRevisionAv100Diseno.push(req.body[key])
            }
            else if (key.startsWith('revisionClienteHidden')) {
                arrayRevisionCliente.push(req.body[key])
            }
            else if (key.startsWith('revisionRevisionCliente')) {
                arrayRevisionRevisionCliente.push(req.body[key])
            }
            else if (key.startsWith('ldmProvisoriaHidden')) {
                arrayLdmProvisoria.push(req.body[key])
            }
            else if (key.startsWith('revisionLdmProvisoria')) {
                arrayRevisionLdmProvisoria.push(req.body[key])
            }
            else if (key.startsWith('aprobadoClienteHidden')) {
                arrayAprobadoCliente.push(req.body[key])
            }
            else if (key.startsWith('revisionAprobadoCliente')) {
                arrayRevisionAprobadoCliente.push(req.body[key])
            }
        }

// console.log('arrayOtNmber', arrayOtNumber)        
// console.log('arrayOtStatus', arrayOtStatus)
// console.log('arrayAv100Diseno', arrayAv100Diseno)
// console.log('arrayRevisionAv100Diseno', arrayRevisionAv100Diseno)
// console.log('arrayRevisionClienteHidden', arrayRevisionCliente)
// console.log('arrayarrayRevisionRevisionCliente', arrayRevisionRevisionCliente)
// console.log('arrayLdmProvisoriaHidden', arrayLdmProvisoria)
// console.log('arrayRevisionLdmProvisoriaHidden', arrayRevisionLdmProvisoria)
// console.log('arrayAprobadoCliente', arrayAprobadoCliente)
// console.log('arrayRevisionAprobadoCliente', arrayRevisionAprobadoCliente)

        let arrayInfoAddedToOt = []
        for (let i=0; i<otQuantity; i++ ) {
            var infoAddedToOt = {
                otStatus: arrayOtStatus[i],
                otNumber: parseInt(arrayOtNumber[i]),
                av100Diseno: parseInt(arrayAv100Diseno[i]) || 0,
                revisionAv100Diseno: parseInt(arrayRevisionAv100Diseno[i]) || 0,
                revisionCliente: arrayRevisionCliente[i] || 'sinDato',
                revisionRevisionCliente: parseInt(arrayRevisionRevisionCliente[i]) || 0,
                ldmProvisoria: arrayLdmProvisoria[i] || 'NoAplica',
                revisionLdmProvisoria: parseInt(arrayRevisionLdmProvisoria[i]) || 0,
                aprobadoCliente: arrayAprobadoCliente[i] || 'sinDato',
                revisionAprobadoCliente: parseInt(arrayRevisionAprobadoCliente[i]) || 0,
                timestamp: now,
                creator: user,
                modificator: modificator,
                modifiedOn: "",
            }
            arrayInfoAddedToOt.push(infoAddedToOt)
        }
        // console.log('arrayInfoAddedToOt_Controller: ', arrayInfoAddedToOt)
        //const itemUpdated = 
        await this.projects.addInfoDisenoSegundaToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            arrayInfoAddedToOt
        )
        //console.log('itemUpdated_Controller: ', itemUpdated.project)    
        const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            slide: 3
        }
        
        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectSelectedDetail', {
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 950,
                status: false,
                msg: 'controllerError - Adding Info Diseno Segunda to OT - Proyect'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    addInfo80ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        let arrayOtNumber=[],
            arrayOtStatus=[],
            arrayLdmAvanceCG=[],
            arrayRevisionLdmAvanceCG=[],
            arrayLdmAvanceTD2=[],
            arrayRevisionLdmAvanceTD2=[],
            arrayLdm80=[],
            arrayRevisionLdm80=[],
            arrayInfoModelo=[],
            arrayRevisionInfoModelo=[]

        for (const key in req.body) {

            if (key.startsWith('otNumberHidden')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('otStatusHidden')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('ldmAvanceCGHidden')) {
                arrayLdmAvanceCG.push(req.body[key]) 
            }
            else if (key.startsWith('revisionLdmAvanceCG')) {
                arrayRevisionLdmAvanceCG.push(req.body[key])
            }
            else if (key.startsWith('ldmAvanceTD2Hidden')) {
                arrayLdmAvanceTD2.push(req.body[key])
            }
            else if (key.startsWith('revisionLdmAvanceTD2')) {
                arrayRevisionLdmAvanceTD2.push(req.body[key])
            }
            else if (key.startsWith('ldm80Hidden')) {
                arrayLdm80.push(req.body[key])
            }
            else if (key.startsWith('revisionLdm80')) {
                arrayRevisionLdm80.push(req.body[key])
            }
            else if (key.startsWith('infoModeloHidden')) {
                arrayInfoModelo.push(req.body[key])
            }
            else if (key.startsWith('revisionInfoModelo')) {
                arrayRevisionInfoModelo.push(req.body[key])
            }
        }

// console.log('arrayOtNmber', arrayOtNumber)        
// console.log('arrayOtStatus', arrayOtStatus)
// console.log('arrayLdmAvanceCG', arrayLdmAvanceCG)
// console.log('arrayRevisionLdmAvanceCG', arrayRevisionLdmAvanceCG)
// console.log('arrayLdmAvanceTD2', arrayLdmAvanceTD2)
// console.log('arrayRevisionLdmAvanceTD2', arrayRevisionLdmAvanceTD2)
// console.log('arrayLdm80', arrayLdm80)
// console.log('arrayRevisionLdm80Hidden', arrayRevisionLdm80)
// console.log('arrayInfoModelo', arrayInfoModelo)
// console.log('arrayRevisionInfoModelo', arrayRevisionInfoModelo)

        let arrayInfoAddedToOt = []
        for (let i=0; i<otQuantity; i++ ) {
            var infoAddedToOt = {
                otStatus: arrayOtStatus[i],
                otNumber: parseInt(arrayOtNumber[i]),
                ldmAvanceCG: arrayLdmAvanceCG[i] || 'noAplica',
                revisionLdmAvanceCG: parseInt(arrayRevisionLdmAvanceCG[i]) || 0,
                ldmAvanceTD2: arrayLdmAvanceTD2[i] || 'noAplica',
                revisionLdmAvanceTD2: parseInt(arrayRevisionLdmAvanceTD2[i]) || 0,
                ldm80: parseInt(arrayLdm80[i]) || 0,
                revisionLdm80: parseInt(arrayRevisionLdm80[i]) || 0,
                infoModelo: parseInt(arrayInfoModelo[i]) || 0,
                revisionInfoModelo: parseInt(arrayRevisionInfoModelo[i]) || 0,
                timestamp: now,
                creator: user,
                modificator: modificator,
                modifiedOn: "",
            }
            arrayInfoAddedToOt.push(infoAddedToOt)
        }
        // console.log('arrayInfoAddedToOt_Controller: ', arrayInfoAddedToOt)
        //const itemUpdated = 
        await this.projects.addInfo80ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            arrayInfoAddedToOt
        )
        //console.log('itemUpdated_Controller: ', itemUpdated.project)    
        const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            slide: 4
        }
        
        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectSelectedDetail', {
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 1105,
                status: false,
                msg: 'controllerError - Adding Info 80% to OT - Proyect'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    addInfo100ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        let arrayOtNumber=[],
            arrayOtStatus=[],
            arrayLdm100=[],
            arrayRevisionLdm100=[],
            arrayInfo100=[],
            arrayRevisionInfo100=[]

        for (const key in req.body) {

            if (key.startsWith('otNumberHidden')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('otStatusHidden')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('ldm100Hidden')) {
                arrayLdm100.push(req.body[key])
            }
            else if (key.startsWith('revisionLdm100')) {
                arrayRevisionLdm100.push(req.body[key])
            }
            else if (key.startsWith('info100Hidden')) {
                arrayInfo100.push(req.body[key])
            }
            else if (key.startsWith('revisionInfo100')) {
                arrayRevisionInfo100.push(req.body[key])
            }
        }

// console.log('arrayOtNmber', arrayOtNumber)        
// console.log('arrayOtStatus', arrayOtStatus)
// console.log('arrayLdm100', arrayLdm100)
// console.log('arrayRevisionLdm100Hidden', arrayRevisionLdm100)
// console.log('arrayInfo100', arrayInfo100)
// console.log('arrayRevisionInfo100', arrayRevisionInfo100)

        let arrayInfoAddedToOt = []
        for (let i=0; i<otQuantity; i++ ) {
            var infoAddedToOt = {
                otStatus: arrayOtStatus[i],
                otNumber: parseInt(arrayOtNumber[i]),
                ldm100: parseInt(arrayLdm100[i]) || 0,
                revisionLdm100: parseInt(arrayRevisionLdm100[i]) || 0,
                info100: parseInt(arrayInfo100[i]) || 0,
                revisionInfo100: parseInt(arrayRevisionInfo100[i]) || 0,
                timestamp: now,
                creator: user,
                modificator: modificator,
                modifiedOn: "",
            }
            arrayInfoAddedToOt.push(infoAddedToOt)
        }
        // console.log('arrayInfoAddedToOt_Controller: ', arrayInfoAddedToOt)
        //const itemUpdated = 
        await this.projects.addInfo100ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            arrayInfoAddedToOt
        )
        //console.log('itemUpdated_Controller: ', itemUpdated.project)    
        const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            slide: 5
        }
        
        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectSelectedDetail', {
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 1260,
                status: false,
                msg: 'controllerError - Adding Info 100% to OT - Proyect'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
            res.status(500).json({
                status: false,
                msg: 'ControllerError - Adding Info 100% to OT - Proyect',
                error: error
            })
        }
    }

    addInfoSim0ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        let arrayOtNumber=[],
            arrayOtStatus=[],
            arraySim0=[],
            arrayRevisionSim0=[],
            arrayDocuSim0=[],
            arrayRevisionDocuSim0=[]

        for (const key in req.body) {
            
            if (key.startsWith('otNumberHidden')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('otStatusHidden')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('0SimHidden')) {
                arraySim0.push(req.body[key])
            }
            else if (key.startsWith('revision0Sim')) {
                arrayRevisionSim0.push(req.body[key])
            }
            else if (key.startsWith('docu0SimHidden')) {
                arrayDocuSim0.push(req.body[key])
            }
            else if (key.startsWith('revisionDocu0Sim')) {
                arrayRevisionDocuSim0.push(req.body[key])
            }
        }
        
// console.log('arrayOtStatus', arrayOtStatus)
// console.log('arraySim0', arraySim0)
// console.log('arrayRevisionSim0', arrayRevisionSim0)
// console.log('arrayDocuSim0', arrayDocuSim0)
// console.log('arrayRevisionDocuSim0', arrayRevisionDocuSim0)

        let arrayInfoAddedToOt = []
        for (let i=0; i<otQuantity; i++ ) {
            var infoAddedToOt = {
                otStatus: arrayOtStatus[i],
                otNumber: parseInt(arrayOtNumber[i]),
                sim0: arraySim0[i] || "sinDato",
                revisionSim0: parseInt(arrayRevisionSim0[i]) || 0,
                docuSim0: arrayDocuSim0[i] || "sinDato",
                revisionDocuSim0: parseInt(arrayRevisionDocuSim0[i]) || 0,
                timestamp: now,
                creator: user,
                modificator: modificator,
                modifiedOn: "",
            }
            arrayInfoAddedToOt.push(infoAddedToOt)
        }
        //console.log('arrayInfoAddedToOt_Controller: ', arrayInfoAddedToOt)
        //const itemUpdated = 
        await this.projects.addInfoSim0ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            arrayInfoAddedToOt
        )
        //console.log('itemUpdated_Controller: ', itemUpdated.project)    
        const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            slide: 6
        }
        
        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectSelectedDetail', {  //projectsList
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 1391,
                status: false,
                msg: 'controllerError - Adding Info Sim0 to OT - Proyect'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    addInfoSim1ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        let arrayOtNumber=[],
            arrayOtStatus=[],
            arraySim1=[],
            arrayRevisionSim1=[],
            arrayVideo=[],
            arrayRevisionVideo=[],
            arrayInforme=[],
            arrayRevisionInforme=[],
            arrayPpt=[],
            arrayRevisionPpt=[],
            arrayS1pOp20=[],
            arrayRevisionS1pOp20=[]

        for (const key in req.body) {
            
            if (key.startsWith('otNumberHidden')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('otStatusHidden')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('1SimHidden')) {
                arraySim1.push(req.body[key])
            }
            else if (key.startsWith('revision1Sim')) {
                arrayRevisionSim1.push(req.body[key])
            }
            else if (key.startsWith('videoHidden')) {
                arrayVideo.push(req.body[key])
            }
            else if (key.startsWith('revisionVideo')) {
                arrayRevisionVideo.push(req.body[key])
            }
            else if (key.startsWith('informeHidden')) {
                arrayInforme.push(req.body[key])
            }
            else if (key.startsWith('revisionInforme')) {
                arrayRevisionInforme.push(req.body[key])
            }
            else if (key.startsWith('pptHidden')) {
                arrayPpt.push(req.body[key])
            }
            else if (key.startsWith('revisionPpt')) {
                arrayRevisionPpt.push(req.body[key])
            }
            else if (key.startsWith('s1pOp20Hidden')) {
                arrayS1pOp20.push(req.body[key])
            }
            else if (key.startsWith('revisionS1p20Op')) {
                arrayRevisionS1pOp20.push(req.body[key])
            }
        }
        
// console.log('arrayOtStatus', arrayOtStatus)
// console.log('arraySim1', arraySim1)
// console.log('arrayRevisionSim1', arrayRevisionSim1)
// console.log('arrayVideo', arrayVideo)
// console.log('arrayRevisionVideo', arrayRevisionVideo)
// console.log('arrayInforme', arrayInforme)
// console.log('arrayRevisionInforme', arrayRevisionInforme)
// console.log('arrayPpt', arrayPpt)
// console.log('arrayRevisionPpt', arrayRevisionPpt)
// console.log('arrayS1pOp20', arrayS1pOp20)
// console.log('arrayRevisionS1pOp20', arrayRevisionS1pOp20)

        let arrayInfoAddedToOt = []
        for (let i=0; i<otQuantity; i++ ) {
            var infoAddedToOt = {
                otStatus: arrayOtStatus[i],
                otNumber: parseInt(arrayOtNumber[i]),
                sim1: arraySim1[i] || "sinDato",
                revisionSim1: parseInt(arrayRevisionSim1[i]) || 0,
                video: arrayVideo[i] || "sinDato",
                revisionVideo: parseInt(arrayRevisionVideo[i]) || 0,
                informe: arrayInforme[i] || "sinDato",
                revisionInforme: parseInt(arrayRevisionInforme[i]) || 0,
                ppt: arrayPpt[i] || "sinDato",
                revisionPpt: parseInt(arrayRevisionPpt[i]) || 0,
                s1pOp20: arrayS1pOp20[i] || "sinDato",
                revisionS1pOp20: parseInt(arrayRevisionS1pOp20[i]) || 0,
                timestamp: now,
                creator: user,
                modificator: modificator,
                modifiedOn: "",
            }
            arrayInfoAddedToOt.push(infoAddedToOt)
        }
        //console.log('arrayInfoAddedToOt_Controller: ', arrayInfoAddedToOt)
        //const itemUpdated = 
        await this.projects.addInfoSim1ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            arrayInfoAddedToOt
        )
        //console.log('itemUpdated_Controller: ', itemUpdated.project)    
        const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            slide: 7
        }
        
        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectSelectedDetail', {  //projectsList
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 1521,
                status: false,
                msg: 'controllerError - Adding Info Sim1 to OT - Proyect'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    addInfoSim2_3ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        let arrayOtNumber=[],
            arrayOtStatus=[],
            arraySim2=[],
            arrayRevisionSim2=[],
            arrayReporte=[],
            arrayRevisionReporte=[],
            arrayDfnProdismo=[],
            arrayRevisionDfnProdismo=[],
            arraySim3=[],
            arrayRevisionSim3=[]

        for (const key in req.body) {
            
            if (key.startsWith('otNumberHidden')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('otStatusHidden')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('2SimHidden')) {
                arraySim2.push(req.body[key])
            }
            else if (key.startsWith('revision2Sim')) {
                arrayRevisionSim2.push(req.body[key])
            }
            else if (key.startsWith('reporteHidden')) {
                arrayReporte.push(req.body[key])
            }
            else if (key.startsWith('revisionReporte')) {
                arrayRevisionReporte.push(req.body[key])
            }
            else if (key.startsWith('dfnProdismoHidden')) {
                arrayDfnProdismo.push(req.body[key])
            }
            else if (key.startsWith('revisionDfnProdismo')) {
                arrayRevisionDfnProdismo.push(req.body[key])
            }
            else if (key.startsWith('3SimHidden')) {
                arraySim3.push(req.body[key])
            }
            else if (key.startsWith('revisionSim3')) {
                arrayRevisionSim3.push(req.body[key])
            }
        }
        
// console.log('arrayOtStatus', arrayOtStatus)
// console.log('arraySim2', arraySim2)
// console.log('arrayRevisionSim2', arrayRevisionSim2)
// console.log('arrayReporte', arrayReporte)
// console.log('arrayRevisionReporte', arrayRevisionReporte)
// console.log('arrayDfnProdismo', arrayDfnProdismo)
// console.log('arrayRevisionDfnProdismo', arrayRevisionDfnProdismo)
// console.log('arraySim3', arraySim3)
// console.log('arrayRevisionSim3', arrayRevisionSim3)

        let arrayInfoAddedToOt = []
        for (let i=0; i<otQuantity; i++ ) {
            var infoAddedToOt = {
                otStatus: arrayOtStatus[i],
                otNumber: parseInt(arrayOtNumber[i]),
                sim2: arraySim2[i] || "sinDato",
                revisionSim2: parseInt(arrayRevisionSim2[i]) || 0,
                reporte: arrayReporte[i] || "sinDato",
                revisionReporte: parseInt(arrayRevisionReporte[i]) || 0,
                dfnProdismo: arrayDfnProdismo[i] || "sinDato",
                revisionDfnProdismo: parseInt(arrayRevisionDfnProdismo[i]) || 0,
                sim3: arraySim3[i] || "sinDato",
                revisionSim3: parseInt(arrayRevisionSim3[i]) || 0,
                timestamp: now,
                creator: user,
                modificator: modificator,
                modifiedOn: "",
            }
            arrayInfoAddedToOt.push(infoAddedToOt)
        }
        //console.log('arrayInfoAddedToOt_Controller: ', arrayInfoAddedToOt)
        //const itemUpdated = 
        await this.projects.addInfoSim2_3ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            arrayInfoAddedToOt
        )
        //console.log('itemUpdated_Controller: ', itemUpdated.project)    
        const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            slide: 8
        }
        
        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectSelectedDetail', {  //projectsList
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 1687,
                status: false,
                msg: 'controllerError - Adding Info Sim2_3 to OT - Proyect'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    addInfoSim4PrimeraToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        let arrayOtNumber=[],
            arrayOtStatus=[],
            arrayMatEnsayo=[],
            arrayRevisionMatEnsayo=[],
            arrayMasMenos10=[],
            arrayRevisionMasMenos10=[],
            arrayMpAlternativo=[],
            arrayRevisionMpAlternativo=[],
            arrayReunionSim=[],
            arrayRevisionReunionSim=[]

        for (const key in req.body) {
            
            if (key.startsWith('otNumberHidden')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('otStatusHidden')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('matEnsayoHidden')) {
                arrayMatEnsayo.push(req.body[key])
            }
            else if (key.startsWith('revisionMatEnsayo')) {
                arrayRevisionMatEnsayo.push(req.body[key])
            }
            else if (key.startsWith('masMenos10Hidden')) {
                arrayMasMenos10.push(req.body[key])
            }
            else if (key.startsWith('revisionMas10Menos')) {
                arrayRevisionMasMenos10.push(req.body[key])
            }
            else if (key.startsWith('mpAlternativoHidden')) {
                arrayMpAlternativo.push(req.body[key])
            }
            else if (key.startsWith('revisionMpAlternativo')) {
                arrayRevisionMpAlternativo.push(req.body[key])
            }
            else if (key.startsWith('reunionSimHidden')) {
                arrayReunionSim.push(req.body[key])
            }
            else if (key.startsWith('revisionReunionSim')) {
                arrayRevisionReunionSim.push(req.body[key])
            }
        }
        
// console.log('arrayOtStatus', arrayOtStatus)
// console.log('arrayMatEnsayo', arrayMatEnsayo)
// console.log('arrayRevisionMatEnsayo', arrayRevisionMatEnsayo)
// console.log('arrayMasMenos10', arrayMasMenos10)
// console.log('arrayRevisionMasMenos10', arrayRevisionMasMenos10)
// console.log('arrayMpAlternativo', arrayMpAlternativo)
// console.log('arrayRevisionMpAlternativo', arrayRevisionMpAlternativo)
// console.log('arrayReunionSim', arrayReunionSim)
// console.log('arrayRevisionReunionSim', arrayRevisionReunionSim)

        let arrayInfoAddedToOt = []
        for (let i=0; i<otQuantity; i++ ) {
            var infoAddedToOt = {
                otStatus: arrayOtStatus[i],
                otNumber: parseInt(arrayOtNumber[i]),
                matEnsayo: arrayMatEnsayo[i] || "sinDato",
                revisionMatEnsayo: parseInt(arrayRevisionMatEnsayo[i]) || 0,
                masMenos10: arrayMasMenos10[i] || "sinDato",
                revisionMasMenos10: parseInt(arrayRevisionMasMenos10[i]) || 0,
                mpAlternativo: arrayMpAlternativo[i] || "sinDato",
                revisionMpAlternativo: parseInt(arrayRevisionMpAlternativo[i]) || 0,
                reunionSim: arrayReunionSim[i] || "sinDato",
                revisionReunionSim: parseInt(arrayRevisionReunionSim[i]) || 0,
                timestamp: now,
                creator: user,
                modificator: modificator,
                modifiedOn: "",
            }
            arrayInfoAddedToOt.push(infoAddedToOt)
        }
        console.log('arrayInfoAddedToOt_Controller: ', arrayInfoAddedToOt)
        //const itemUpdated = 
        await this.projects.addInfoSim4PrimeraToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            arrayInfoAddedToOt
        )
        //console.log('itemUpdated_Controller: ', itemUpdated.project)    
        const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            slide: 9
        }
        
        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectSelectedDetail', {  //projectsList
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 1841,
                status: false,
                msg: 'controllerError - Adding Info Sim 4 Primera to OT - Proyect'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    addInfoSim4SegundaToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        let arrayOtNumber=[],
            arrayOtStatus=[],
            arrayInformeSim4=[],
            arrayRevisionInformeSim4=[],
            arrayGeoCopiado1=[],
            arrayRevisionGeoCopiado1=[],
            arrayGeoCopiado2=[],
            arrayRevisionGeoCopiado2=[],
            arrayHorasSim=[],
            arrayRevisionHorasSim=[]

        for (const key in req.body) {
            
            if (key.startsWith('otNumberHidden')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('otStatusHidden')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('informe4SimHidden')) {
                arrayInformeSim4.push(req.body[key])
            }
            else if (key.startsWith('revisionInforme4Sim')) {
                arrayRevisionInformeSim4.push(req.body[key])
            }
            else if (key.startsWith('geo1CopiadoHidden')) {
                arrayGeoCopiado1.push(req.body[key])
            }
            else if (key.startsWith('revisionGeo1Copiado')) {
                arrayRevisionGeoCopiado1.push(req.body[key])
            }
            else if (key.startsWith('geo2CopiadoHidden')) {
                arrayGeoCopiado2.push(req.body[key])
            }
            else if (key.startsWith('revisionGeo2Copiado')) {
                arrayRevisionGeoCopiado2.push(req.body[key])
            }
            else if (key.startsWith('horasSim')) {
                arrayHorasSim.push(req.body[key])
            }
            else if (key.startsWith('revisionHorasSim')) {
                arrayRevisionHorasSim.push(req.body[key])
            }
        }
        
// console.log('arrayOtStatus', arrayOtStatus)
// console.log('arrayInformeSim4', arrayInformeSim4)
// console.log('arrayRevisionInformeSim4', arrayRevisionInformeSim4)
// console.log('arrayGeoCopiado1', arrayGeoCopiado1)
// console.log('arrayRevisionGeoCopiado1', arrayRevisionGeoCopiado1)
// console.log('arrayGeoCopiado2', arrayGeoCopiado2)
// console.log('arrayRevisionGeoCopiado2', arrayRevisionGeoCopiado2)
// console.log('arrayHorasSim', arrayHorasSim)
// console.log('arrayRevisionHorasSim', arrayRevisionHorasSim)

        let arrayInfoAddedToOt = []
        for (let i=0; i<otQuantity; i++ ) {
            var infoAddedToOt = {
                otStatus: arrayOtStatus[i],
                otNumber: parseInt(arrayOtNumber[i]),
                informeSim4: arrayInformeSim4[i] || "sinDato",
                revisionInformeSim4: parseInt(arrayRevisionInformeSim4[i]) || 0,
                geoCopiado1: arrayGeoCopiado1[i] || "sinDato",
                revisionGeoCopiado1: parseInt(arrayRevisionGeoCopiado1[i]) || 0,
                geoCopiado2: arrayGeoCopiado2[i] || "sinDato",
                revisionGeoCopiado2: parseInt(arrayRevisionGeoCopiado2[i]) || 0,
                horasSim: parseInt(arrayHorasSim[i]) || 0,
                revisionHorasSim: parseInt(arrayRevisionHorasSim[i]) || 0,
                timestamp: now,
                creator: user,
                modificator: modificator,
                modifiedOn: "",
            }
            arrayInfoAddedToOt.push(infoAddedToOt)
        }
        //console.log('arrayInfoAddedToOt_Controller: ', arrayInfoAddedToOt)
        //const itemUpdated = 
        await this.projects.addInfoSim4SegundaToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            arrayInfoAddedToOt
        )
        //console.log('itemUpdated_Controller: ', itemUpdated.project)    
        const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            slide: 10
        }
        
        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectSelectedDetail', {  //projectsList
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 1995,
                status: false,
                msg: 'controllerError - Adding Info Sim 4 Segunda to OT - Proyect'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    addInfoSim5ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const userCreator = await this.users.getUserById(userId)

        const user = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]

        const modificator = [{
            name: "",
            lastName: "",
            username: "",
            email: ""
        }]

        let arrayOtNumber=[],
            arrayOtStatus=[],
            arrayGrillado=[],
            arrayRevisionGrillado=[],
            arrayMpEnsayada=[],
            arrayRevisionMpEnsayada=[]

        for (const key in req.body) {
            
            if (key.startsWith('otNumberHidden')) {
                arrayOtNumber.push(req.body[key])
            }
            else if (key.startsWith('otStatusHidden')) {
                arrayOtStatus.push(req.body[key])
            }
            else if (key.startsWith('grilladoHidden')) {
                arrayGrillado.push(req.body[key])
            }
            else if (key.startsWith('revisionGrillado')) {
                arrayRevisionGrillado.push(req.body[key])
            }
            else if (key.startsWith('mpEnsayadaHidden')) {
                arrayMpEnsayada.push(req.body[key])
            }
            else if (key.startsWith('revisionMpEnsayada')) {
                arrayRevisionMpEnsayada.push(req.body[key])
            }
        }
        
// console.log('arrayOtStatus', arrayOtStatus)
// console.log('arrayGrillado', arrayGrillado)
// console.log('arrayRevisionGrillado', arrayRevisionGrillado)
// console.log('arrayMpEnsayada', arrayMpEnsayada)
// console.log('arrayRevisionMpEnsayada', arrayRevisionMpEnsayada)

        let arrayInfoAddedToOt = []
        for (let i=0; i<otQuantity; i++ ) {
            var infoAddedToOt = {
                otStatus: arrayOtStatus[i],
                otNumber: parseInt(arrayOtNumber[i]),
                grillado: arrayGrillado[i] || "sinDato",
                revisionGrillado: parseInt(arrayRevisionGrillado[i]) || 0,
                mpEnsayada: arrayMpEnsayada[i] || "sinDato",
                revisionMpEnsayada: parseInt(arrayRevisionMpEnsayada[i]) || 0,
                timestamp: now,
                creator: user,
                modificator: modificator,
                modifiedOn: "",
            }
            arrayInfoAddedToOt.push(infoAddedToOt)
        }
        // console.log('arrayInfoAddedToOt_Controller: ', arrayInfoAddedToOt)
        //const itemUpdated = 
        await this.projects.addInfoSim5ToOtProject(
            projectId,
            otQuantity,
            ociNumberK,
            arrayInfoAddedToOt
        )
        //console.log('itemUpdated_Controller: ', itemUpdated.project)    
        const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)

        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            slide: 10
        }
        
        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectSelectedDetail', {  //projectsList
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 2149,
                status: false,
                msg: 'controllerError - Adding Info Sim 5 to OT - Proyect'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }


    updateStatusProject = async (req, res) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        
        const statusProjectHidden = req.body.statusProjectHidden

        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        await this.projects.updateStatusProject(
            id, 
            proyecto, 
            statusProjectHidden,
            userModificator
        )

        await this.clients.updateClient(
            clientId, 
            cliente, 
            userModificator
        )

        const proyectos = await this.projects.getProjectsByClientId(clientId)
        
        try {
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                cliente,
                proyectos
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 2280,
                status: false,
                msg: 'controllerError - updateStatusProject'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    updateLevelProject = async (req, res) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        
        const levelProject = req.body.levelProject
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        await this.projects.updateLevelProject(
            id, 
            proyecto, 
            levelProject,
            userModificator
        )        

        await this.clients.updateClient(
            clientId, 
            cliente, 
            userModificator
        )

        const proyectos = await this.projects.getProjectsByClientId(clientId)
        
        try {
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                cliente,
                proyectos
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 2343,
                status: false,
                msg: 'controllerError - updateLevelProject'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    updateStatusOci = async (req, res) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        
        const statusOciHidden = req.body.statusOciHidden
        const ociKNumber = parseInt(req.body.ociKNumberHidden)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        await this.projects.updateStatusOci(
            id, 
            proyecto,
            statusOciHidden,
            ociKNumber,
            userModificator
        )

        await this.clients.updateClient(
            clientId, 
            cliente, 
            userModificator
        )

        const proyectos = await this.projects.getProjectsByClientId(clientId)
        
        try {
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                cliente,
                proyectos
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 2406,
                status: false,
                msg: 'controllerError - updateStatusOci'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    updateStatusOt = async (req, res) => {
        const id = req.params.id
        const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
        
        const clientId = mainProyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        
        const statusOtHidden = req.body.statusOtHidden
        const ociKNumberHidden = parseInt(req.body.ociKNumberHidden)
        const otKNumberHidden = parseInt(req.body.otKNumberHidden)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        await this.projects.updateStatusOt(
            id, 
            mainProyecto,
            statusOtHidden,
            ociKNumberHidden,
            otKNumberHidden,
            userModificator
        )

        await this.clients.updateClient(
            clientId, 
            cliente, 
            userModificator
        )

        const proyecto = await this.projects.selectProjectsByMainProjectId(id)
        
        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0
        }

        try {
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('projectSelectedDetail', {
                proyecto,
                username,
                userInfo,
                expires,
                cliente,
                data
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 2471,
                status: false,
                msg: 'controllerError - updateStatusOt'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    addNewOciToProject = async (req, res) => {
        //------ Storage Client Logo Image in Google Store --------
        const storage = multer.memoryStorage({
            fileFilter: (req, file, cb) => {
                if (file.mimetype.startsWith('image/')) {
                    cb(null, true);
                } else {
                    cb(new Error('Solo se permiten imágenes'));
                }
            },
        }); // Almacenamiento en memoria para cargar archivos temporalmente
        
            var uploadMulter = multer({
                storage: storage
            }).any()
        
        uploadMulter(req, res, async (err) => {

            if (req.files && req.files.length != 0) {
                await uploadToGCS(req, res, next)
            }
              
            const id = req.params.id
            const proyecto = await this.projects.selectProjectByProjectId(id)
            const projectId = proyecto[0]._id
        
            const clientId = proyecto[0].client[0]._id
            const cliente = await this.clients.selectClientById(clientId)
            
            const ociQuantity = parseInt(req.body.ociQuantityModal)
            
            let username = res.locals.username
            let userInfo = res.locals.userInfo
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)

            const cookie = req.session.cookie
            const time = cookie.expires
            const expires = new Date(time)

            const user = {
                name: userCreator.name,
                lastName: userCreator.lastName,
                username: userCreator.username,
                email: userCreator.email
            }

            const modificator = {
                        name: "",
                        lastName: "",
                        username: "",
                        email: ""
                    }

            let arrayOciNumber=[],
                arrayOciDescription=[],
                arrayOciStatus=[],
                arrayOciImages=[],
                arrayOciAlias=[]
                    
            for (const key in req.body) {
                if (key.startsWith('ociNumber')) {
                    arrayOciNumber.push(req.body[key])
                }
                else if (key.startsWith('ociDescription')) {
                    arrayOciDescription.push(req.body[key])
                }
                else if (key.startsWith('ociStatus')) {
                    arrayOciStatus.push(req.body[key] === 'on' ? true : false)
                }
                else if (key.startsWith('imageOciFileNameModal')) {
                    const keyValue = req.body[key] === '' ?  imageNotFound : req.body[key]
                    arrayOciImages.push(keyValue)
                }
                else if (key.startsWith('ociAlias')) {
                    arrayOciAlias.push(req.body[key])
                }
            }
            
            let arrayOciAddedToProject = []
            for (let i=0; i<ociQuantity; i++ ) {
                var infoOciAddedToProject = {
                    ociNumber: parseInt(arrayOciNumber[i]),
                    ociDescription: arrayOciDescription[i] || "sinDatos",
                    ociStatus: arrayOciStatus[i] || true,
                    ociImage: arrayOciImages[i],
                    ociAlias: arrayOciAlias[i] || "Sin Apodo",
                    timestamp: now,
                    creator: user,
                    modificator: modificator,
                    modifiedOn: "",
                }
                arrayOciAddedToProject.push(infoOciAddedToProject)
            } 
            
            try {
                await this.clients.updateClient(
                    clientId, 
                    cliente, 
                    user
                    )
                    
                await this.projects.addNewOciToProject(
                    projectId,
                    ociQuantity,
                    arrayOciAddedToProject
                    )
        
                const proyectos = await this.projects.getProjectsByClientId(clientId)
    
                if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
                res.render('clientProjectsDetails', {
                    username,
                    userInfo,
                    expires,
                    cliente,
                    proyectos
                })
    
            } catch (error) {
                const flag = {
                    dirNumber: 500
                }
                const errorInfo = {
                    errorNumber: 2545,
                    status: false,
                    msg: 'controllerError - addNewOciToProject'
                }
                res.render('errorPages', {
                    error,
                    errorInfo,
                    flag
                })
            }
        })
    }

    updateProject = async (req, res) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
            name: userCreator.name,
            lastName: userCreator.lastName,
            username: userCreator.username,
            email: userCreator.email
        }]
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        //------ Storage Project Image in Google Store --------
        const storage = multer.memoryStorage({
            fileFilter: (req, file, cb) => {
                if (file.mimetype.startsWith('image/')) {
                    cb(null, true);
                } else {
                    cb(new Error('Solo se permiten imágenes'));
                }
            },
        }); // Almacenamiento en memoria para cargar archivos temporalmente
                
        const uploadMulter = multer({
            storage: storage
        }).single('imageProject')

        uploadMulter(req, res, async (err) => {
            if (req.file) {
                await uploadToGCSingleFile(req, res, next)
            }

            const statusProject = req.body.statusProjectForm
            const projectName = req.body.projectName
            const projectDescription = req.body.projectDescription
            const prioProject = req.body.prioProject
            const levelProject = req.body.levelProject
            const codeProject = req.body.codeProject
            const imageProjectText = req.body.imageProjectFileName
                        
            if (err) {
                const error = new Error('No se agregó ningún archivo')
                error.httpStatusCode = 400
                return error
            }

            try{
                await this.projects.updateProject(
                    id,
                    proyecto,
                    statusProject,
                    projectName,
                    projectDescription,
                    prioProject,
                    levelProject,
                    codeProject,
                    imageProjectText,
                    userModificator
                )

            } catch (error) {
                const flag = {
                    dirNumber: 500
                }
                const errorInfo = {
                    errorNumber: 2673,
                    status: false,
                    msg: 'controllerError - updateProject'
                }
                res.render('errorPages', {
                    error,
                    errorInfo,
                    flag
                })
            }
        })

        await this.clients.updateClient(
            clientId, 
            cliente, 
            userModificator
        )

        const proyectos = await this.projects.getProjectsByClientId(clientId)
        
        try {
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                cliente,
                proyectos
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 2673,
                status: false,
                msg: 'controllerError - updateProject'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    updateOci = async (req, res) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        //------ Storage OCI Image in Google Store --------
        const storage = multer.memoryStorage({
            fileFilter: (req, file, cb) => {
                if (file.mimetype.startsWith('image/')) {
                    cb(null, true);
                } else {
                    cb(new Error('Solo se permiten imágenes'));
                }
            },
        }); // Almacenamiento en memoria para cargar archivos temporalmente
                
        const uploadMulter = multer({
            storage: storage
        }).single('imageOci')

        uploadMulter(req, res, async (err) => {
            // console.log('req.file: ', req.file)
            if (req.file) {
                await uploadToGCSingleFile(req, res, next)
            }

            const statusOci = req.body.statusOciForm
            const ociDescription = req.body.descriptionOci
            const ociAlias = req.body.aliasOci
            const ociNumber = req.body.numberOci
            const ociKNumber = req.body.ociKNumberHidden
            const ociImageText = req.body.imageOciFileName
                        
            if (err) {
                const error = new Error('No se agregó ningún archivo')
                error.httpStatusCode = 400
                return error
            }

            try{
                await this.projects.updateOci(
                    id,
                    proyecto,
                    statusOci,
                    ociDescription,
                    ociAlias,
                    ociNumber,
                    ociKNumber,
                    ociImageText,
                    userModificator
                )
            } catch (error) {
                const flag = {
                    dirNumber: 500
                }
                const errorInfo = {
                    errorNumber: 2778,
                    status: false,
                    msg: 'controllerError - updateOci'
                }
                res.render('errorPages', {
                    error,
                    errorInfo,
                    flag
                })
            }
        })

        try {
            await this.clients.updateClient(
                clientId, 
                cliente, 
                userModificator
            )

            const proyectos = await this.projects.getProjectsByClientId(clientId)
        
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                cliente,
                proyectos
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 2856,
                status: false,
                msg: 'controllerError - updateClient inside updateOci'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    updateOt = async (req, res) => {
        const id = req.params.id
        const proyectoBuscado = await this.projects.selectProjectsByMainProjectId(id)
        
        const clientId = proyectoBuscado[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const ociKNumber = parseInt(req.body.ociKNumberHidden)
        const otNumber = parseInt(req.body.numberOt)
        const otKNumber =  parseInt(req.body.otKNumberHidden)
        const opNumber = parseInt(req.body.numeroOp)
        const statusOt = req.body.statusOtForm
        const otDescription = req.body.descriptionOt
        const otDesign = req.body.designOt
        const otSimulation = req.body.simulationOt
        const otSupplier = req.body.supplierOt

            await this.projects.updateOt(
                id,
                proyectoBuscado,
                ociKNumber,
                otNumber,
                otKNumber,
                opNumber,
                statusOt,
                otDescription,
                otDesign,
                otSimulation,
                otSupplier,
                userModificator
            )
            
            await this.clients.updateClient(
                clientId, 
                cliente, 
                userModificator
            )

            const data = { // Inicializar variables en servidor
                k: 0, 
                m: 0,
                j: 0
            }

        try {
            const proyecto = await this.projects.selectProjectsByMainProjectId(id)
            
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('projectSelectedDetail', {
                proyecto,
                username,
                userInfo,
                expires,
                cliente,
                data
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 2886,
                status: false,
                msg: 'controllerError - updateOt'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    deleteOci = async (req, res) => {
        
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const clienteSeleccionado = await this.clients.selectClientById(clientId)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const ociKNumber = req.body.ociKNumberHidden
        
        try {
            
            await this.projects.deleteOci(
                id, 
                proyecto,
                ociKNumber,
                userModificator
                )
                                
            const cliente = await this.clients.updateClient(
                clientId, 
                clienteSeleccionado, 
                userModificator
            )

            const proyectos = await this.projects.getProjectsByClientId(clientId)
                
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
                res.render('clientProjectsDetails', {
                    username,
                    userInfo,
                    expires,
                    cliente,
                    proyectos
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 2972,
                status: false,
                msg: 'controllerError - deleteOci'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    deleteOt = async (req, res) => {
        const id = req.params.id
        const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
        
        const clientId = mainProyecto[0].client[0]._id
        const clienteSeleccionado = await this.clients.selectClientById(clientId)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const ociKNumber = req.body.ociKNumberHidden
        const otKNumber = req.body.otKNumberHidden
        
        try {
            await this.projects.deleteOt(
                id, 
                mainProyecto,
                ociKNumber,
                otKNumber,
                userModificator
                )
             
            const cliente = await this.clients.updateClient(
                clientId, 
                clienteSeleccionado, 
                userModificator
            )

            const proyecto = await this.projects.selectProjectsByMainProjectId(id)

            const data = { // Inicializar variables en servidor
                k: 0, 
                m: 0,
                j: 0
            }

            if (!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado' })
                res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    expires,
                    cliente,
                    proyecto,
                    data
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 3037,
                status: false,
                msg: 'controllerError - deleteOt'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }

    deleteProjectById = async (req, res) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const clienteSeleccionado = await this.clients.selectClientById(clientId)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        
        const userModificator = [{
                    name: userCreator.name,
                    lastName: userCreator.lastName,
                    username: userCreator.username,
                    email: userCreator.email
                }]
        
        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)
        
        try {
            const proyectos = await this.projects.deleteProjectById(
                id, 
                proyecto, 
                userModificator
            )
            
            const cliente = await this.clients.reduceClientProjectQty(
                clientId, 
                clienteSeleccionado, 
                userModificator
            )
                
            if (!proyectos) return res.status(404).json({ msg: 'Proyecto no encontrado' })
            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                cliente,
                proyectos
            })

        } catch (error) {
            const flag = {
                dirNumber: 500
            }
            const errorInfo = {
                errorNumber: 3109,
                status: false,
                msg: 'controllerError - deleteProjectById'
            }
            res.render('errorPages', {
                error,
                errorInfo,
                flag
            })
        }
    }
}

module.exports = { ProgramationController }