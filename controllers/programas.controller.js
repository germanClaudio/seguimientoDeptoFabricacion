const ProyectosService = require("../services/projects.service.js")
const ClientesService = require("../services/clients.service.js")
const UserService = require("../services/users.service.js")
const ProgramasService = require("../services/programms.service.js")

const { uploadToGCS, uploadToGCSingleFile } = require("../utils/uploadFilesToGSC.js")
const { uploadMulterMultiImages, uploadMulterSingleImageProject, uploadMulterSingleImageOci } = require("../utils/uploadMulter.js")

const multer = require('multer')

let now = require('../utils/formatDate.js')
const csrf = require('csrf');
const csrfTokens = csrf();

let imageNotFound = "../../../src/images/upload/LogoClientImages/noImageFound.png"
const cookie = require('../utils/cookie.js')

let data = require('../utils/variablesInicializator.js')

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

class ProgramationController {
    constructor() {
        this.projects = new ProyectosService()
        this.clients = new ClientesService()
        this.users = new UserService()
        this.programms = new ProgramasService()
    }

    getAllProjectsWon = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            let cliente = await this.clients.getClientById()
            if (!cliente) {
                catchError401(req, res, next)
            }

            const proyectos = await this.programms.getAllProjectsWon()
            if (!proyectos) {
                catchError400(req, res, next)
            } 
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('projectsWonList', {
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
            res.render('clientProjectsDetails', {
                proyectos,
                username,
                userInfo,
                expires,
                cliente,
                data,
                csrfToken
            })

        } catch (error) {
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
            res.render('clientProjectsDetails', {
                proyectos,
                username,
                userInfo,
                expires,
                cliente,
                csrfToken
            })

        } catch (error) {
            catchError500(err, req, res, next)
        }
    }

    selectProjectById = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const proyecto = await this.programms.selectProjectByProjectId(id)
            if (!proyecto) {
                catchError400(req, res, next)
            } 

