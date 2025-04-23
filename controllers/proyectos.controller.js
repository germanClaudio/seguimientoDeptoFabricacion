const ProyectosService = require("../services/projects.service.js"),
    ClientesService = require("../services/clients.service.js"),
    UserService = require("../services/users.service.js"),
    CartsService = require("../services/carts.service.js"),
    OrdersService = require("../services/orders.service.js"),
    
    csrf = require('csrf'),
    csrfTokens = csrf(),

    imageNotFound = "https://storage.googleapis.com/imagenesproyectosingenieria/upload/LogoClientImages/noImageFound.png",
    cookie = require('../utils/cookie.js'),

    { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty, dataUserOciOwnerEmpty } = require('../utils/generateUsers.js'),
    { uploadToGCS, uploadToGCSingleFile } = require("../utils/uploadFilesToGSC.js"),
    { uploadMulterMultiImages, uploadMulterSingleImageProject, uploadMulterSingleImageOci } = require("../utils/uploadMulter.js");

let data = require('../utils/variablesInicializator.js'),
    tieneNumeros = require('../utils/gotNumbers.js'),
    esStringUObjeto = require('../utils/isNumberOrObject.js')

const {catchError400,
    catchError400_1,
    catchError400_2,
    catchError400_3,
    catchError400_4,
    catchError400_5,
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
        this.carts = new CartsService()
        this.orders = new OrdersService()
    }

    getAllProjects = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const cliente = await this.clients.getAllClients()
            !cliente ? catchError401(req, res, next) : null

            const proyectos = await this.projects.getAllProjects()
            !proyectos ? catchError400(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('projectsList', {
                proyectos,
                cliente,
                username,
                userInfo,
                userCart,
                ordenes,
                expires,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getProjectsByClientId = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;

        if (id) {
            try {
                const usuario = await this.users.getUserByUsername(username)
                !usuario ? catchError401_3(req, res, next) : null
    
                const cliente = await this.clients.getClientById(id)
                !cliente ? catchError401(req, res, next) : null
    
                const proyectos = await this.projects.getProjectsByClientId(id)
                !proyectos ? catchError400(req, res, next) : null
    
                const ordenes = await this.orders.getAllOrders()
                !ordenes ? catchError400_5(req, res, next) : null
    
                const userCart = await this.carts.getCartByUserId(usuario._id)
                
                const csrfToken = csrfTokens.create(req.csrfSecret);
                setTimeout(() => {
                    return res.render('clientProjectsDetails', {
                        proyectos,
                        username,
                        userInfo,
                        userCart,
                        ordenes,
                        expires,
                        cliente,
                        data,
                        csrfToken
                    })
                }, 500)
    
            } catch (err) {
                catchError500(err, req, res, next)
            }
        }
    }

    selectProjectByClientId = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;

        if (id) {
            try {
                const usuario = await this.users.getUserByUsername(username)
                !usuario ? catchError401_3(req, res, next) : null

                const cliente = await this.clients.getClientById(id)
                !cliente ? catchError401(req, res, next) : null

                const proyectos = await this.projects.getProjectsByClientId(id)
                !proyectos ? catchError400(req, res, next) : null

                const ordenes = await this.orders.getAllOrders()
                !ordenes ? catchError400_5(req, res, next) : null

                const userCart = await this.carts.getCartByUserId(usuario._id)

                const csrfToken = csrfTokens.create(req.csrfSecret);
                setTimeout(() => {
                    return res.render('clientProjectsDetails', {
                        proyectosCargados,
                        username,
                        userInfo,
                        userCart,
                        ordenes,
                        expires,
                        cliente,
                        data,
                        csrfToken
                    })
                }, 500)

            } catch (err) {
                catchError500(err, req, res, next)
            }
        }
    }

    selectProjectById = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        if (id) {
            try {
                const usuario = await this.users.getUserByUsername(username)
                !usuario ? catchError401_3(req, res, next) : null
    
                const proyecto = await this.projects.selectProjectByProjectId(id)
                !proyecto ? catchError401_1(req, res, next) : null
    
                const idCliente = proyecto[0].client[0]._id
                const cliente = await this.clients.getClientByProjectId(idCliente)
                !cliente ? catchError401(req, res, next) : null
    
                const ordenes = await this.orders.getAllOrders()
                !ordenes ? catchError400_5(req, res, next) : null
    
                const userCart = await this.carts.getCartByUserId(usuario._id)
                
                const csrfToken = csrfTokens.create(req.csrfSecret);
                setTimeout(() => {
                    return res.render('projectSelectedDetail', {
                        proyecto,
                        username,
                        userInfo,
                        userCart,
                        ordenes,
                        expires,
                        cliente,
                        data,
                        csrfToken
                    })
                }, 100)
    
            } catch (err) {
                catchError500(err, req, res, next)
            }
        }
    }

    createNewProject = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        const expires = cookie(req)

        //------ Storage New User Image in Google Store --------
        uploadMulterMultiImages(req, res, async (err) => {
            try {
                // console.log('req.body: ', req.body)

                const userId = userInfo.id
                const userCreator = await this.users.getUserById(userId)
                if (!userCreator) catchError401_3(req, res, next)
                
                const clientId = req.params.id
                if (!clientId) catchError401_3(req, res, next)

                const clienteSeleccionado = await this.clients.selectClientById(clientId)
                if (!clienteSeleccionado) catchError401(req, res, next)
                
                if (req.files && req.files.length != 0) await uploadToGCSingleFile(req, res, next)
                
                let arrayOciNumber=[],
                    arrayOciDescription=[],
                    arrayOciAlias=[],
                    arrayOciPrio=[],
                    arrayOciStatus=[],
                    arrayOciImages=[]

                    const prefixes = [
                        { prefix: 'ociNumber', array: arrayOciNumber },
                        { prefix: 'ociDescription', array: arrayOciDescription },
                        { prefix: 'ociAlias', array: arrayOciAlias },
                        { prefix: 'ociPrio', array: arrayOciPrio },
                        { prefix: 'ociStatus', array: arrayOciStatus },
                        { prefix: 'imageOciFileName', array: arrayOciImages }
                    ];
                
                    for (const key in req.body) {
                        const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                        match ? match.array.push(req.body[key]) : null
                    }

                const ociKNumber = 0
                let invalidOciNumber = true, indexArrayOciNumber = 0
                for (let h=0; h<arrayOciNumber.length; h++) {
                    const ociNumberValid = await this.projects.selectOciByOciNumber(arrayOciNumber[h], ociKNumber)
                    // console.log('ociNumberValid: ', ociNumberValid)            
                    if (!ociNumberValid) {
                        let projects = await this.projects.getAllProjects()
                        for (let x=0; x<parseInt(projects.length); x++) {
                            const otherOciNumbers = projects[0].project[0].oci.map(oci => oci.ociNumber);
                            // console.log('otherOciNumbers ', otherOciNumbers)
                            if (otherOciNumbers.includes(parseInt(ociNumberValid))) {
                                invalidOciNumber = false
                                indexArrayOciNumber = h
                                break;
                            }
                        }
                    }
                }
                !invalidOciNumber ? catchError401(req, res, next) : null

                let arrayOciProjects = []
                const ociQuantity = parseInt(req.body.ociQuantity)

                if (!ociQuantity) {
                    catchError400_1(req, res, next)

                } else {
                    for(let i=0; i<ociQuantity; i++) {
                        let ociProject = {
                            ociNumber: parseInt(arrayOciNumber[i]),
                            ociDescription: arrayOciDescription[i],
                            ociAlias: arrayOciAlias[i],
                            ociPrio: arrayOciPrio[i],
                            ociStatus: arrayOciStatus[i] === 'on' ?  Boolean(true) : Boolean(false),
                            ociOwner: await dataUserOciOwnerEmpty(),
                            creator: await dataUserCreator(userCreator),
                            timestamp: new Date(),
                            ociImage: arrayOciImages[i] || imageNotFound,
                            modificator: await dataUserModificatorEmpty(),
                            modifiedOn: new Date(),
                            visible: true
                        }
                        arrayOciProjects.push(ociProject)
                    }
                }

                // console.log('arrayOciProjects: ', arrayOciProjects)
            
                const projectInput = req.body.projectName.trim();
                const projectCodeInput = req.body.codeProject.trim();
                const projectNameExist = await this.projects.getExistingProject(projectInput, projectCodeInput);
                projectNameExist ? catchError400_2(req, res, next) : null
                
                const selectFieldUNegocio = req.body.uNegocioProject || "matrices";
                const selectFieldLevel = req.body.levelProject || 'ganado';

                if (validateSelectField(selectFieldLevel) && validateSelectField(selectFieldUNegocio) ) {
                    
                    const project = {
                        projectName: projectInput,
                        statusProject: req.body.statusProject == 'on' ? Boolean(true) : Boolean(false),
                        levelProject: selectFieldLevel,
                        uNegocioProject: selectFieldUNegocio,
                        codeProject: projectCodeInput,
                        projectDescription: req.body.projectDescription.trim(),
                        prioProject: parseInt(req.body.prioProject),
                        imageProject: req.body.imageProject || imageNotFound,
                        visible: true,
                        creator: await dataUserCreator(userCreator),
                        timestamp: new Date(),
                        modificator: await dataUserModificatorEmpty(),
                        modifiedOn: new Date(),
                        oci: arrayOciProjects
                    }

                    const newProject = {
                        creator: await dataUserCreator(userCreator),
                        client: clienteSeleccionado,
                        project: project,
                        uNegocio: project.uNegocioProject,
                        timestamp: new Date(),
                        modificator: await dataUserModificatorEmpty(),
                        modifiedOn: new Date(),
                        visible: true
                    }
                    // console.log('newProject:', newProject)
                    
                    const newProjectCreated = await this.projects.createNewProject(newProject)
                    !newProjectCreated ? catchError401_1(req, res, next) : null

                    const cliente = await this.clients.updateClientProjectsQty(
                        clientId, 
                        clienteSeleccionado, 
                        await dataUserCreator(userCreator),
                        project.uNegocioProject
                    )

                    const proyectos = await this.projects.getProjectsByClientId(clientId)
                    !proyectos ? catchError401_1(req, res, next) : null

                    const ordenes = await this.orders.getAllOrders()
                    !ordenes ? catchError400_5(req, res, next) : null

                    const userCart = await this.carts.getCartByUserId(userId)

                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    setTimeout(() => {
                        return res.render('clientProjectsDetails', {
                            proyectos,
                            username,
                            userInfo,
                            userCart,
                            ordenes,
                            expires,
                            cliente,
                            data,
                            csrfToken
                        })
                    }, 400)

                } else {
                    catchError400_3(req, res, next)
                }
            
                function validateSelectField(value) {
                    const validOptions = [
                        'ganado', 'aRiesgo', 'paraCotizar', 'matrices', 'lineas'
                    ];
                    return validOptions.includes(value);
                }

            } catch (err) {
                catchError500(err, req, res, next)
            }
        })
    }

    getAllOciProjects = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const clientes = await this.clients.getAllClients()
            !clientes ? catchError401(req, res, next) : null
            
            const proyectos = await this.projects.getAllOciProjects()
            !proyectos ? catchError400(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            return res.render('nestableOciList', {
                username,
                userInfo,
                userCart, ordenes,
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
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;

        if (id) {
            try {
                const usuario = await this.users.getUserByUsername(username)
                !usuario ? catchError401_3(req, res, next) : null
    
                const clientId = req.body.clientIdHidden,
                    cliente = await this.clients.selectClientById(clientId)
                !cliente ? catchError401(req, res, next) : null
                
                const numberOci = parseInt(req.body.ociNumber),
                    ociNumberK = parseInt(req.body.ociNumberK),
                    projectId = id || req.body.projectIdHidden,
                    otQuantity = parseInt(req.body.otQuantity),
                    userId = userInfo.id,
                    userCreator = await this.users.getUserById(userId)
    
                !userCreator ? catchError401_3(req, res, next) : null
            
                let arrayOtNumber=[], arrayOpNumber=[],
                    arrayOpDescription=[], arrayOtStatus=[],
                    arrayOtDesign=[], arrayOtSimulation=[], arrayOtSupplier=[]
    
                const prefixes = [
                    { prefix: 'otNumber', array: arrayOtNumber },
                    { prefix: 'opNumber', array: arrayOpNumber },
                    { prefix: 'opDescription', array: arrayOpDescription },
                    { prefix: 'otStatus', array: arrayOtStatus },
                    { prefix: 'internoDiseno', array: arrayOtDesign },
                    { prefix: 'internoSimulacion', array: arrayOtSimulation },
                    { prefix: 'externoDiseno', array: arrayOtSupplier }
                ];
                // console.log('req.body: ', req.body)
                for (const key in req.body) {
                    const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                    match ? match.array.push(req.body[key]) : null
                }
    
                const otInformationEmpty = [{
                    otInfoR14: [], otInfoProceso: [],
                    otInfoDisenoPrimera: [], otInfoDisenoSegunda: [],
                    otInfoInfo80: [], otInfoInfo100: [],
                    otInfoSim0: [], otInfoSim1: [], otInfoSim2_3: [],
                    otInfoSim4Primera: [], otInfoSim4Segunda: [], otInfoSim5: []
                }]
    
                const arrayOtAddedToOci = []
                if (otQuantity>0) {
                    for(let i=0; i<otQuantity; i++) {
                        let otAddedToOci = {
                            otNumber: arrayOtNumber[i],
                            opNumber: arrayOpNumber[i],
                            opDescription: arrayOpDescription[i],
                            otStatus: arrayOtStatus[i] == 'on' ? true : false,
                            otDesign: arrayOtDesign[i],
                            otSimulation: arrayOtSimulation[i],
                            otSupplier: arrayOtSupplier[i],
                            creator: await dataUserCreator(userCreator),
                            timestamp: new Date(),
                            modificator: await dataUserModificatorEmpty(),
                            modifiedOn: "",
                            otInformation: otInformationEmpty,
                            otDetalles: []
                        }
                        arrayOtAddedToOci.push(otAddedToOci)
                    }
    
                } else {
                    catchError400_1(req, res, next)
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
                    await dataUserModificatorNotEmpty(userCreator)
                )
    
                const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
                !proyecto || !cliente ? catchError401_1(req, res, next) : null
    
                const ordenes = await this.orders.getAllOrders()
                !ordenes ? catchError400_5(req, res, next) : null
    
                const userCart = await this.carts.getCartByUserId(usuario._id)
    
                const csrfToken = csrfTokens.create(req.csrfSecret);
                setTimeout(() => {
                    return res.render('projectSelectedDetail', {
                        proyecto,
                        username,
                        userInfo,
                        userCart,
                        ordenes,
                        expires,
                        cliente,
                        data,
                        csrfToken
                    })
                }, 400)
    
            } catch (err) {
                catchError500(err, req, res, next)
            }
        }
    }

    updateStatusProject = async (req, res, next) => {
        const id = req.params.id,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;

        if (id) {
            try {
                const proyecto = await this.projects.selectProjectByProjectId(id)
                !proyecto ? catchError401_1(req, res, next) : null
    
                const clientId = proyecto[0].client[0]._id
                const cliente = await this.clients.selectClientById(clientId)
                !cliente ? catchError401(req, res, next) : null
    
                const userId = userInfo.id
                const userCreator = await this.users.getUserById(userId)
                !userCreator ? catchError401_3(req, res, next) : null
    
                const statusProjectHidden = req.body.statusProjectHidden
                if (validateSelectField(statusProjectHidden)) {
                    await this.projects.updateStatusProject(
                        id, 
                        proyecto, 
                        statusProjectHidden,
                        await dataUserModificatorNotEmpty(userCreator)
                    )
    
                    await this.clients.updateClient(
                        clientId, 
                        cliente, 
                        await dataUserModificatorNotEmpty(userCreator)
                    )
    
                    const proyectos = await this.projects.getProjectsByClientId(clientId)
                    !proyectos ? catchError401_1(req, res, next) : null
    
                    const ordenes = await this.orders.getAllOrders()
                    !ordenes ? catchError400_5(req, res, next) : null
    
                    const userCart = await this.carts.getCartByUserId(userId)
    
                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    setTimeout(() => {
                        return res.render('clientProjectsDetails', {
                            username,
                            userInfo,
                            userCart,
                            ordenes,
                            expires,
                            cliente,
                            proyectos,
                            data,
                            csrfToken
                        })
                    }, 400)
    
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
    }

    updateLevelProject = async (req, res, next) => {
        const id = req.params.id,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;

        if (id) {
            try {
                const proyecto = await this.projects.selectProjectByProjectId(id)
                !proyecto ? catchError401_1(req, res, next) : null
    
                const clientId = proyecto[0].client[0]._id
                const cliente = await this.clients.selectClientById(clientId)
                !cliente ? catchError401(req, res, next) : null
            
                const userId = userInfo.id
                const userCreator = await this.users.getUserById(userId)
                !userCreator ? catchError401_3(req, res, next) : null
            
                const levelProject = req.body.levelProject
                if (validateSelectField(levelProject)) {
                    await this.projects.updateLevelProject(
                        id, 
                        proyecto, 
                        levelProject,
                        await dataUserModificatorNotEmpty(userCreator)
                    )        
    
                    await this.clients.updateClient(
                        clientId, 
                        cliente, 
                        await dataUserModificatorNotEmpty(userCreator)
                    )
    
                    const proyectos = await this.projects.getProjectsByClientId(clientId)
                    !proyectos ? catchError401_1(req, res, next) : null
    
                    const ordenes = await this.orders.getAllOrders()
                    !ordenes ? catchError400_5(req, res, next) : null
    
                    const userCart = await this.carts.getCartByUserId(userId)
    
                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    setTimeout(() => {
                        return res.render('clientProjectsDetails', {
                            username,
                            userInfo,
                            userCart,
                            ordenes,
                            expires,
                            cliente,
                            proyectos,
                            csrfToken
                        })
                    }, 400)
    
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
    }

    updateStatusOci = async (req, res, next) => {
        const id = req.params.id,
            expires = cookie(req)            
        let username = res.locals.username,
            userInfo = res.locals.userInfo;
        
        if (id) {
            try {
                const proyecto = await this.projects.selectProjectByProjectId(id)
                !proyecto ? catchError401_1(req, res, next) : null
    
                const clientId = proyecto[0].client[0]._id
                const cliente = await this.clients.selectClientById(clientId)
                !cliente ? catchError401(req, res, next) : null
                
                const userId = userInfo.id
                const userCreator = await this.users.getUserById(userId)
                !userCreator ? catchError401_3(req, res, next) : null
                
                const ociKNumber = parseInt(req.body.ociKNumberHidden)
                const statusOciHidden = req.body.statusOciHidden
                if (validateSelectField(statusOciHidden)) {
                    await this.projects.updateStatusOci(
                        id, 
                        proyecto,
                        statusOciHidden,
                        ociKNumber,
                        await dataUserModificatorNotEmpty(userCreator)
                    )
    
                    await this.clients.updateClient(
                        clientId, 
                        cliente, 
                        await dataUserModificatorNotEmpty(userCreator)
                    )
    
                    const proyectos = await this.projects.getProjectsByClientId(clientId)
                    !proyectos ? catchError401_1(req, res, next) : null
    
                    const ordenes = await this.orders.getAllOrders()
                    !ordenes ? catchError400_5(req, res, next) : null
    
                    const userCart = await this.carts.getCartByUserId(userId)
                    
                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    setTimeout(() => {
                        return res.render('clientProjectsDetails', {
                            username,
                            userInfo,
                            userCart,
                            ordenes,
                            expires,
                            cliente,
                            proyectos,
                            data,
                            csrfToken
                        })
                    }, 400)
    
                } else {
                    catchError400_3(req, res, next)
                }
    
                function validateSelectField(value) {
                    const validOptions = [ 'true', 'false' ];
                    return validOptions.includes(value);
                }
    
            } catch (err) {
                catchError500(err, req, res, next)
            }
        }
    }

    updateStatusOt = async (req, res, next) => {
        const id = req.params.id,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;

        if (id) {
            try {
                const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
                !mainProyecto ? catchError401_1(req, res, next) : null          
                
                const clientId = mainProyecto[0].client[0]._id
                const cliente = await this.clients.selectClientById(clientId)
                !cliente ? hError401(req, res, next) : null
                
                const userId = userInfo.id
                const userCreator = await this.users.getUserById(userId)
                !userCreator ? hError401_3(req, res, next) : null         
                const ociKNumberHidden = parseInt(req.body.ociKNumberHidden)
                const otKNumberHidden = parseInt(req.body.otKNumberHidden)
            
                await this.projects.updateStatusOt(
                    id, 
                    mainProyecto,
                    statusOtHidden,
                    ociKNumberHidden,
                    otKNumberHidden,
                    await dataUserModificatorNotEmpty(userCreator)
                )
    
                await this.clients.updateClient(
                    clientId, 
                    cliente, 
                    await dataUserModificatorNotEmpty(userCreator)
                )
    
                const statusOtHidden = req.body.statusOtHidden
                if (validateSelectField(statusOtHidden)) {
                    const proyecto = await this.projects.selectProjectsByMainProjectId(id)
                    !proyecto ? catchError401_1(req, res, next) : null
    
                    const ordenes = await this.orders.getAllOrders()
                    !ordenes ? catchError400_5(req, res, next) : null
    
                    const userCart = await this.carts.getCartByUserId(userId)
                    
                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    setTimeout(() => {
                        return res.render('projectSelectedDetail', {
                            proyecto,
                            username,
                            userInfo,
                            userCart,
                            ordenes,
                            expires,
                            cliente,
                            data,
                            csrfToken
                        })
                    }, 400)
    
                } else {
                    catchError400_3(req, res, next)
                }
    
                function validateSelectField(value) {
                    const validOptions = [ 'true', 'false' ];
                    return validOptions.includes(value);
                }
    
            } catch (err) {
                catchError500(err, req, res, next)
            }
        }
    }

    addNewOciToProject = async (req, res, next) => {
        const id = req.params.id,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;

        if (id) {
            const csrfToken = req.csrfSecret;
            csrfTokens.verify(req.csrfSecret, csrfToken) ? catchError403(req, res, next) : null
            
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
    
            const proyecto = await this.projects.selectProjectByProjectId(id)
            !proyecto ? catchError401_4(req, res, next) : null
            const projectId = proyecto[0]._id
    
            const clientId = proyecto[0].client[0]._id
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
    
            uploadMulterMultiImages(req, res, async (err) => {
                try {
                    if (req.files && req.files.length != 0) await uploadToGCSingleFile(req, res, next)
                        
                    const ociQuantity = parseInt(req.body.ociQuantityModal)
                            
                    let arrayOciNumber=[],
                        arrayOciDescription=[],
                        arrayOciStatus=[],
                        arrayOciImages=[],
                        arrayOciAlias=[],
                        arrayOciPrio=[]
    
                    const prefixes = [
                        { prefix: 'ociNumber', array: arrayOciNumber },
                        { prefix: 'ociDescription', array: arrayOciDescription },
                        { prefix: 'ociStatus', array: arrayOciStatus },
                        { prefix: 'imageOciFileNameModal', array: arrayOciImages },
                        { prefix: 'ociAlias', array: arrayOciAlias },
                        { prefix: 'ociPrio', array: arrayOciPrio }
                    ];
                    
                    for (const key in req.body) {
                        const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                        if (match) {
                            if (key.startsWith('ociStatus')) {
                                match.array.push(req.body[key] === 'on' ? true : false)
                            } else if (key.startsWith('imageOciFileNameModal')) {
                                const keyValue = req.body[key] === '' ?  imageNotFound : (req.body[key]);
                                match.array.push(keyValue);
                            } else {
                                match.array.push(req.body[key]);
                            }    
                        }
                    }
    
                    const ociKNumber = 0
                    let invalidOciNumber = true, indexArrayOciNumber = 0
                    for (let h=0; h<arrayOciNumber.length; h++) {
                        const ociNumberValid = await this.projects.selectOciByOciNumber(arrayOciNumber[h], ociKNumber)
                        const otherOciNumbers = proyecto[0].project[0].oci.map(oci => oci.ociNumber);
                        if (otherOciNumbers.includes(parseInt(ociNumberValid))) {
                            invalidOciNumber = false
                            indexArrayOciNumber = h
                        }
                    }
                
                    if (!invalidOciNumber) {
                        const err = new Error (`Ya existe una OCI# ${arrayOciNumber[indexArrayOciNumber]} o Numero de OCI inválido!`)
                        err.dirNumber = 400
                        return next(err);
                    }
    
                    let arrayOciAddedToProject = []
                    for (let i=0; i<ociQuantity; i++ ) {
                        let infoOciAddedToProject = {
                            ociNumber: parseInt(arrayOciNumber[i]),
                            ociDescription: arrayOciDescription[i] || "sinDatos",
                            ociStatus: arrayOciStatus[i] || true,
                            ociImage: arrayOciImages[i],
                            ociAlias: arrayOciAlias[i] || "Sin Apodo",
                            ociPrio: arrayOciPrio[i],
                            ociOwner: await dataUserOciOwnerEmpty(),
                            timestamp: new Date(),
                            creator: await dataUserCreator(userCreator),
                            modificator: await dataUserModificatorEmpty(),
                            modifiedOn: new Date(),
                        }
                        arrayOciAddedToProject.push(infoOciAddedToProject)
                    }
                    
                    await this.clients.updateClient(
                        clientId, 
                        cliente, 
                        await dataUserModificatorNotEmpty(userCreator)
                    )
                        
                    await this.projects.addNewOciToProject(
                        projectId,
                        ociQuantity,
                        arrayOciAddedToProject
                    )
                    
                    const proyectos = await this.projects.getProjectsByClientId(clientId)
                    !proyectos ? catchError401_1(req, res, next) : null
    
                    const ordenes = await this.orders.getAllOrders()
                    !ordenes ? catchError400_5(req, res, next) : null
    
                    const userCart = await this.carts.getCartByUserId(userId)
    
                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    setTimeout(() => {
                        return res.render('clientProjectsDetails', {
                            username,
                            userInfo,
                            userCart,
                            ordenes,
                            expires,
                            cliente,
                            proyectos,
                            data,
                            csrfToken
                        })
                    }, 400)
                    
                } catch (err) {
                    catchError500(err, req, res, next)
                }
            })
        }
    }

    updateProject = async (req, res, next) => {
        const id = req.params.id,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;
        
        if (id) {
            //------ Storage Project Image in Google Store --------
            uploadMulterSingleImageProject(req, res, async (err) => {
                try{
                    req.file ? await uploadToGCS(req, res, next) : null
    
                    const proyecto = await this.projects.selectProjectByProjectId(id)
                    !proyecto ? catchError401_1(req, res, next) : null
                    
                    const clientId = proyecto[0].client[0]._id
                    const cliente = await this.clients.selectClientById(clientId)
                    !cliente ? catchError401(req, res, next) : null
                    
                    const userId = userInfo.id
                    const userCreator = await this.users.getUserById(userId)
                    !userCreator ? catchError401_3(req, res, next) : null

                    const selectFieldUNegocio = req.body.uNegocioProject;
                    const selectFieldLevel = req.body.levelProject;

                if (validateSelectField(selectFieldLevel) && validateSelectField(selectFieldUNegocio) ) {

                    const statusProject = req.body.statusProjectForm == 'on' ? Boolean(true) : Boolean(false),
                        projectName = req.body.projectName,
                        projectDescription = req.body.projectDescription.trim(),
                        prioProject = parseInt(req.body.prioProject) || 1,
                        levelProject = selectFieldLevel,
                        uNegocioProject = selectFieldUNegocio,
                        codeProject = req.body.codeProject,
                        imageProjectText = req.body.imageProjectFileName
                        
                        await this.projects.updateProject(
                            id,
                            proyecto,
                            statusProject,
                            projectName,
                            projectDescription,
                            prioProject,
                            uNegocioProject,
                            levelProject,
                            codeProject,
                            imageProjectText,
                            await dataUserModificatorNotEmpty(userCreator)
                        )
                
                    await this.clients.updateClient(
                        clientId,
                        cliente, 
                        await dataUserModificatorNotEmpty(userCreator)
                    )
    
                    const proyectos = await this.projects.getProjectsByClientId(clientId)
                    !proyectos ? catchError401_1(req, res, next) : null
    
                    const ordenes = await this.orders.getAllOrders()
                    !ordenes ? catchError400_5(req, res, next) : null
                    
                    const userCart = await this.carts.getCartByUserId(usuario._id)
    
                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    setTimeout(() => {
                        return res.render('clientProjectsDetails', {
                            username,
                            userInfo,
                            userCart,
                            ordenes,
                            expires,
                            cliente,
                            proyectos,
                            data,
                            csrfToken
                        })
                    }, 400)

                } else {
                    catchError400_3(req, res, next)
                }

                function validateSelectField(value) {
                    const validOptions = [
                        'ganado', 'aRiesgo', 'paraCotizar', 'matrices', 'lineas'
                    ];
                    return validOptions.includes(value);
                }
    
                } catch (err) {
                    catchError500(err, req, res, next)
                }
            })
        }
    }

    updateOci = async (req, res, next) => {
        const id = req.params.id,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;

        if (id) {
            try{
                uploadMulterSingleImageOci(req, res, async (err) => {
                    req.file ? uploadToGCS(req, res, next) : null
    
                    const proyecto = await this.projects.selectProjectByProjectId(id)
                    !proyecto ? catchError401_1(req, res, next) : null
                    
                    const clientId = proyecto[0].client[0]._id
                    const cliente = await this.clients.selectClientById(clientId)
                    !cliente ? catchError401(req, res, next) : null
            
                    const userId = userInfo.id
                    const userCreator = await this.users.getUserById(userId)
                    !userCreator ? catchError401_3(req, res, next) : null
    
                    const ociNumberInput = parseInt(req.body.numberOci),
                        numberOciHidden = parseInt(req.body.numberOciHidden),
                        ociKNumber = parseInt(req.body.ociKNumberHidden),
                        confirmationNumberOci = Boolean(req.body.confirmationNumberOci)
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
    
                    const statusOci = req.body.statusOciForm,
                        ociDescription = req.body.descriptionOci.trim(),
                        ociAlias = req.body.aliasOci.trim(),
                        ociPrio = parseInt(req.body.prioOci),
                        ociImageText = req.body.imageOciFileName
    
                    await this.projects.updateOci(
                        id,
                        proyecto,
                        statusOci,
                        ociDescription,
                        ociAlias,
                        ociPrio,
                        ociNumberValid,
                        ociKNumber,
                        ociImageText,
                        await dataUserModificatorNotEmpty(userCreator)
                    )
    
                    await this.clients.updateClient(
                        clientId, 
                        cliente, 
                        await dataUserModificatorNotEmpty(userCreator)
                    )
    
                    const proyectos = await this.projects.getProjectsByClientId(clientId)
                    !proyectos ? catchError401_2(req, res, next) : null
    
                    const ordenes = await this.orders.getAllOrders()
                    !ordenes ? catchError400_5(req, res, next) : null
    
                    const userCart = await this.carts.getCartByUserId(userId)
    
                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    setTimeout(() => {
                        return res.render('clientProjectsDetails', {
                            username,
                            userInfo,
                            userCart,
                            ordenes,
                            expires,
                            cliente,
                            proyectos,
                            data,
                            csrfToken
                        })
                    }, 400)
                })
    
            } catch (err) {
                catchError500(err, req, res, next)
            }
        }
    }

    updateOt = async (req, res, next) => {
        const id = req.params.id,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;

        if (id) {
            try {
                const proyectoBuscado = await this.projects.selectProjectsByMainProjectId(id)
                !proyectoBuscado ? catchError401_1(req, res, next) : null
                
                const clientId = proyectoBuscado[0].client[0]._id
                const cliente = await this.clients.selectClientById(clientId)
                !cliente ? catchError401(req, res, next) : null
                
                const userId = userInfo.id
                const userCreator = await this.users.getUserById(userId)
                !userCreator ? catchError401_3(req, res, next) : null
    
                const ociKNumber = parseInt(req.body.ociKNumberHidden),
                    otKNumber =  parseInt(req.body.otKNumberHidden),
                    numberOtHidden = parseInt(req.body.otNumberHidden),
                    otNumberInput = parseInt(req.body.numberOt),
                    confirmationNumberOt = Boolean(req.body.confirmationNumberOt)
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
                        err.statusCode = 400
                        return next(err);
                    }
                }
    
                const opNumber = parseInt(req.body.numeroOp),
                    statusOt = req.body.statusOtForm,
                    otDescription = req.body.descriptionOt,
                    otDesign = req.body.designOt,
                    otSimulation = req.body.simulationOt,
                    otSupplier = req.body.supplierOt
    
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
                    await dataUserModificatorNotEmpty(userCreator)
                )
                
                await this.clients.updateClient(
                    clientId, 
                    cliente, 
                    await dataUserModificatorNotEmpty(userCreator)
                )
    
                const proyecto = await this.projects.selectProjectsByMainProjectId(id)
                !proyecto ? catchError401_1(req, res, next) : null
    
                const ordenes = await this.orders.getAllOrders()
                !ordenes ? catchError400_5(req, res, next) : null
    
                const userCart = await this.carts.getCartByUserId(userId)
    
                const csrfToken = csrfTokens.create(req.csrfSecret);
                setTimeout(() => {
                    res.render('projectSelectedDetail', {
                        proyecto,
                        username,
                        userInfo,
                        userCart,
                        ordenes,
                        expires,
                        cliente,
                        data,
                        csrfToken
                    })
                }, 400)
    
            } catch (err) {
                catchError500(err, req, res, next)
            }
        }
    }

    deleteOci = async (req, res, next) => {
        const id = req.params.id,
            expires = cookie(req),
            ociKNumber = parseInt(req.body.ociKNumberHidden)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        if (id) {
            try { 
                const proyecto = await this.projects.selectProjectByProjectId(id)
                !proyecto ? catchError401_1(req, res, next) : null
                
                const clientId = proyecto[0].client[0]._id
                const clienteSeleccionado = await this.clients.selectClientById(clientId)
                !clienteSeleccionado ? catchError401(req, res, next) : null
                
                const userId = userInfo.id
                const userCreator = await this.users.getUserById(userId)
                !userCreator ? catchError401_3(req, res, next) : null
                
                await this.projects.deleteOci(
                    id, 
                    proyecto,
                    ociKNumber,
                    await dataUserModificatorNotEmpty(userCreator)
                )
                
                const cliente = await this.clients.updateClient(
                    clientId, 
                    clienteSeleccionado, 
                    await dataUserModificatorNotEmpty(userCreator)
                )
                !cliente ? catchError401_1(req, res, next) : null
    
                const proyectos = await this.projects.getProjectsByClientId(clientId)
                !proyectos ? catchError401_1(req, res, next) : null
    
                const ordenes = await this.orders.getAllOrders()
                !ordenes ? catchError400_5(req, res, next) : null
    
                const userCart = await this.carts.getCartByUserId(userId)
    
                const csrfToken = csrfTokens.create(req.csrfSecret);
                setTimeout(() => {
                    return res.render('clientProjectsDetails', {
                            username,
                            userInfo,
                            userCart,
                            ordenes,
                            expires,
                            cliente,
                            proyectos,
                            data,
                            csrfToken
                    })
                }, 400)
    
            } catch (err) {
                catchError500(err, req, res, next)
            }
        }
    }

    deleteOt = async (req, res, next) => {
        const id = req.params.id,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;

        if (id) {
            try {
                const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
                !mainProyecto ? catchError401_1(req, res, next) : null
                
                const clientId = mainProyecto[0].client[0]._id
                const clienteSeleccionado = await this.clients.selectClientById(clientId)
                !clienteSeleccionado ? catchError401(req, res, next) : null
    
                const userId = userInfo.id
                const userCreator = await this.users.getUserById(userId)
                !userCreator ? catchError401_3(req, res, next) : null
                
                const ociKNumber = parseInt(req.body.ociKNumberHidden),
                    otKNumber = parseInt(req.body.otKNumberHidden)
            
                await this.projects.deleteOt(
                    id, 
                    mainProyecto,
                    ociKNumber,
                    otKNumber,
                    await dataUserModificatorNotEmpty(userCreator)
                )
                
                const cliente = await this.clients.updateClient(
                    clientId, 
                    clienteSeleccionado, 
                    await dataUserModificatorNotEmpty(userCreator)
                )
                !cliente ? catchError401_1(req, res, next) : null
    
                const proyecto = await this.projects.selectProjectsByMainProjectId(id)
                !proyecto ? catchError401_1(req, res, next) : null
    
                const ordenes = await this.orders.getAllOrders()
                !ordenes ? catchError400_5(req, res, next) : null
    
                const userCart = await this.carts.getCartByUserId(userId)
    
                const csrfToken = csrfTokens.create(req.csrfSecret);
                setTimeout(() => {
                    return res.render('projectSelectedDetail', {
                            username,
                            userInfo,
                            userCart,
                            ordenes,
                            expires,
                            cliente,
                            proyecto,
                            data,
                            csrfToken
                    })
                }, 400)
    
            } catch (err) {
                catchError500(err, req, res, next)
            }
        }
    }

    deleteProjectById = async (req, res, next) => {
        const id = req.params.id,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;

        if (id) {
            try {
                const proyecto = await this.projects.selectProjectByProjectId(id)
                !proyecto ? catchError401_1(req, res, next) : null
                const clientId = proyecto[0].client[0]._id
                const clienteSeleccionado = await this.clients.selectClientById(clientId)
                !clienteSeleccionado ? catchError401(req, res, next) : null
    
                const userId = userInfo.id
                const userCreator = await this.users.getUserById(userId)
                !userCreator ? catchError401_3(req, res, next) : null
            
                const proyectos = await this.projects.deleteProjectById(
                    id, 
                    proyecto, 
                    await dataUserModificatorNotEmpty(userCreator)
                )
                !proyectos ? catchError401_1(req, res, next) : null
                
                const cliente = await this.clients.reduceClientProjectQty(
                    clientId, 
                    clienteSeleccionado, 
                    await dataUserModificatorNotEmpty(userCreator)
                )
                !cliente ? catchError401_1(req, res, next) : null
    
                const ordenes = await this.orders.getAllOrders()
                !ordenes ? catchError400_5(req, res, next) : null
    
                const userCart = await this.carts.getCartByUserId(userId)
    
                const csrfToken = csrfTokens.create(req.csrfSecret);
                setTimeout(() => {
                    res.render('clientProjectsDetails', {
                        username,
                        userInfo,
                        userCart,
                        ordenes,
                        expires,
                        cliente,
                        proyectos,
                        data,
                        csrfToken
                    })
                }, 400)
    
            } catch (err) {
                catchError500(err, req, res, next)
            }
        }
    }

    //-------------------------------------------------------------
    addInfoR14ToOtProject = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayProcesoR14=[], arrayRevisionProcesoR14=[],
                arrayAprobadoR14=[], arrayRevisionAprobadoR14=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'procesoR14Hidden', array: arrayProcesoR14 },
                { prefix: 'revisionProcesoR14', array: arrayRevisionProcesoR14 },
                { prefix: 'aprobadoR14Hidden', array: arrayAprobadoR14 },
                { prefix: 'revisionAprobadoR14', array: arrayRevisionAprobadoR14 },
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = []
            for (let i=0; i<otQuantity; i++ ) {
                let infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    procesoR14: arrayProcesoR14[i] || "sinDato",
                    revisionProcesoR14: parseInt(arrayRevisionProcesoR14[i]) || 0,
                    aprobadoR14: arrayAprobadoR14[i] || "sinDato",
                    revisionAprobadoR14: parseInt(arrayRevisionAprobadoR14[i]) || 0,
                    timestamp: new Date(),
                    creator: await dataUserCreator(userCreator),
                    modificator: await dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.projects.addInfoR14ToOtProject(
                projectId,
                otQuantity,
                ociNumberK,
                arrayOtNumberK,
                arrayInfoAddedToOt
            )
            !itemUpdated ? catchError400_3(req, res, next) : null

            proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)
            
            data.slide = 0
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                return res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    cliente,
                    proyecto,
                    data,
                    csrfToken
                })
            }, 500)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoProceso3dToOtProject = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null

            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null

            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number)

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayProceso3d=[], arrayRevisionProceso3d=[],
                arrayHorasProceso3d=[], arrayRevisionHorasProceso3d=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'proceso3dHidden', array: arrayProceso3d },
                { prefix: 'revisionProceso3d', array: arrayRevisionProceso3d },
                { prefix: 'horasProceso3d', array: arrayHorasProceso3d },
                { prefix: 'revisionHorasProceso3d', array: arrayRevisionHorasProceso3d },
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }

            let arrayInfoAddedToOt = []
            for (let i=0; i<otQuantity; i++ ) {
                let infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    proceso3d: arrayProceso3d[i] || "sinDato",
                    revisionProceso3d: parseInt(arrayRevisionProceso3d[i]) || 0,
                    horasProceso3d: parseInt(arrayHorasProceso3d[i]) || 0,
                    revisionHorasProceso3d: parseInt(arrayRevisionHorasProceso3d[i]) || 0,
                    timestamp: new Date(),
                    creator: await dataUserCreator(userCreator),
                    modificator: await dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            
            const itemUpdated = await this.projects.addInfoProceso3dToOtProject(
                projectId,
                otQuantity,
                ociNumberK,
                arrayOtNumberK,
                arrayInfoAddedToOt
            )
            !itemUpdated ? catchError400_3(req, res, next) : null

            proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)

            data.slide = 1
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                return res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    cliente,
                    proyecto,
                    data,
                    csrfToken
                })
            }, 500)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoDisenoPrimeraToOtProject = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
        
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null
        
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null

            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number)

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayAvDiseno=[], arrayRevisionAvDiseno=[],
                arrayAv50Diseno=[], arrayRevisionAv50Diseno=[],
                arrayAv80Diseno=[], arrayRevisionAv80Diseno=[],
                arrayEnvioCliente=[], arrayRevisionEnvioCliente=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'avDisenoHidden', array: arrayAvDiseno },
                { prefix: 'revisionAvDiseno', array: arrayRevisionAvDiseno },
                { prefix: 'av50DisenoHidden', array: arrayAv50Diseno },
                { prefix: 'revisionAv50Diseno', array: arrayRevisionAv50Diseno },
                { prefix: 'av80DisenoHidden', array: arrayAv80Diseno },
                { prefix: 'revisionAv80Diseno', array: arrayRevisionAv80Diseno },
                { prefix: 'envioClienteHidden', array: arrayEnvioCliente },
                { prefix: 'revisionEnvioCliente', array: arrayRevisionEnvioCliente }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }

            let arrayInfoAddedToOt = []
            for (let i=0; i<otQuantity; i++ ) {
                let infoAddedToOt = {
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
                    timestamp: new Date(),
                    creator: await dataUserCreator(userCreator),
                    modificator: await dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            
            const itemUpdated = await this.projects.addInfoDisenoPrimeraToOtProject(
                projectId,
                otQuantity,
                ociNumberK,
                arrayOtNumberK,
                arrayInfoAddedToOt
            )
            !itemUpdated ? catchError400_3(req, res, next) : null

            proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)
            
            data.slide = 2
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    cliente,
                    proyecto,
                    data,
                    csrfToken
                })
            }, 500)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoDisenoSegundaToOtProject = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null
            
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null

            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number)

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayAv100Diseno=[], arrayRevisionAv100Diseno=[],
                arrayRevisionCliente=[], arrayRevisionRevisionCliente=[],
                arrayLdmProvisoria=[], arrayRevisionLdmProvisoria=[],
                arrayAprobadoCliente=[], arrayRevisionAprobadoCliente=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'av100DisenoHidden', array: arrayAv100Diseno },
                { prefix: 'revisionAv100Diseno', array: arrayRevisionAv100Diseno },
                { prefix: 'revisionClienteHidden', array: arrayRevisionCliente },
                { prefix: 'revisionRevisionCliente', array: arrayRevisionRevisionCliente },
                { prefix: 'ldmProvisoriaHidden', array: arrayLdmProvisoria },
                { prefix: 'revisionLdmProvisoria', array: arrayRevisionLdmProvisoria },
                { prefix: 'aprobadoClienteHidden', array: arrayAprobadoCliente },
                { prefix: 'revisionAprobadoCliente', array: arrayRevisionAprobadoCliente }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = []
            for (let i=0; i<otQuantity; i++ ) {
                let infoAddedToOt = {
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
                    timestamp: new Date(),
                    creator: await dataUserCreator(userCreator),
                    modificator: await dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }

            const itemUpdated = await this.projects.addInfoDisenoSegundaToOtProject(
                projectId,
                otQuantity,
                ociNumberK,
                arrayOtNumberK,
                arrayInfoAddedToOt
            )
            !itemUpdated ? catchError400_3(req, res, next) : null

            proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)
            
            data.slide = 3
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    cliente,
                    proyecto,
                    data,
                    csrfToken
                })
            }, 500)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfo80ToOtProject = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
        
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null
            
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null

            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number)

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayLdmAvanceCG=[], arrayRevisionLdmAvanceCG=[],
                arrayLdmAvanceTD2=[], arrayRevisionLdmAvanceTD2=[],
                arrayLdm80=[], arrayRevisionLdm80=[],
                arrayInfoModelo=[], arrayRevisionInfoModelo=[]
                        
            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'ldmAvanceCGHidden', array: arrayLdmAvanceCG },
                { prefix: 'revisionLdmAvanceCG', array: arrayRevisionLdmAvanceCG },
                { prefix: 'ldmAvanceTD2Hidden', array: arrayLdmAvanceTD2 },
                { prefix: 'revisionLdmAvance2TD', array: arrayRevisionLdmAvanceTD2 },
                { prefix: 'ldm80Hidden', array: arrayLdm80 },
                { prefix: 'revision80Ldm', array: arrayRevisionLdm80 },
                { prefix: 'infoModeloHidden', array: arrayInfoModelo },
                { prefix: 'revisionInfoModelo', array: arrayRevisionInfoModelo }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }    

            let arrayInfoAddedToOt = []
            for (let i=0; i<otQuantity; i++ ) {
                let infoAddedToOt = {
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
                    timestamp: new Date(),
                    creator: await dataUserCreator(userCreator),
                    modificator: await dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log('arrayInfoAddedToOt: ', arrayInfoAddedToOt)

            const itemUpdated = await this.projects.addInfo80ToOtProject(
                projectId,
                otQuantity,
                ociNumberK,
                arrayOtNumberK,
                arrayInfoAddedToOt
            )
            !itemUpdated ? catchError400_3(req, res, next) : null

            proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)

            data.slide = 4  
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    cliente,
                    proyecto,
                    data,
                    csrfToken
                })
            }, 500)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfo100ToOtProject = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try{
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
        
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null
        
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null

            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number)

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayLdm100=[], arrayRevisionLdm100=[],
                arrayInfo100=[], arrayRevisionInfo100=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: '100ldmHidden', array: arrayLdm100 },
                { prefix: '100revisionLdm', array: arrayRevisionLdm100 },
                { prefix: '100infoHidden', array: arrayInfo100 },
                { prefix: '100revisionInfo', array: arrayRevisionInfo100 }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }    

            let arrayInfoAddedToOt = []
            for (let i=0; i<otQuantity; i++ ) {
                let infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    ldm100: parseInt(arrayLdm100[i]) || 0,
                    revisionLdm100: parseInt(arrayRevisionLdm100[i]) || 0,
                    info100: parseInt(arrayInfo100[i]) || 0,
                    revisionInfo100: parseInt(arrayRevisionInfo100[i]) || 0,
                    timestamp: new Date(),
                    creator: await dataUserCreator(userCreator),
                    modificator: await dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
        
            const itemUpdated = await this.projects.addInfo100ToOtProject(
                projectId,
                otQuantity,
                ociNumberK,
                arrayOtNumberK,
                arrayInfoAddedToOt
            )
            !itemUpdated ? catchError400_3(req, res, next) : null

            proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)
            
            data.slide = 5
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    cliente,
                    proyecto,
                    data,
                    csrfToken
                })
            }, 500)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoSim0ToOtProject = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try{
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
        
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null
        
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null

            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number)

            let arrayOtNumber=[], arrayOtStatus=[],
                arraySim0=[], arrayRevisionSim0=[],
                arrayDocuSim0=[], arrayRevisionDocuSim0=[]
            
            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: '0SimHidden', array: arraySim0 },
                { prefix: 'revision0Sim', array: arrayRevisionSim0 },
                { prefix: 'docu0SimHidden', array: arrayDocuSim0 },
                { prefix: 'revisionDocu0Sim', array: arrayRevisionDocuSim0 }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }    
        
            let arrayInfoAddedToOt = []
            for (let i=0; i<otQuantity; i++ ) {
                let infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    sim0: arraySim0[i] || "sinDato",
                    revisionSim0: parseInt(arrayRevisionSim0[i]) || 0,
                    docuSim0: arrayDocuSim0[i] || "sinDato",
                    revisionDocuSim0: parseInt(arrayRevisionDocuSim0[i]) || 0,
                    timestamp: new Date(),
                    creator: await dataUserCreator(userCreator),
                    modificator: await dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log('arrayInfoAddedToOt: ', arrayInfoAddedToOt)
        
            const itemUpdated = await this.projects.addInfoSim0ToOtProject(
                projectId,
                otQuantity,
                ociNumberK,
                arrayOtNumberK,
                arrayInfoAddedToOt
            )
            !itemUpdated ? catchError400_3(req, res, next) : null

            proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)
        
            data.slide = 6
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    cliente,
                    proyecto,
                    data,
                    csrfToken
                })
            }, 500)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoSim1ToOtProject = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try{
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
        
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null
        
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null

            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number)

            let arrayOtNumber=[], arrayOtStatus=[],
                arraySim1=[], arrayRevisionSim1=[],
                arrayVideo=[], arrayRevisionVideo=[],
                arrayInforme=[], arrayRevisionInforme=[],
                arrayPpt=[], arrayRevisionPpt=[],
                arrayS1pOp20=[], arrayRevisionS1pOp20=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: '1SimHidden', array: arraySim1 },
                { prefix: 'revision1Sim', array: arrayRevisionSim1 },
                { prefix: 'videoHidden', array: arrayVideo },
                { prefix: 'revisionVideo', array: arrayRevisionVideo },
                { prefix: 'informeHidden', array: arrayInforme },
                { prefix: 'revisionInforme', array: arrayRevisionInforme },
                { prefix: 'pptHidden', array: arrayPpt },
                { prefix: 'revisionPpt', array: arrayRevisionPpt },
                { prefix: 's1pOp20Hidden', array: arrayS1pOp20 },
                { prefix: 'revisionS1p20Op', array: arrayRevisionS1pOp20 }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }

            let arrayInfoAddedToOt = []
            for (let i=0; i<otQuantity; i++ ) {
                let infoAddedToOt = {
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
                    timestamp: new Date(),
                    creator: await dataUserCreator(userCreator),
                    modificator: await dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log('arrayInfoAddedToOt: ', arrayInfoAddedToOt)
        
            const itemUpdated = await this.projects.addInfoSim1ToOtProject(
                projectId,
                otQuantity,
                ociNumberK,
                arrayOtNumberK,
                arrayInfoAddedToOt
            )
            !itemUpdated ? catchError400_3(req, res, next) : null

            proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)
        
            data.slide = 7
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    cliente,
                    proyecto,
                    data,
                    csrfToken
                })
            }, 500)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoSim2_3ToOtProject = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
        
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null
            
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null

            const ociNumberK = req.body.ociNumberK,
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number)

            let arrayOtNumber=[], arrayOtStatus=[],
                arraySim2=[], arrayRevisionSim2=[],
                arrayReporte=[], arrayRevisionReporte=[],
                arrayDfnProdismo=[], arrayRevisionDfnProdismo=[],
                arraySim3=[], arrayRevisionSim3=[]
        
            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: '2SimHidden', array: arraySim2 },
                { prefix: 'revision2Sim', array: arrayRevisionSim2 },
                { prefix: 'reporteHidden', array: arrayReporte },
                { prefix: 'revisionReporte', array: arrayRevisionReporte },
                { prefix: 'dfnProdismoHidden', array: arrayDfnProdismo },
                { prefix: 'revisionDfnProdismo', array: arrayRevisionDfnProdismo },
                { prefix: '3SimHidden', array: arraySim3 },
                { prefix: 'revisionSim3', array: arrayRevisionSim3 }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }

            let arrayInfoAddedToOt = []
            for (let i=0; i<otQuantity; i++ ) {
                let infoAddedToOt = {
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
                    timestamp: new Date(),
                    creator: await dataUserCreator(userCreator),
                    modificator: await dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log('arrayInfoAddedToOt: ', arrayInfoAddedToOt)
        
            const itemUpdated = await this.projects.addInfoSim2_3ToOtProject(
                projectId,
                otQuantity,
                ociNumberK,
                arrayOtNumberK,
                arrayInfoAddedToOt
            )
            !itemUpdated ? catchError400_3(req, res, next) : null

            proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)

            data.slide = 8
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    cliente,
                    proyecto,
                    data,
                    csrfToken
                })
            }, 500)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoSim4PrimeraToOtProject = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try{
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
        
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null
            
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = req.body.ociNumberK,
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number)

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayMatEnsayo=[], arrayRevisionMatEnsayo=[],
                arrayMasMenos10=[], arrayRevisionMasMenos10=[],
                arrayMpAlternativo=[], arrayRevisionMpAlternativo=[],
                arrayReunionSim=[], arrayRevisionReunionSim=[]
            
            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'matEnsayoHidden', array: arrayMatEnsayo },
                { prefix: 'revisionMatEnsayo', array: arrayRevisionMatEnsayo },
                { prefix: 'masMenos10Hidden', array: arrayMasMenos10 },
                { prefix: 'revisionMas10Menos', array: arrayRevisionMasMenos10 },
                { prefix: 'mpAlternativoHidden', array: arrayMpAlternativo },
                { prefix: 'revisionMpAlternativo', array: arrayRevisionMpAlternativo },
                { prefix: 'reunionSimHidden', array: arrayReunionSim },
                { prefix: 'revisionReunionSim', array: arrayRevisionReunionSim }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }

            let arrayInfoAddedToOt = []
            for (let i=0; i<otQuantity; i++ ) {
                let infoAddedToOt = {
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
                    timestamp: new Date(),
                    creator: await dataUserCreator(userCreator),
                    modificator: await dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log('arrayInfoAddedToOt: ', arrayInfoAddedToOt)
            
            const itemUpdated = await this.projects.addInfoSim4PrimeraToOtProject(
                projectId,
                otQuantity,
                ociNumberK,
                arrayOtNumberK,
                arrayInfoAddedToOt
            )
            !itemUpdated ? catchError400_3(req, res, next) : null

            proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)
        
            data.slide = 9
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    cliente,
                    proyecto,
                    data,
                    csrfToken
                })
            }, 500)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoSim4SegundaToOtProject = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
        
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null
        
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null

            const ociNumberK = req.body.ociNumberK,
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number)

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayInformeSim4=[], arrayRevisionInformeSim4=[],
                arrayGeoCopiado1=[], arrayRevisionGeoCopiado1=[],
                arrayGeoCopiado2=[], arrayRevisionGeoCopiado2=[],
                arrayHorasSim=[], arrayRevisionHorasSim=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'informe4SimHidden', array: arrayInformeSim4 },
                { prefix: 'revisionInforme4Sim', array: arrayRevisionInformeSim4 },
                { prefix: 'geo1CopiadoHidden', array: arrayGeoCopiado1 },
                { prefix: 'revisionGeo1Copiado', array: arrayRevisionGeoCopiado1 },
                { prefix: 'geo2CopiadoHidden', array: arrayGeoCopiado2 },
                { prefix: 'revisionGeo2Copiado', array: arrayRevisionGeoCopiado2 },
                { prefix: 'horasSim', array: arrayHorasSim },
                { prefix: 'revisionHorasSim', array: arrayRevisionHorasSim }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }

            let arrayInfoAddedToOt = []
            for (let i=0; i<otQuantity; i++ ) {
                let infoAddedToOt = {
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
                    timestamp: new Date(),
                    creator: await dataUserCreator(userCreator),
                    modificator: await dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log('arrayInfoAddedToOt: ', arrayInfoAddedToOt)
        
            const itemUpdated = await this.projects.addInfoSim4SegundaToOtProject(
                projectId,
                otQuantity,
                ociNumberK,
                arrayOtNumberK,
                arrayInfoAddedToOt
            )
            !itemUpdated ? catchError400_3(req, res, next) : null

            proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)
        
            data.slide = 10
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    cliente,
                    proyecto,
                    data,
                    csrfToken
                })
            }, 500)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    addInfoSim5ToOtProject = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
        
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null
            
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null

            const ociNumberK = req.body.ociNumberK,
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number)

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayGrillado=[], arrayRevisionGrillado=[],
                arrayMpEnsayada=[], arrayRevisionMpEnsayada=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'grilladoHidden', array: arrayGrillado },
                { prefix: 'revisionGrillado', array: arrayRevisionGrillado },
                { prefix: 'mpEnsayadaHidden', array: arrayMpEnsayada },
                { prefix: 'revisionMpEnsayada', array: arrayRevisionMpEnsayada }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }

            let arrayInfoAddedToOt = []
            for (let i=0; i<otQuantity; i++ ) {
                let infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    grillado: arrayGrillado[i] || "sinDato",
                    revisionGrillado: parseInt(arrayRevisionGrillado[i]) || 0,
                    mpEnsayada: arrayMpEnsayada[i] || "sinDato",
                    revisionMpEnsayada: parseInt(arrayRevisionMpEnsayada[i]) || 0,
                    timestamp: new Date(),
                    creator: await dataUserCreator(userCreator),
                    modificator: await dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log('arrayInfoAddedToOt: ', arrayInfoAddedToOt)
            
            const itemUpdated = await this.projects.addInfoSim5ToOtProject(
                projectId,
                otQuantity,
                ociNumberK,
                arrayOtNumberK,
                arrayInfoAddedToOt
            )
            !itemUpdated ? catchError400_3(req, res, next) : null

            proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_4(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)
        
            data.slide = 11
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                res.render('projectSelectedDetail', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    cliente,
                    proyecto,
                    data,
                    csrfToken
                })
            }, 500)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }
    //------------------------------------------------------------------
}

module.exports = { ProjectsController }