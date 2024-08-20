const ProyectosService = require("../services/projects.service.js")
const ClientesService = require("../services/clients.service.js")
const UserService = require("../services/users.service.js")

const { uploadToGCS, uploadToGCSingleFile } = require("../utils/uploadFilesToGSC.js")

let now = require('../utils/formatDate.js')

const csrf = require('csrf');
const csrfTokens = csrf();

const multer = require('multer')
let imageNotFound = "../../../src/images/upload/LogoClientImages/noImageFound.png"
const cookie = require('../utils/cookie.js')

const data = require('../utils/variablesInicializator.js')

const { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty } = require('../utils/generateUsers.js')

const {catchError400,
       catchError400_1,
       catchError400_2,
       catchError400_3,
       catchError400_4,
       catchError403,
       catchError401,
       catchError401_1,
       catchError401_2,
       catchError401_3,
       catchError401_4,
       catchError500
} = require('../utils/catchErrors.js')

class ProjectsController {
    constructor() {
        this.projects = new ProyectosService()
        this.clients = new ClientesService()
        this.users = new UserService()
    }

    getAllProjects = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const cliente = await this.clients.getClientById()
            if (!cliente) {
                catchError401(req, res, next)
            }
            const proyectos = await this.projects.getAllProjects()
            if (!proyectos) {
                catchError400(req, res, next)
            }

            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('projectsList', {
                proyectos,
                cliente,
                username,
                userInfo,
                expires,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getProjectsByClientId = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const cliente = await this.clients.getClientById(id)
            if (!cliente) {
                catchError401(req, res, next)
            }

            const proyectos = await this.projects.getProjectsByClientId(id)
            if (!proyectos) {
                catchError400(req, res, next)
            }
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('clientProjectsDetails', {
                proyectos,
                username,
                userInfo,
                expires,
                cliente,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    selectProjectByClientId = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const cliente = await this.clients.getClientById(id)
            if (!cliente) {
                catchError401(req, res, next)
            }

            const proyectos = await this.projects.getProjectsByClientId(id)
            if (!proyectos) {
                catchError400(req, res, next)
            }

            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('clientProjectsDetails', {
                proyectosCargados,
                username,
                userInfo,
                expires,
                cliente,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    selectProjectById = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const proyecto = await this.projects.selectProjectByProjectId(id)
            if (!proyecto) {
                catchError401_1(req, res, next)
            }

            const idCliente = proyecto[0].client[0]._id
            const cliente = await this.clients.getClientByProjectId(idCliente)
            if (!cliente) {
                catchError401(req, res, next)
            }
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('projectSelectedDetail', {
                proyecto,
                username,
                userInfo,
                expires,
                cliente,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    createNewProject = async (req, res, next) => {
        //------ Storage Project and OCI Images in Google Store --------
        const storage = multer.memoryStorage(); // Almacenamiento en memoria para cargar archivos temporalmente
        
        const uploadImageMulter = multer({
            storage: storage,
            fileFilter: (req, file, cb) => {
                console.log('file:', file)
                if (file.mimetype.startsWith('image/')) {
                    cb(null, true);
                } else {
                    cb(new Error('Solo se permiten imágenes'));
                }
            }
        }).any()

        uploadImageMulter(req, res, next, async (err) => {
            console.log('req:', req);
            if (err instanceof multer.MulterError) {
                // Errores relacionados con multer (ej. tamaño de archivo)
                console.log('Error Multer: ', err);
            } else if (err) {
                // Errores generales (ej. validación fallida)
                console.log('Error en la carga del archivo: ', err);
            } else {
                // Proceso exitoso
                console.log('Archivo subido correctamente');
                console.log('req.files:', req.files);

                try {
                    if (req.files && req.files.length != 0) {
                        await uploadToGCSingleFile(req, res, next)
                    }

                    let username = res.locals.username
                    let userInfo = res.locals.userInfo
                    const expires = cookie(req)

                    // const csrfToken = req.cookies.csrfSecret;
                    // if (csrfTokens.verify(req.csrfSecret, csrfToken)) {
                    //     catchError403(req, res, next)
                    // }

                    const userId = userInfo.id
                    const userCreator = await this.users.getUserById(userId)
                    if (!userCreator) {
                        catchError401_3(req, res, next)
                    }
    
                    const clientId = req.body.clientIdHidden
                    const clienteSeleccionado = await this.clients.selectClientById(clientId)
                    if (!clienteSeleccionado) {
                        catchError401(req, res, next)
                    }
    
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
    
                    const ociKNumber = 0
                    let invalidOciNumber = true
                    let indexArrayOciNumber = 0
                    for (let h=0; h<arrayOciNumber.length; h++) {
                        const ociNumberValid = await this.projects.selectOciByOciNumber(arrayOciNumber[h], ociKNumber)
//                     const otherOciNumbers = proyecto[0].project[0].oci.map(oci => oci.ociNumber);
//                     console.log('otherOciNumbers ', otherOciNumbers)
//                     if (otherOciNumbers.includes(parseInt(ociNumberValid))) {
//                         invalidOciNumber = false
//                         indexArrayOciNumber = h
//                         break;
//                     }
                    }
                
                    if (!invalidOciNumber) {
                        const err = new Error (`Ya existe una OCI# ${arrayOciNumber[indexArrayOciNumber]} o Numero de OCI inválido!`)
                        err.statusCode = 400
                        return next(err);
                    }
    
                    let arrayOciProjects = []
                    const ociQuantity = parseInt(req.body.ociQuantity)

                    if (ociQuantity <= 0) {
                        return catchError400_1(req, res, next)

                    } else {
                        for(let i=0; i<ociQuantity; i++) {
                            var ociProject = {
                                ociNumber: parseInt(arrayOciNumber[i]),
                                ociDescription: arrayOciDescription[i],
                                ociAlias: arrayOciAlias[i],
                                ociStatus: arrayOciStatus[i] == 'on' ? true : false,
                                creator: dataUserCreator(userCreator),
                                timestamp: now,
                                ociImage: arrayOciImages[i] || imageNotFound,
                                modificator: dataUserModificatorEmpty(),
                                modifiedOn: "",
                                visible: true
                            }
                            arrayOciProjects.push(ociProject)
                        }
                    }  
                
                    const projectInput = req.body.projectName
                    const projectCodeInput = req.body.codeProject
                    const projectNameExist = await this.users.getExistingProject(projectInput, projectCodeInput);
                    if (projectNameExist) {
                        catchError400_2(req, res, next)
                    }
    
                    const selectFieldLevel = req.body.levelProject;
                    if (validateSelectField(selectFieldLevel)) {
                        
                        const project = {
                            projectName: projectInput,
                            statusProject: req.body.statusProject == 'on' ? true : false,
                            levelProject: selectFieldLevel,
                            codeProject: projectCodeInput,
                            projectDescription: req.body.projectDescription,
                            prioProject: parseInt(req.body.prioProject),
                            imageProject: req.body.imageProject || imageNotFound,
                            visible: true,
                            creator: dataUserCreator(userCreator),
                            timestamp: now,
                            modificator: dataUserModificatorEmpty(),
                            modifiedOn: "",
                            oci: arrayOciProjects
                        }
        
                        const newProject = {
                            creator: dataUserCreator(userCreator),
                            client: clienteSeleccionado,
                            project: project,
                            timestamp: now,
                            modificator: dataUserModificatorEmpty(),
                            modifiedOn: "",
                            visible: true
                        }
        
                        const newProjectCreated = await this.projects.createNewProject(newProject)
                        if (!newProjectCreated) {
                            catchError401_1(req, res, next)
                        }
                        const cliente = await this.clients.updateClientProjectsQty(
                            clientId, 
                            clienteSeleccionado, 
                            dataUserCreator(userCreator)
                        )
    
                        const proyectos = await this.projects.getProjectsByClientId(clientId)
                        if (!proyectos) {
                            catchError401_1(req, res, next)
                        }
        
                        const csrfToken = csrfTokens.create(req.csrfSecret);
                        setTimeout(() => {
                            return res.render('clientProjectsDetails', {
                                username,
                                userInfo,
                                expires,
                                cliente,
                                proyectos,
                                data,
                                csrfToken
                            })
                        }, 2000)
    
                    } else {
                        catchError400_3(req, res, next)
                    }
                
                    function validateSelectField(value) {
                        const validOptions = [
                            'ganado', 'aRiesgo', 'paraCotizar'
                        ];
                        return validOptions.includes(value);
                    }
    
                } catch (err) {
                    catchError500(err, req, res, next)
                }
            }
        })
    }

    getAllOciProjects = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const clientes = await this.clients.getAllClients()
            if (!clientes) {
                catchError401(req, res, next)
            }
            
            const proyectos = await this.projects.getAllOciProjects()
            if (!proyectos) {
                catchError400(req, res, next)
            }

            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('nestableOciList', {
                username,
                userInfo,
                proyectos,
                clientes,
                expires,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addOtToOciProject = async (req, res, next) => {
        const { id } = req.params
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const numberOci = parseInt(req.body.ociNumber)
        const ociNumberK = parseInt(req.body.ociNumberK)
        
        const projectId = id || req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }
        
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
            otInfoDisenoPrimera: [],
            otInfoDisenoSegunda: [],
            otInfoInfo80: [],
            otInfoInfo100: [],
            otInfoSim0: [],
            otInfoSim1: [],
            otInfoSim2_3: [],
            otInfoSim4Primera: [],
            otInfoSim4Segunda: [],
            otInfoSim5: []
        }]

        const otDetallesEmpty = []
        const arrayOtAddedToOci = []
        if (otQuantity>0) {
            for(let i=0; i<otQuantity; i++) {
                var otAddedToOci = {
                    otNumber: arrayOtNumber[i],
                    opNumber: arrayOpNumber[i],
                    opDescription: arrayOpDescription[i],
                    otStatus: arrayOtStatus[i] == 'on' ? true : false,
                    otDesign: arrayOtDesign[i],
                    otSimulation: arrayOtSimulation[i],
                    otSupplier: arrayOtSupplier[i],
                    creator: dataUserCreator(userCreator),
                    timestamp: now,
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                    otInformation: otInformationEmpty,
                    otDetalles: otDetallesEmpty
                }
                arrayOtAddedToOci.push(otAddedToOci)
            }

        } else {
            catchError400_1(req, res, next)
        }

        try {
            await this.projects.addOtToOciProject(
                projectId,
                numberOci,
                ociNumberK,
                arrayOtAddedToOci
            )

            await this.clients.updateClient(
                clientId, 
                cliente, 
                dataUserModificatorNotEmpty(userCreator)
            )

            const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            if (!proyecto || !cliente) {
                catchError401_1(req, res, next)
            }

            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('projectSelectedDetail', {
                proyecto,
                username,
                userInfo,
                expires,
                cliente,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoR14ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }

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
                creator: dataUserCreator(userCreator),
                modificator: dataUserModificatorEmpty(),
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
        
        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            slide: 0
        }
        
        try {
            const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            if (!proyecto || !cliente) {
                catchError401_1(req, res, next)
            }

            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('projectSelectedDetail', {  //projectsList
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoProceso3dToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }

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
                creator: dataUserCreator(userCreator),
                modificator: dataUserModificatorEmpty(),
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
            if (!proyecto || !cliente) {
                catchError401_4(req, res, next)
            }

            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('projectSelectedDetail', {
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoDisenoPrimeraToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }

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
                creator: dataUserCreator(userCreator),
                modificator: dataUserModificatorEmpty(),
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

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoDisenoSegundaToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }

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
                creator: dataUserCreator(userCreator),
                modificator: dataUserModificatorEmpty(),
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

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfo80ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }

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
                creator: dataUserCreator(userCreator),
                modificator: dataUserModificatorEmpty(),
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

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfo100ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }

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
                creator: dataUserCreator(userCreator),
                modificator: dataUserModificatorEmpty(),
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

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoSim0ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const expires = cookie(req)

        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }

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
                creator: dataUserCreator(userCreator),
                modificator: dataUserModificatorEmpty(),
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

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoSim1ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const userId = userInfo.id

        const expires = cookie(req)

        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }

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
                creator: dataUserCreator(userCreator),
                modificator: dataUserModificatorEmpty(),
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

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoSim2_3ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }

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
                creator: dataUserCreator(userCreator),
                modificator: dataUserModificatorEmpty(),
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

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoSim4PrimeraToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }

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
                creator: dataUserCreator(userCreator),
                modificator: dataUserModificatorEmpty(),
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

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoSim4SegundaToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }

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
                creator: dataUserCreator(userCreator),
                modificator: dataUserModificatorEmpty(),
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

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoSim5ToOtProject = async (req, res) => {
        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }

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
                creator: dataUserCreator(userCreator),
                modificator: dataUserModificatorEmpty(),
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
        
        const data = { // Inicializar variables en servidor
            k: 0, 
            m: 0,
            j: 0,
            slide: 10
        }
        
        try {
            const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            if (!proyecto) return res.status(404).json({ msg: 'Proyecto, OCI u OT no encontrada' })
            res.render('projectSelectedDetail', {  //projectsList
                username,
                userInfo,
                expires,
                cliente,
                proyecto,
                data
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }


    updateStatusProject = async (req, res, next) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }

        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const expires = cookie(req)

        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }
        

        try {
            const statusProjectHidden = req.body.statusProjectHidden
            if (validateSelectField(statusProjectHidden)) {
                await this.projects.updateStatusProject(
                    id, 
                    proyecto, 
                    statusProjectHidden,
                    dataUserModificatorNotEmpty(userCreator)
                )

                await this.clients.updateClient(
                    clientId, 
                    cliente, 
                    dataUserModificatorNotEmpty(userCreator)
                )

                const proyectos = await this.projects.getProjectsByClientId(clientId)
            
                if (!proyecto || !proyectos) {
                    catchError401_1(req, res, next)
                }

                const csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('clientProjectsDetails', {
                    username,
                    userInfo,
                    expires,
                    cliente,
                    proyectos,
                    data,
                    csrfToken
                })

            } else {
                catchError400_3(req, res, next)
            }

            function validateSelectField(value) {
                const validOptions = [
                    'true', 'false'
                ];
                return validOptions.includes(value);
            }

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    updateLevelProject = async (req, res, next) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const expires = cookie(req)

        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }
        
        try {
            const levelProject = req.body.levelProject
            if (validateSelectField(levelProject)) {

                await this.projects.updateLevelProject(
                    id, 
                    proyecto, 
                    levelProject,
                    dataUserModificatorNotEmpty(userCreator)
                )        

                await this.clients.updateClient(
                    clientId, 
                    cliente, 
                    dataUserModificatorNotEmpty(userCreator)
                )

                const proyectos = await this.projects.getProjectsByClientId(clientId)
                if (!proyecto || !proyectos || !cliente) {
                    catchError401_1(req, res, next)
                }

                const csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('clientProjectsDetails', {
                    username,
                    userInfo,
                    expires,
                    cliente,
                    proyectos,
                    csrfToken
                })

            } else {
                catchError400_3(req, res, next)
            }

            function validateSelectField(value) {
                const validOptions = [
                    'ganado', 'aRiesgo', 'paraCotizar'
                ];
                return validOptions.includes(value);
            }

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    updateStatusOci = async (req, res, next) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const ociKNumber = parseInt(req.body.ociKNumberHidden)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const expires = cookie(req)

        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }
        
        try {
            const statusOciHidden = req.body.statusOciHidden
            if (validateSelectField(statusOciHidden)) {

                await this.projects.updateStatusOci(
                    id, 
                    proyecto,
                    statusOciHidden,
                    ociKNumber,
                    dataUserModificatorNotEmpty(userCreator)
                )

                await this.clients.updateClient(
                    clientId, 
                    cliente, 
                    dataUserModificatorNotEmpty(userCreator)
                )

                const proyectos = await this.projects.getProjectsByClientId(clientId)
                if (!proyecto || !proyectos || !cliente) {
                    catchError401_1(req, res, next)
                }
                
                const csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('clientProjectsDetails', {
                    username,
                    userInfo,
                    expires,
                    cliente,
                    proyectos,
                    data,
                    csrfToken
                })

            } else {
                catchError400_3(req, res, next)
            }

            function validateSelectField(value) {
                const validOptions = [
                    'true', 'false'
                ];
                return validOptions.includes(value);
            }

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    updateStatusOt = async (req, res, next) => {
        const id = req.params.id
        const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
        
        const clientId = mainProyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const ociKNumberHidden = parseInt(req.body.ociKNumberHidden)
        const otKNumberHidden = parseInt(req.body.otKNumberHidden)
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const expires = cookie(req)

        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }
       
        try {
            await this.projects.updateStatusOt(
                id, 
                mainProyecto,
                statusOtHidden,
                ociKNumberHidden,
                otKNumberHidden,
                dataUserModificatorNotEmpty(userCreator)
            )

            await this.clients.updateClient(
                clientId, 
                cliente, 
                dataUserModificatorNotEmpty(userCreator)
            )

            const statusOtHidden = req.body.statusOtHidden
            if (validateSelectField(statusOtHidden)) {
                const proyecto = await this.projects.selectProjectsByMainProjectId(id)
                if (!proyecto || mainProyecto || !cliente) {
                    catchError401_1(req, res, next)
                }
                
                const csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('projectSelectedDetail', {
                    proyecto,
                    username,
                    userInfo,
                    expires,
                    cliente,
                    data,
                    csrfToken
                })

            } else {
                catchError400_3(req, res, next)
            }

            function validateSelectField(value) {
                const validOptions = [
                    'true', 'false'
                ];
                return validOptions.includes(value);
            }

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addNewOciToProject = async (req, res, next) => {
        const id = req.params.id
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        const csrfToken = req.csrfSecret;
        if (csrfTokens.verify(req.csrfSecret, csrfToken)) {
            catchError403(req, res, next)
        }
        
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }

        const proyecto = await this.projects.selectProjectByProjectId(id)
        const projectId = proyecto[0]._id

        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }

        //------ Storage Image in Google Store --------
        const storage = multer.memoryStorage(); // Almacenamiento en memoria para cargar archivos temporalmente
        
            var uploadMulter = multer({
                storage: storage,
                fileFilter: (req, file, cb) => {
                    if (file.mimetype.startsWith('image/')) {
                        cb(null, true);
                    } else {
                        cb(new Error('Solo se permiten imágenes'));
                    }
                },
            }).any()
        
        uploadMulter(req, res, async (err) => {
            // console.log('req.files---> ', req.files)
            if (req.files && req.files.length != 0) {
                uploadToGCSingleFile(req, res, next)
            }

            const ociQuantity = parseInt(req.body.ociQuantityModal)
                        
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

            const ociKNumber = 0
            let invalidOciNumber = true
            let indexArrayOciNumber = 0
            for (let h=0; h<arrayOciNumber.length; h++) {
                const ociNumberValid = await this.projects.selectOciByOciNumber(arrayOciNumber[h], ociKNumber)
                const otherOciNumbers = proyecto[0].project[0].oci.map(oci => oci.ociNumber);
                console.log('otherOciNumbers ', otherOciNumbers)
                if (otherOciNumbers.includes(parseInt(ociNumberValid))) {
                    invalidOciNumber = false
                    indexArrayOciNumber = h
                    break;
                }
            }
            
            if (!invalidOciNumber) {
                const err = new Error (`Ya existe una OCI# ${arrayOciNumber[indexArrayOciNumber]} o Numero de OCI inválido!`)
                err.dirNumber = 400
                return next(err);
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
                    creator: dataUserCreator(userCreator),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayOciAddedToProject.push(infoOciAddedToProject)
            }

            if (err) {
                const error = new Error('No se agregó ningún archivo')
                error.httpStatusCode = 400
                return error
            }
            
            try {
                await this.clients.updateClient(
                    clientId, 
                    cliente, 
                    dataUserModificatorNotEmpty(userCreator)
                )
                    
                await this.projects.addNewOciToProject(
                    projectId,
                    ociQuantity,
                    arrayOciAddedToProject
                )
        
                const proyectos = await this.projects.getProjectsByClientId(clientId)
                if (!proyecto || !proyectos || !cliente) {
                    catchError401_1(req, res, next)
                }

                const csrfToken = csrfTokens.create(req.csrfSecret);
                setTimeout(() => {
                    return res.render('clientProjectsDetails', {
                        username,
                        userInfo,
                        expires,
                        cliente,
                        proyectos,
                        data,
                        csrfToken
                    })
                }, 2000)
    
            } catch (err) {
                catchError500(err, req, res, next)
            }
        })
    }

    updateProject = async (req, res, next) => {
        const id = req.params.id
        const proyecto = await this.projects.selectProjectByProjectId(id)
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const expires = cookie(req)

        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }
        
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
console.log('storage: ', storage)

        const uploadMulter = multer({
            storage: storage
        }).single('imageProject')

console.log('uploadMulter: ', uploadMulter)

        uploadMulter(req, res, async (err) => {
            if (req.file) {
                uploadToGCS(req, res, next)
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
                    dataUserModificatorNotEmpty(userCreator)
                )

                await this.clients.updateClient(
                    clientId, 
                    cliente, 
                    dataUserModificatorNotEmpty(userCreator)
                )

                const proyectos = await this.projects.getProjectsByClientId(clientId)
                if (!proyecto || !proyectos || !cliente) {
                    catchError401_1(req, res, next)
                }
            
                const csrfToken = csrfTokens.create(req.csrfSecret);
                setTimeout(() => {
                    return res.render('clientProjectsDetails', {
                        username,
                        userInfo,
                        expires,
                        cliente,
                        proyectos,
                        data,
                        csrfToken
                    })
                }, 2000)

            } catch (err) {
                catchError500(err, req, res, next)
            }
        })
    }

    updateOci = async (req, res, next) => {
        const id = req.params.id
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const expires = cookie(req)

        const proyecto = await this.projects.selectProjectByProjectId(id)
        // console.log('proyecto: ', proyecto)
        if (!proyecto) {
            catchError401_1(req, res, next)
        }
        
        const clientId = proyecto[0].client[0]._id
        const cliente = await this.clients.selectClientById(clientId)
        if (!cliente) {
            catchError401(req, res, next)
        }
        
        const userId = userInfo.id
        const userCreator = await this.users.getUserById(userId)
        if (!userCreator) {
            catchError401_3(req, res, next)
        }
                
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
            if (req.file) {
                uploadToGCSingleFile(req, res, next)
            }

            const ociNumberInput = parseInt(req.body.numberOci)
            const numberOciHidden = parseInt(req.body.numberOciHidden)
            const ociKNumber = parseInt(req.body.ociKNumberHidden)
            const confirmationNumberOci = Boolean(req.body.confirmationNumberOci)
            let ociNumberValid = 1

            if (!confirmationNumberOci) {
                ociNumberValid = numberOciHidden

            } else {
                ociNumberValid = await this.projects.selectOciByOciNumber(ociNumberInput, ociKNumber)         
                const otherOciNumbers = proyecto[0].project[0].oci.map(oci => oci.ociNumber);
            
                if (otherOciNumbers.includes(ociNumberValid)) {
                    const err = new Error (`Ya existe una OCI# ${ociNumberInput} o Numero de OCI inválido!`)
                    err.dirNumber = 400
                    return next(err);
                }
            }    

            const statusOci = req.body.statusOciForm
            const ociDescription = req.body.descriptionOci
            const ociAlias = req.body.aliasOci
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
                    ociNumberValid,
                    ociKNumber,
                    ociImageText,
                    dataUserModificatorNotEmpty(userCreator)
                )

                await this.clients.updateClient(
                    clientId, 
                    cliente, 
                    dataUserModificatorNotEmpty(userCreator)
                )

                const proyectos = await this.projects.getProjectsByClientId(clientId)
                if (!proyecto || !proyectos || !cliente) {
                    catchError401_2(req, res, next)
                }

                const csrfToken = csrfTokens.create(req.csrfSecret);
                setTimeout(() => {
                    return res.render('clientProjectsDetails', {
                        username,
                        userInfo,
                        expires,
                        cliente,
                        proyectos,
                        data,
                        csrfToken
                    })
                }, 2000)
            
            } catch (err) {
                catchError500(err, req, res, next)
            }
        })
    }

    updateOt = async (req, res, next) => {
        const id = req.params.id
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const proyectoBuscado = await this.projects.selectProjectsByMainProjectId(id)
            if (!proyectoBuscado) {
                catchError401_1(req, res, next)
            }
            
            const clientId = proyectoBuscado[0].client[0]._id
            const cliente = await this.clients.selectClientById(clientId)
            if (!cliente) {
                catchError401(req, res, next)
            }
            
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            if (!userCreator) {
                catchError401_3(req, res, next)
            }

            const ociKNumber = parseInt(req.body.ociKNumberHidden)
            const otKNumber =  parseInt(req.body.otKNumberHidden)
            const numberOtHidden = parseInt(req.body.otNumberHidden)
            const otNumberInput = parseInt(req.body.numberOt)
            const confirmationNumberOt = Boolean(req.body.confirmationNumberOt)
            let otNumberValid = 1
                             
            if (!confirmationNumberOt) {
                otNumberValid = numberOtHidden

            } else {
                otNumberValid = await this.projects.selectOtByOtNumber(otNumberInput, otKNumber, ociKNumber)
                const ociQuantity = proyectoBuscado[0].project[0].oci
                const arrayOts = []
                for (let a=0; a<parseInt(ociQuantity.length); a++) {
                    arrayOts.push(proyectoBuscado[0].project[0].oci[a].otProject)
                }
                
                const flattenedArray = arrayOts.flat(1)
                const otherOtNumbers = flattenedArray.map(ot => ot.otNumber);
                                
                if (otherOtNumbers.includes(otNumberInput)) {
                    const err = new Error (`Ya existe una OT#${otNumberInput} en esta OCI o Numero de OT inválido!`)
                    err.dirNumber = 400
                    return next(err);
                }
            }

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
                otNumberValid,
                otKNumber,
                opNumber,
                statusOt,
                otDescription,
                otDesign,
                otSimulation,
                otSupplier,
                dataUserModificatorNotEmpty(userCreator)
            )
            
            await this.clients.updateClient(
                clientId, 
                cliente, 
                dataUserModificatorNotEmpty(userCreator)
            )

            const proyecto = await this.projects.selectProjectsByMainProjectId(id)
            if (!proyecto || !proyectoBuscado || !cliente) {
                catchError401_1(req, res, next)
            }

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('projectSelectedDetail', {
                proyecto,
                username,
                userInfo,
                expires,
                cliente,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    deleteOci = async (req, res, next) => {
        const id = req.params.id
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const expires = cookie(req)
        const ociKNumber = req.body.ociKNumberHidden
        
        try { 
            const proyecto = await this.projects.selectProjectByProjectId(id)
            if (!proyecto) {
                catchError401_1(req, res, next)
            }
            
            const clientId = proyecto[0].client[0]._id
            const clienteSeleccionado = await this.clients.selectClientById(clientId)
            if (!clienteSeleccionado) {
                catchError401(req, res, next)
            }
            
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            if (!userCreator) {
                catchError401_3(req, res, next)
            }
            
            await this.projects.deleteOci(
                id, 
                proyecto,
                ociKNumber,
                dataUserModificatorNotEmpty(userCreator)
            )
                                
            const cliente = await this.clients.updateClient(
                clientId, 
                clienteSeleccionado, 
                dataUserModificatorNotEmpty(userCreator)
            )

            const proyectos = await this.projects.getProjectsByClientId(clientId)
            if (!proyectos || !cliente) {
                catchError401_1(req, res, next)
            }

            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('clientProjectsDetails', {
                    username,
                    userInfo,
                    expires,
                    cliente,
                    proyectos,
                    data,
                    csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    deleteOt = async (req, res, next) => {
        const id = req.params.id
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
            if (!mainProyecto) {
                catchError401_1(req, res, next)
            }
            
            const clientId = mainProyecto[0].client[0]._id
            const clienteSeleccionado = await this.clients.selectClientById(clientId)
            if (!clienteSeleccionado) {
                catchError401(req, res, next)
            }

            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            if (!userCreator) {
                catchError401_3(req, res, next)
            }
            
            const ociKNumber = req.body.ociKNumberHidden
            const otKNumber = req.body.otKNumberHidden
        
            await this.projects.deleteOt(
                id, 
                mainProyecto,
                ociKNumber,
                otKNumber,
                dataUserModificatorNotEmpty(userCreator)
                )
             
            const cliente = await this.clients.updateClient(
                clientId, 
                clienteSeleccionado, 
                dataUserModificatorNotEmpty(userCreator)
            )

            const proyecto = await this.projects.selectProjectsByMainProjectId(id)
            if (!proyecto || !cliente) {
                catchError401_1(req, res, next)
            }

            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    expires,
                    cliente,
                    proyecto,
                    data,
                    csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    deleteProjectById = async (req, res, next) => {
        const id = req.params.id
        let username = res.locals.username
        const userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const proyecto = await this.projects.selectProjectByProjectId(id)
            
            const clientId = proyecto[0].client[0]._id
            const clienteSeleccionado = await this.clients.selectClientById(clientId)
            if (!clienteSeleccionado) {
                catchError401(req, res, next)
            }

            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            if (!userCreator) {
                catchError401_3(req, res, next)
            }
        
            const proyectos = await this.projects.deleteProjectById(
                id, 
                proyecto, 
                dataUserModificatorNotEmpty(userCreator)
            )
            
            const cliente = await this.clients.reduceClientProjectQty(
                clientId, 
                clienteSeleccionado, 
                dataUserModificatorNotEmpty(userCreator)
            )

            if (!proyecto || !proyectos || !cliente) {
                catchError401_1(req, res, next)
            }

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('clientProjectsDetails', {
                username,
                userInfo,
                expires,
                cliente,
                proyectos,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }
}

module.exports = { ProjectsController }