            const idCliente = proyecto[0].client[0]._id
            const cliente = await this.clients.getClientByProjectId(idCliente)
            if (!cliente ) {
                catchError401(req, res, next)
            }

            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                res.render('projectWonSelectedDetail', {
                    proyecto,
                    username,
                    userInfo,
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

    getAllOciProjects = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            let clientes = await this.clients.getAllClients()
            if (!clientes ) {
                catchError401(req, res, next) 
            }

            const proyectos = await this.projects.getAllOciProjects()
            if (!proyectos) {
                catchError400(req, res, next)
            } 
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('nestableOciList', {
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
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)
            if (!cliente) {
                catchError401(req, res, next)
            } 

            const numberOci = parseInt(req.body.ociNumber)
            const ociNumberK = parseInt(req.body.ociNumberK)
            
            const projectId = id || req.body.projectIdHidden
            const otQuantity = parseInt(req.body.otQuantity)

            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            if (!userCreator.visible) {
                catchError401_3(req, res, next)
            }

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
                arrayOpNumber=[],
                arrayOpDescription=[],
                arrayOtStatus=[],
                arrayOtDesign=[],
                arrayOtSimulation=[],
                arrayOtSupplier=[]

            const prefixes = [
                { prefix: 'otNumber', array: arrayOtNumber },
                { prefix: 'opNumber', array: arrayOpNumber },
                { prefix: 'opDescription', array: arrayOpDescription },
                { prefix: 'otStatus', array: arrayOtStatus },
                { prefix: 'internoDiseno', array: arrayOtDesign },
                { prefix: 'internoSimulacion', array: arrayOtSimulation },
                { prefix: 'externoDiseno', array: arrayOtSupplier }
            ];
        
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                if (match) {
                    match.array.push(req.body[key]);
                    break;
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

            const otDetallesEmpty = [{
                otDistribution: [],
                otProgramacionPrimera: [],
                otProgramacionSegunda: [],
                otMecanizadoPrimera: [],
                otMecanizadoSegunda: []
            }]

            var arrayOtAddedToOci = []
            for(let i=0; i<otQuantity; i++) {
                var otAddedToOci = {
                    otNumber: arrayOtNumber[i],
                    opNumber: arrayOpNumber[i],
                    opDescription: arrayOpDescription[i],
                    otStatus: arrayOtStatus[i] == 'on' ? Boolean(true) : Boolean(false),
                    otDesign: arrayOtDesign[i],
                    otSimulation: arrayOtSimulation[i],
                    otSupplier: arrayOtSupplier[i],
                    creator: user,
                    timestamp: now,
                    modificator: modificator,
                    modifiedOn: "",
                    otInformation: otInformationEmpty,
                    otDetalles: otDetallesEmpty
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

            const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            if (proyecto) {
                catchError400(req, res, next)
            }

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('projectWonSelectedDetail', {
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

    updateStatusOt = async (req, res, next) => {
        const id = req.params.id
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
            !mainProyecto ? catchError400(req, res, next) : null

            const clientId = mainProyecto[0].client[0]._id
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
            
            const statusOtHidden = req.body.statusOtHidden
            const ociKNumberHidden = parseInt(req.body.ociKNumberHidden)
            const otKNumberHidden = parseInt(req.body.otKNumberHidden)
            
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator.visible ? catchError401_3(req, res, next) : null
            
            const userModificator = [{
                name: userCreator.name,
                lastName: userCreator.lastName,
                username: userCreator.username,
                email: userCreator.email
            }]

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
            !proyecto ? catchError400(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);    
            res.render('projectWonSelectedDetail', {
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

    updateOt = async (req, res, next) => {
        const id = req.params.id
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
            !mainProyecto ? catchError400(req, res, next) : null

            const clientId = mainProyecto[0].client[0]._id
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null

            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator.visible ? catchError401_3(req, res, next) : null
            
            const userModificator = [{
                name: userCreator.name,
                lastName: userCreator.lastName,
                username: userCreator.username,
                email: userCreator.email
            }]
        
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
                mainProyecto,
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

            const proyecto = await this.projects.selectProjectsByMainProjectId(id)
            !proyecto ? catchError400(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('projectWonSelectedDetail', {
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

    deleteOt = async (req, res, next) => {
        const id = req.params.id
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
            !mainProyecto ? catchError400(req, res, next) : null

            const clientId = mainProyecto[0].client[0]._id
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
            
            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator.visible ? catchError401_3(req, res, next) : null

            const userModificator = [{
                name: userCreator.name,
                lastName: userCreator.lastName,
                username: userCreator.username,
                email: userCreator.email
            }]

            const ociKNumber = req.body.ociKNumberHidden
            const otKNumber = req.body.otKNumberHidden
        
            await this.projects.deleteOt(
                id, 
                mainProyecto,
                ociKNumber,
                otKNumber,
                userModificator
                )
            
            await this.clients.updateClient(
                clientId, 
                cliente, 
                userModificator
            )

            const proyecto = await this.projects.selectProjectsByMainProjectId(id)
            !proyecto ? catchError400(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);    
            res.render('projectWonSelectedDetail', {
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

    //-----------------------------------------------------------
    addDetailToOtProject = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

console.log('req.params: ', req.params)        
console.log('req.body: ', req.body)

        try {
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociKNumberHidden)
            const numberOci = parseInt(req.body.ociNumberHidden) || parseInt(req.body.ociSelect)
            const otNumberK = parseInt(req.body.otKNumberHidden)
            const numberOt = parseInt(req.body.otNumberHidden) || parseInt(req.body.otSelect)

console.log('ociNumberK-numberOci-otNumberK-numberOt', ociNumberK, numberOci, otNumberK, numberOt)        
            
            const projectId = id || req.body.projectIdHidden
            const otQuantity = parseInt(req.body.otQuantityHidden) || 1

            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator.visible ? catchError401_3(req, res, next) : null

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

            let arrayDetalleNumber=[],
                arrayDetalleDescription=[],
                arrayDetalleStatus=[]

            const mapping = {
                'numberOtDetalle': arrayDetalleNumber,
                'descriptionDetalle': arrayDetalleDescription,
                'statusDetalleForm': arrayDetalleStatus
            };
            
            for (const key in req.body) {
                for (const prefix in mapping) {
                    if (key.startsWith(prefix)) {
                        mapping[prefix].push(req.body[key]);
                        break; // Evita seguir buscando una coincidencia después de encontrar la correcta
                    }
                }
            }

            const otDetallesEmpty = [{
                otDistribution: [],
                otProgramacionPrimera: [], otProgramacionSegunda: [],
                otMecanizadoPrimera: [], otMecanizadoSegunda: []
            }]

            var arrayDetalleAddedToOt = []
            for(let i=0; i<otQuantity; i++) {
                var detalleAddedToOt = {
                    detalleNumber: arrayDetalleNumber[i],
                    detalleDescription: arrayDetalleDescription[i],
                    detalleStatus: arrayDetalleStatus[i] == 'on' ? Boolean(true) : Boolean(false),
                    creator: user,
                    timestamp: now,
                    modificator: modificator,
                    modifiedOn: "",
                    otDetalles: otDetallesEmpty
                }
                arrayDetalleAddedToOt.push(detalleAddedToOt)
            }

console.log('arrayDetalleAddedToOt: ', arrayDetalleAddedToOt)
            await this.programms.addDetailToOtProject(
                projectId,
                ociNumberK,
                otQuantity,
                otNumberK,
                arrayDetalleAddedToOt
            )

            await this.clients.updateClient(
                clientId, 
                cliente, 
                user
            )

            const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError400(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('projectWonSelectedDetail', {
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

    //FIXME:-----------------------------------------------------------
    addDetailsToOtProjectFromFile = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

console.log('req.body: ', req.body)

        try {
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociKNumberHidden)
            const numberOci = parseInt(req.body.ociNumberHiddenFile)
            const otNumberK = parseInt(req.body.otKNumberHidden)
            const numberOt = parseInt(req.body.otNumberHidden) || parseInt(req.body.otSelect)

console.log('ociNumberK-numberOci-otNumberK-numberOt', ociNumberK, numberOci, otNumberK, numberOt)        
            
            const projectId = id || req.body.projectIdHidden
            const detailQuantity = parseInt(req.body.rowCountDetailsQty) || 1

            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            !userCreator.visible ? catchError401_3(req, res, next) : null

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

            let arrayDetalleNumber=[],
                arrayDetalleDescription=[]

            const prefixes = [
                { prefix: 'numberOtDetalle', array: arrayDetalleNumber },
                { prefix: 'descriptionDetalle', array: arrayDetalleDescription }
            ];
        
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                if (match) {
                    match.array.push(req.body[key]);
                }
            }

            const otDetallesEmpty = [{
                otDistribution: [],
                otProgramacionPrimera: [], otProgramacionSegunda: [],
                otMecanizadoPrimera: [], otMecanizadoSegunda: []
            }]

            var arrayDetalleAddedToOt = []
            for(let i=0; i<detailQuantity; i++) {
                var detalleAddedToOt = {
                    detalleNumber: arrayDetalleNumber[i],
                    detalleDescription: arrayDetalleDescription[i],
                    detalleStatus: Boolean(true),
                    creator: user,
                    timestamp: now,
                    modificator: modificator,
                    modifiedOn: "",
                    otDetalles: otDetallesEmpty
                }
                arrayDetalleAddedToOt.push(detalleAddedToOt)
            }

console.log('arrayDetalleAddedToOt: ', arrayDetalleAddedToOt)
            await this.programms.addDetailsToOtProjectFromFile(
                projectId,
                ociNumberK,
                detailQuantity,
                otNumberK,
                arrayDetalleAddedToOt
            )

            await this.clients.updateClient(
                clientId, 
                cliente, 
                user
            )

            const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError400(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('projectWonSelectedDetail', {
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


    // -----------------------------------------------------------
    addInfoOtDistribucion = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const clientId = req.body.clientIdHidden
            const cliente = await this.clients.selectClientById(clientId)     
            if (!cliente) {
                catchError401(req, res, next)
            }
            
            const projectId = req.body.projectIdHidden
            const proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            if (!proyecto) {
                catchError401_1(req, res, next)
            }

            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            if (!userCreator) {
                catchError401_3(req, res, next)
            }
            
            const ociNumberK = parseInt(req.body.ociNumberK)
            const detalleNumberK = parseInt(req.body.detalleNumberK)
            const otQuantity = parseInt(req.body.otQuantity)
            const detalleQuantity = parseInt(req.body.detalleQuantity)

            let arrayOtNumber=[],
                arrayOtStatus=[],
                arrayDetalleNumber=[],
                arrayMecanizado2dCompleto=[],
                arrayRevisionMecanizado2dCompleto=[],
                arrayMecanizado3dPrefinal=[],
                arrayRevisionMecanizado3dPrefinal=[],
                arrayMecanizado3dFinal=[],
                arrayRevisionMecanizado3dFinal=[],
                arrayBancoArmado=[],
                arrayRevisionBancoArmado=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'detalleNumberHidden', array: arrayDetalleNumber },
                { prefix: 'mecanizado2dCompletoHidden', array: arrayMecanizado2dCompleto },
                { prefix: 'revisionMecanizado2dCompleto', array: arrayRevisionMecanizado2dCompleto },
                { prefix: 'mecanizado3dPrefinalHidden', array: arrayMecanizado3dPrefinal },
                { prefix: 'revisionMecanizado3dPrefinal', array: arrayRevisionMecanizado3dPrefinal },
                { prefix: 'mecanizado3dFinalHidden', array: arrayMecanizado3dFinal },
                { prefix: 'revisionMecanizado3dFinal', array: arrayRevisionMecanizado3dFinal },
                { prefix: 'bancoArmadoHidden', array: arrayBancoArmado },
                { prefix: 'revisionBancoArmado', array: arrayRevisionBancoArmado }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                if (match) {
                    match.array.push(req.body[key]);
                    break;
                }
            }
            
            let arrayInfoAddedToOt = []
            for (let i=0; i<otQuantity; i++ ) {
                var infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    detalleNumber: arrayDetalleNumber[i],
                    mecanizado2dCompleto: arrayMecanizado2dCompleto[i] || "sinDato",
                    revisionMecanizado2dCompleto: parseInt(arrayRevisionMecanizado2dCompleto[i]) || 0,
                    mecanizado3dPrefinal: arrayMecanizado3dPrefinal[i] || "sinDato",
                    revisionMecanizado3dPrefinal: parseInt(arrayRevisionMecanizado3dPrefinal[i]) || 0,
                    mecanizado3dFinal: arrayMecanizado3dFinal[i] || "sinDato",
                    revisionMecanizado3dFinal: parseInt(arrayRevisionMecanizado3dFinal[i]) || 0,
                    bancoArmado: arrayBancoArmado[i] || "sinDato",
                    revisionBancoArmado: parseInt(arrayRevisionBancoArmado[i]) || 0,
                    timestamp: now,
                    creator: dataUserCreator(userCreator),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }

            const itemUpdated = await this.projects.addInfoOtDistribucion(
                projectId,
                otQuantity,
                ociNumberK,
                detalleNumberK,
                detalleQuantity,
                arrayInfoAddedToOt
            )
    
            if (!itemUpdated) {
                catchError400_3(req, res, next)
            }
            
            data.slide = 0
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                return res.render('projectWonSelectedDetail', {
                    username,
                    userInfo,
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

    addInfoProgramacionPrimera = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        const clientId = req.body.clientIdHidden
        const cliente = await this.clients.selectClientById(clientId)
        
        const ociNumberK = req.body.ociNumberK
        const projectId = req.body.projectIdHidden
        const otQuantity = parseInt(req.body.otQuantity)

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

    addInfoMecanizadoPrimera = async (req, res, next) => {
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
    // -----------------------------------------------------------
}

module.exports = {
    ProgramationController
}