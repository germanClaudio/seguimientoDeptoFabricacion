const ProyectosService = require("../services/projects.service.js"),
    ClientesService = require("../services/clients.service.js"),
    UserService = require("../services/users.service.js"),
    ProgramasService = require("../services/programms.service.js"),
    AjustesService = require("../services/ajustes.service.js"),
    ToolService = require("../services/tools.service.js"),
    CartsService = require("../services/carts.service.js"),
    OrdersService = require("../services/orders.service.js"),

    csrf = require('csrf'),
    csrfTokens = csrf(),

    cookie = require('../utils/cookie.js'),

    { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty, dataUserAuthorizator } = require('../utils/generateUsers.js')

let data = require('../utils/variablesInicializator.js'),
    formatDate = require('../utils/formatDate.js')

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

class AjustesController {
    constructor() {
        this.projects = new ProyectosService()
        this.clients = new ClientesService()
        this.users = new UserService()
        this.programms = new ProgramasService()
        this.ajustes = new AjustesService()
        this.tools = new ToolService()
        this.carts = new CartsService()
        this.orders = new OrdersService()
    }

    getAllProjectsWon = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            let cliente = await this.clients.getClientById()
            !cliente ? catchError401(req, res, next) : null

            const proyectos = await this.ajustes.getAllProjectsWon()
            !proyectos ? catchError400(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('projectsWonList', {
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
            userInfo = res.locals.userInfo
                
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
            res.render('clientProjectsDetails', {
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

        } catch (error) {
            catchError500(err, req, res, next)
        }
    }

    selectProjectByClientId = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

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
            res.render('clientProjectsDetails', {
                proyectos,
                username,
                userInfo,
                userCart,
                ordenes,
                expires,
                cliente,
                csrfToken
            })

        } catch (error) {
            catchError500(err, req, res, next)
        }
    }

    selectProjectById = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const proyecto = await this.projects.selectProjectByProjectId(id)
            !proyecto ? catchError400(req, res, next) : null

            const idCliente = proyecto[0].client[0]._id
            const cliente = await this.clients.getClientByProjectId(idCliente)
            !cliente  ? catchError401(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                res.render('projectAjusteSelected', {
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
            }, 500)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getAllOciProjects = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            let clientes = await this.clients.getAllClients()
            !clientes ? catchError401(req, res, next)  : null

            const proyectos = await this.projects.getAllOciProjects()
            !proyectos ? catchError400(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('nestableOciList', {
                username,
                userInfo,
                userCart,
                ordenes,
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

    addNewDuenoOci = async (req, res, next) => {
        const id = req.body.projectIdHidden
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        let csrfToken = req.csrfSecret;
        csrfTokens.verify(req.csrfSecret, csrfToken) ? catchError403(req, res, next) : null
        
        try {
            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null

            let proyecto = await this.projects.selectProjectsByMainProjectId(id)
            !proyecto ? catchError401_4(req, res, next) : null
            
            const projectId = proyecto[0]._id,
                clientId = proyecto[0].client[0]._id,
                cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null

            let arrayOciKNumber=[], arrayOciNumber=[], arrayOciDueno=[]
            
            const prefixes = [
                { prefix: 'ociNumberK', array: arrayOciKNumber },
                { prefix: 'ociNumber', array: arrayOciNumber },
                { prefix: 'duenoOt', array: arrayOciDueno }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }

            let ociNumberValid = await this.projects.selectOciByOciNumber(arrayOciNumber[0], arrayOciKNumber[0])
            if (!ociNumberValid) {
                const err = new Error (`No existe una OCI# ${arrayOciNumber[0]} o Número de OCI inválido!`)
                err.dirNumber = 400
                return next(err);
            }

            let legajoIdUser = parseInt(arrayOciDueno[0].split(',')[0].trim()),
                ociOwnerUser = await this.users.getUserByLegajoId(legajoIdUser)
                !ociOwnerUser ? catchError401_3(req, res, next) : null

            let infoOciAddedToProject = [
                {
                    ociOwner: ociOwnerUser,
                    modificator: dataUserModificatorNotEmpty(userCreator),
                    modifiedOn: formatDate(),
                }
            ]
            
            await this.ajustes.addNewDuenoOci(
                projectId,
                arrayOciKNumber,
                infoOciAddedToProject
            )
            
            proyecto = await this.projects.getProjectsByClientId(clientId)
            !proyecto ? catchError401_1(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                return res.render('projectAjusteSelected', {
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

    updateDuenoOci = async (req, res, next) => {
        const id = req.params.id,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo,
            csrfToken = req.csrfSecret;
        csrfTokens.verify(req.csrfSecret, csrfToken) ? catchError403(req, res, next) : null
        
        try {
            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null

            let proyecto = await this.projects.selectProjectsByMainProjectId(id)
            !proyecto ? catchError401_4(req, res, next) : null

            const projectId = proyecto[0]._id,
                clientId = proyecto[0].client[0]._id,
                cliente = await this.clients.selectClientById(clientId)
            !cliente ? catchError401(req, res, next) : null

            let arrayOciKNumber=[], arrayOciNumber=[], arrayOciDueno=[]
            
            const prefixes = [
                { prefix: 'ociKNumberHidden', array: arrayOciKNumber },
                { prefix: 'ociNumberHidden', array: arrayOciNumber },
                { prefix: 'duenoOciModal', array: arrayOciDueno }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let ociNumberValid = await this.projects.selectOciByOciNumber(arrayOciNumber[0], arrayOciKNumber[0])
            if (!ociNumberValid) {
                const err = new Error (`No existe una OCI# ${arrayOciNumber[0]} o Número de OCI inválido!`)
                err.dirNumber = 400
                return next(err);
            }

            let legajoIdUser = parseInt(arrayOciDueno[0].split(',')[0].trim()),
                ociOwnerUser = await this.users.getUserByLegajoId(legajoIdUser)
            !ociOwnerUser ? catchError401_3(req, res, next) : null

            let infoOciAddedToProject = [{
                ociOwner: ociOwnerUser,
                modificator: dataUserModificatorNotEmpty(userCreator),
                modifiedOn: formatDate(),
            }]
            
            await this.ajustes.updateDuenoOci(
                projectId,
                arrayOciKNumber,
                infoOciAddedToProject
            )
            
            proyecto = await this.projects.getProjectsByClientId(clientId)
            !proyecto ? catchError401_1(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                return res.render('projectAjusteSelected', {
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
            }, 300)
            
        } catch (err) {
            catchError500(err, req, res, next)
        }
        
    }

    // 0-------------- infoArmado ---------------------------
    addInfoArmado = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const clientId = req.body.clientIdHidden,
                cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayArmadoMaquina=[], arrayRevisionArmadoMaquina=[],
                arrayPatronizado=[], arrayRevisionPatronizado=[],
                arrayLthArmado=[], arrayRevisionLthArmado=[],
                arrayArmadoPrensa=[], arrayRevisionArmadoPrensa=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'armadoMaquinaHidden', array: arrayArmadoMaquina },
                { prefix: 'revisionArmadoMaquina', array: arrayRevisionArmadoMaquina },
                { prefix: 'patronizadoHidden', array: arrayPatronizado },
                { prefix: 'revisionPatronizado', array: arrayRevisionPatronizado },
                { prefix: 'lthArmadoHidden', array: arrayLthArmado },
                { prefix: 'revisionLthArmadoHidden', array: arrayRevisionLthArmado },
                { prefix: 'armadoPrensaHidden', array: arrayArmadoPrensa },
                { prefix: 'revisionArmadoPrensa', array: arrayRevisionArmadoPrensa },
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = [], infoAddedToOt = {}
            for (let i=0; i<otQuantity; i++ ) {
                infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    armadoMaquina: arrayArmadoMaquina[i] || "sinDato",
                    revisionArmadoMaquina: parseInt(arrayRevisionArmadoMaquina[i]) || 0,
                    patronizado: arrayPatronizado[i] || "sinDato",
                    revisionPatronizado: parseInt(arrayRevisionPatronizado[i]) || 0,
                    lthArmado: arrayLthArmado[i] || "sinDato",
                    revisionLthArmado: parseInt(arrayRevisionLthArmado[i]) || 0,
                    armadoPrensa: arrayArmadoPrensa[i] || "sinDato",
                    revisionArmadoPrensa: parseInt(arrayRevisionArmadoPrensa[i]) || 0,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtArmado(
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
                return res.render('projectAjusteSelected', {
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

    // 1-------------- infoEtapaPrimera ---------------------------
    addInfoEtapaPrimera = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const clientId = req.body.clientIdHidden,
                cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayGuiados=[], arrayRevisionGuiados=[],
                arrayCentradoLuzCorte=[], arrayRevisionCentradoLuzCorte=[],
                arrayCentradoLevas=[], arrayRevisionCentradoLevas=[],
                arrayLthEtapaPrimera=[], arrayRevisionLthEtapaPrimera=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'guiadosHidden', array: arrayGuiados },
                { prefix: 'revisionGuiados', array: arrayRevisionGuiados },
                { prefix: 'centradoLuzCorteHidden', array: arrayCentradoLuzCorte },
                { prefix: 'revisionCentradoLuzCorte', array: arrayRevisionCentradoLuzCorte },
                { prefix: 'centradoLevasHidden', array: arrayCentradoLevas },
                { prefix: 'revisionCentradoLevas', array: arrayRevisionCentradoLevas },
                { prefix: 'lthEtapaPrimeraHidden', array: arrayLthEtapaPrimera },
                { prefix: 'revisionLthEtapaPrimera', array: arrayRevisionLthEtapaPrimera },
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = [], infoAddedToOt = {}
            for (let i=0; i<otQuantity; i++ ) {
                infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    guiados: arrayGuiados[i] || "sinDato",
                    revisionGuiados: parseInt(arrayRevisionGuiados[i]) || 0,
                    centradoLuzCorte: arrayCentradoLuzCorte[i] || "sinDato",
                    revisionCentradoLuzCorte: parseInt(arrayRevisionCentradoLuzCorte[i]) || 0,
                    centradoLevas: arrayCentradoLevas[i] || "sinDato",
                    revisionCentradoLevas: parseInt(arrayRevisionCentradoLevas[i]) || 0,
                    lthEtapaPrimera: arrayLthEtapaPrimera[i] || "sinDato",
                    revisionLthEtapaPrimera: parseInt(arrayRevisionLthEtapaPrimera[i]) || 0,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtEtapaPrimera(
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
                return res.render('projectAjusteSelected', {
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

    // 2-------------- infoEtapaSegundaPrimera ---------------------------
    addInfoEtapaSegundaPrimera = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const clientId = req.body.clientIdHidden,
                cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayAzulado=[], arrayRevisionAzulado=[],
                arrayTachoAjuste=[], arrayRevisionTachoAjuste=[],
                arrayAjusteFondo=[], arrayRevisionAjusteFondo=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'azuladoHidden', array: arrayAzulado },
                { prefix: 'revisionAzulado', array: arrayRevisionAzulado },
                { prefix: 'tachoAjusteHidden', array: arrayTachoAjuste },
                { prefix: 'revisionTachoAjuste', array: arrayRevisionTachoAjuste },
                { prefix: 'ajusteFondoHidden', array: arrayAjusteFondo },
                { prefix: 'revisionAjusteFondo', array: arrayRevisionAjusteFondo }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = [], infoAddedToOt = {}
            for (let i=0; i<otQuantity; i++ ) {
                infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    azulado: arrayAzulado[i] || "sinDato",
                    revisionAzulado: parseInt(arrayRevisionAzulado[i]) || 0,
                    tachoAjuste: arrayTachoAjuste[i] || "sinDato",
                    revisionTachoAjuste: parseInt(arrayRevisionTachoAjuste[i]) || 0,
                    ajusteFondo: arrayAjusteFondo[i] || "sinDato",
                    revisionAjusteFondo: parseInt(arrayRevisionAjusteFondo[i]) || 0,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtEtapaSegundaPrimera(
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
                return res.render('projectAjusteSelected', {
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

    // 3-------------- infoEtapaSegundaSegunda ---------------------------
    addInfoEtapaSegundaSegunda = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const clientId = req.body.clientIdHidden,
                cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayAzuladoAceros=[], arrayRevisionAzuladoAceros=[],
                arrayLthEtapaSegunda=[], arrayRevisionLthEtapaSegunda=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'azuladoAcerosHidden', array: arrayAzuladoAceros },
                { prefix: 'revisionAzuladoAceros', array: arrayRevisionAzuladoAceros },
                { prefix: 'lthEtapaSegundaHidden', array: arrayLthEtapaSegunda },
                { prefix: 'revisionLthEtapaSegunda', array: arrayRevisionLthEtapaSegunda }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = [], infoAddedToOt = {}
            for (let i=0; i<otQuantity; i++ ) {
                infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    azuladoAceros: arrayAzuladoAceros[i] || "sinDato",
                    revisionAzuladoAceros: parseInt(arrayRevisionAzuladoAceros[i]) || 0,
                    lthEtapaSegunda: arrayLthEtapaSegunda[i] || "sinDato",
                    revisionLthEtapaSegunda: parseInt(arrayRevisionLthEtapaSegunda[i]) || 0,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtEtapaSegundaSegunda(
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
                return res.render('projectAjusteSelected', {
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

    // 4-------------- infoAnalisisCritico ---------------------------
    addInfoAnalisisCritico = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const clientId = req.body.clientIdHidden,
                cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayEstatico=[], arrayRevisionEstatico=[],
                arrayDinamico=[], arrayRevisionDinamico=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'estaticoHidden', array: arrayEstatico },
                { prefix: 'revisionEstatico', array: arrayRevisionEstatico },
                { prefix: 'dinamicoHidden', array: arrayDinamico },
                { prefix: 'revisionDinamico', array: arrayRevisionDinamico }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = [], infoAddedToOt = {}
            for (let i=0; i<otQuantity; i++ ) {
                infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    estatico: arrayEstatico[i] || "sinDato",
                    revisionEstatico: parseInt(arrayRevisionEstatico[i]) || 0,
                    dinamico: arrayDinamico[i] || "sinDato",
                    revisionDinamico: parseInt(arrayRevisionDinamico[i]) || 0,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtAnalisisCritico(
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
                return res.render('projectAjusteSelected', {
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

    // 5-------------- infoEtapaTerceraPrimera ---------------------------
    addInfoEtapaTerceraPrimera = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const clientId = req.body.clientIdHidden,
                cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayLocalizacionFuncional=[], arrayRevisionLocalizacionFuncional=[],
                arrayObtencionPieza=[], arrayRevisionObtencionPieza=[],
                arrayAzuladoFuncional=[], arrayRevisionAzuladoFuncional=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'localizacionFuncionalHidden', array: arrayLocalizacionFuncional },
                { prefix: 'revisionLocalizacionFuncional', array: arrayRevisionLocalizacionFuncional },
                { prefix: 'obtencionPiezaHidden', array: arrayObtencionPieza },
                { prefix: 'revisionObtencionPieza', array: arrayRevisionObtencionPieza },
                { prefix: 'azuladoFuncionalHidden', array: arrayAzuladoFuncional },
                { prefix: 'revisionAzuladoFuncional', array: arrayRevisionAzuladoFuncional }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = [], infoAddedToOt = {}
            for (let i=0; i<otQuantity; i++ ) {
                infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    localizacionFuncional: arrayLocalizacionFuncional[i] || "sinDato",
                    revisionLocalizacionFuncional: parseInt(arrayRevisionLocalizacionFuncional[i]) || 0,
                    obtencionPieza: arrayObtencionPieza[i] || "sinDato",
                    revisionObtencionPieza: parseInt(arrayRevisionObtencionPieza[i]) || 0,
                    azuladoFuncional: arrayAzuladoFuncional[i] || "sinDato",
                    revisionAzuladoFuncional: parseInt(arrayRevisionAzuladoFuncional[i]) || 0,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtEtapaTerceraPrimera(
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
                return res.render('projectAjusteSelected', {
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

    // 6-------------- infoEtapaTerceraSegunda ---------------------------
    addInfoEtapaTerceraSegunda = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const clientId = req.body.clientIdHidden,
                cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayFuncionalCompleta=[], arrayRevisionFuncionalCompleta=[],
                arrayLthEtapaTercera=[], arrayRevisionLthEtapaTercera=[],
                arrayLiberarPiezaMetrologia=[], arrayRevisionLiberarPiezaMetrologia=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'funcionalCompletaHidden', array: arrayFuncionalCompleta },
                { prefix: 'revisionFuncionalCompleta', array: arrayRevisionFuncionalCompleta },
                { prefix: 'lthEtapaTerceraHidden', array: arrayLthEtapaTercera },
                { prefix: 'revisionLthEtapaTercera', array: arrayRevisionLthEtapaTercera },
                { prefix: 'liberarPiezaMetrologiaHidden', array: arrayLiberarPiezaMetrologia },
                { prefix: 'revisionLiberarPiezaMetrologia', array: arrayRevisionLiberarPiezaMetrologia }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = [], infoAddedToOt = {}
            for (let i=0; i<otQuantity; i++ ) {
                infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    funcionalCompleta: arrayFuncionalCompleta[i] || "sinDato",
                    revisionFuncionalCompleta: parseInt(arrayRevisionFuncionalCompleta[i]) || 0,
                    lthEtapaTercera: arrayLthEtapaTercera[i] || "sinDato",
                    revisionLthEtapaTercera: parseInt(arrayRevisionLthEtapaTercera[i]) || 0,
                    liberarPiezaMetrologia: arrayLiberarPiezaMetrologia[i] || "sinDato",
                    revisionLiberarPiezaMetrologia: parseInt(arrayRevisionLiberarPiezaMetrologia[i]) || 0,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtEtapaTerceraSegunda(
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
                return res.render('projectAjusteSelected', {
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

    // 7-------------- infoCicloCorreccionPrimera ---------------------------
    addInfoCicloCorreccionPrimera = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const clientId = req.body.clientIdHidden,
                cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayPiezaMedidaReunionPrimera=[], arrayRevisionPiezaMedidaReunionPrimera=[],
                arrayMaquinaPrimera=[], arrayRevisionMaquinaPrimera=[],
                arrayAjustePrimera=[], arrayRevisionAjustePrimera=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'piezaMedidaReunionPrimeraHidden', array: arrayPiezaMedidaReunionPrimera },
                { prefix: 'revisionPiezaMedidaReunionPrimera', array: arrayRevisionPiezaMedidaReunionPrimera },
                { prefix: 'maquinaPrimeraHidden', array: arrayMaquinaPrimera },
                { prefix: 'revisionMaquinaPrimera', array: arrayRevisionMaquinaPrimera },
                { prefix: 'ajustePrimeraHidden', array: arrayAjustePrimera },
                { prefix: 'revisionAjustePrimera', array: arrayRevisionAjustePrimera }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = [], infoAddedToOt = {}
            for (let i=0; i<otQuantity; i++ ) {
                infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    piezaMedidaReunionPrimera: arrayPiezaMedidaReunionPrimera[i] || "sinDato",
                    revisionPiezaMedidaReunionPrimera: parseInt(arrayRevisionPiezaMedidaReunionPrimera[i]) || 0,
                    maquinaPrimera: arrayMaquinaPrimera[i] || "sinDato",
                    revisionMaquinaPrimera: parseInt(arrayRevisionMaquinaPrimera[i]) || 0,
                    ajustePrimera: arrayAjustePrimera[i] || "sinDato",
                    revisionAjustePrimera: parseInt(arrayRevisionAjustePrimera[i]) || 0,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtCicloCorreccionPrimera(
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
                return res.render('projectAjusteSelected', {
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

    // 8-------------- infoCicloCorreccionSegunda ---------------------------
    addInfoCicloCorreccionSegunda = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const clientId = req.body.clientIdHidden,
                cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayPiezaMedidaReunionSegunda=[], arrayRevisionPiezaMedidaReunionSegunda=[],
                arrayMaquinaSegunda=[], arrayRevisionMaquinaSegunda=[],
                arrayAjusteSegunda=[], arrayRevisionAjusteSegunda=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'piezaMedidaReunionSegundaHidden', array: arrayPiezaMedidaReunionSegunda },
                { prefix: 'revisionPiezaMedidaReunionSegunda', array: arrayRevisionPiezaMedidaReunionSegunda },
                { prefix: 'maquinaSegundaHidden', array: arrayMaquinaSegunda },
                { prefix: 'revisionMaquinaSegunda', array: arrayRevisionMaquinaSegunda },
                { prefix: 'ajusteSegundaHidden', array: arrayAjusteSegunda },
                { prefix: 'revisionAjusteSegunda', array: arrayRevisionAjusteSegunda }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = [], infoAddedToOt = {}
            for (let i=0; i<otQuantity; i++ ) {
                infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    piezaMedidaReunionSegunda: arrayPiezaMedidaReunionSegunda[i] || "sinDato",
                    revisionPiezaMedidaReunionSegunda: parseInt(arrayRevisionPiezaMedidaReunionSegunda[i]) || 0,
                    maquinaSegunda: arrayMaquinaSegunda[i] || "sinDato",
                    revisionMaquinaSegunda: parseInt(arrayRevisionMaquinaSegunda[i]) || 0,
                    ajusteSegunda: arrayAjusteSegunda[i] || "sinDato",
                    revisionAjusteSegunda: parseInt(arrayRevisionAjusteSegunda[i]) || 0,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtCicloCorreccionSegunda(
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
                return res.render('projectAjusteSelected', {
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

    // 9-------------- infoCicloCorreccionTercera ---------------------------
    addInfoCicloCorreccionTercera = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const clientId = req.body.clientIdHidden,
                cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayPiezaMedidaReunionTercera=[], arrayRevisionPiezaMedidaReunionTercera=[],
                arrayMaquinaTercera=[], arrayRevisionMaquinaTercera=[],
                arrayAjusteTercera=[], arrayRevisionAjusteTercera=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'piezaMedidaReunionTerceraHidden', array: arrayPiezaMedidaReunionTercera },
                { prefix: 'revisionPiezaMedidaReunionTercera', array: arrayRevisionPiezaMedidaReunionTercera },
                { prefix: 'maquinaTerceraHidden', array: arrayMaquinaTercera },
                { prefix: 'revisionMaquinaTercera', array: arrayRevisionMaquinaTercera },
                { prefix: 'ajusteTerceraHidden', array: arrayAjusteTercera },
                { prefix: 'revisionAjusteTercera', array: arrayRevisionAjusteTercera }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = [], infoAddedToOt = {}
            for (let i=0; i<otQuantity; i++ ) {
                infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    piezaMedidaReunionTercera: arrayPiezaMedidaReunionTercera[i] || "sinDato",
                    revisionPiezaMedidaReunionTercera: parseInt(arrayRevisionPiezaMedidaReunionTercera[i]) || 0,
                    maquinaTercera: arrayMaquinaTercera[i] || "sinDato",
                    revisionMaquinaTercera: parseInt(arrayRevisionMaquinaTercera[i]) || 0,
                    ajusteTercera: arrayAjusteTercera[i] || "sinDato",
                    revisionAjusteTercera: parseInt(arrayRevisionAjusteTercera[i]) || 0,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtCicloCorreccionTercera(
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
                return res.render('projectAjusteSelected', {
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

    // 10------------- infoLiberacionBuyOffPrimera ---------------------------
    addInfoLiberacionBuyOffPrimera = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const clientId = req.body.clientIdHidden,
                cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayAzuladosFondoPieza=[], arrayRevisionAzuladosFondoPieza=[],
                arrayRoces=[], arrayRevisionRoces=[],
                arrayAzuladoGuias=[], arrayRevisionAzuladoGuias=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'azuladosFondoPiezaHidden', array: arrayAzuladosFondoPieza },
                { prefix: 'revisionAzuladosFondoPieza', array: arrayRevisionAzuladosFondoPieza },
                { prefix: 'rocesHidden', array: arrayRoces },
                { prefix: 'revisionRoces', array: arrayRevisionRoces },
                { prefix: 'azuladoGuiasHidden', array: arrayAzuladoGuias },
                { prefix: 'revisionAzuladoGuias', array: arrayRevisionAzuladoGuias }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = [], infoAddedToOt = {}
            for (let i=0; i<otQuantity; i++ ) {
                infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    azuladosFondoPieza: arrayAzuladosFondoPieza[i] || "sinDato",
                    revisionAzuladosFondoPieza: parseInt(arrayRevisionAzuladosFondoPieza[i]) || 0,
                    roces: arrayRoces[i] || "sinDato",
                    revisionRoces: parseInt(arrayRevisionRoces[i]) || 0,
                    azuladoGuias: arrayAzuladoGuias[i] || "sinDato",
                    revisionAzuladoGuias: parseInt(arrayRevisionAzuladoGuias[i]) || 0,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtLiberacionBuyOffPrimera(
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
                return res.render('projectAjusteSelected', {
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

    // 11------------- infoLiberacionBuyOffSegunda ---------------------------
    addInfoLiberacionBuyOffSegunda = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const clientId = req.body.clientIdHidden,
                cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayRebabas=[], arrayRevisionRebabas=[],
                arrayCaidasScrap=[], arrayRevisionCaidasScrap=[],
                arrayAspecto=[], arrayRevisionAspecto=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'rebabasHidden', array: arrayRebabas },
                { prefix: 'revisionRebabas', array: arrayRevisionRebabas },
                { prefix: 'caidasScrapHidden', array: arrayCaidasScrap },
                { prefix: 'revisionCaidasScrap', array: arrayRevisionCaidasScrap },
                { prefix: 'aspectoHidden', array: arrayAspecto },
                { prefix: 'revisionAspecto', array: arrayRevisionAspecto }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = [], infoAddedToOt = {}
            for (let i=0; i<otQuantity; i++ ) {
                infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    rebabas: arrayRebabas[i] || "sinDato",
                    revisionRebabas: parseInt(arrayRevisionRebabas[i]) || 0,
                    caidasScrap: arrayCaidasScrap[i] || "sinDato",
                    revisionCaidasScrap: parseInt(arrayRevisionCaidasScrap[i]) || 0,
                    aspecto: arrayAspecto[i] || "sinDato",
                    revisionAspecto: parseInt(arrayRevisionAspecto[i]) || 0,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtLiberacionBuyOffSegunda(
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
                return res.render('projectAjusteSelected', {
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

    // 12------------- info BuyOff ---------------------------
    addInfoBuyOff = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const clientId = req.body.clientIdHidden,
                cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayBuyOffEstatico=[], arrayRevisionBuyOffEstatico=[],
                arrayBuyOffDinamico=[], arrayRevisionBuyOffDinamico=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'buyOffEstaticoHidden', array: arrayBuyOffEstatico },
                { prefix: 'revisionBuyOffEstatico', array: arrayRevisionBuyOffEstatico },
                { prefix: 'buyOffDinamicoHidden', array: arrayBuyOffDinamico },
                { prefix: 'revisionBuyOffDinamico', array: arrayRevisionBuyOffDinamico }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = [], infoAddedToOt = {}
            for (let i=0; i<otQuantity; i++ ) {
                infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    buyOffEstatico: arrayBuyOffEstatico[i] || "sinDato",
                    revisionBuyOffEstatico: parseInt(arrayRevisionBuyOffEstatico[i]) || 0,
                    buyOffDinamico: arrayBuyOffDinamico[i] || "sinDato",
                    revisionBuyOffDinamico: parseInt(arrayRevisionBuyOffDinamico[i]) || 0,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            // console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtBuyOff(
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
            
            data.slide = 12
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                return res.render('projectAjusteSelected', {
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

    // 13------------- infoPendientesFinales ---------------------------
    addInfoPendientesFinales = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const clientId = req.body.clientIdHidden,
                cliente = await this.clients.selectClientById(clientId)     
            !cliente ? catchError401(req, res, next) : null
            
            const projectId = req.body.projectIdHidden
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            !proyecto ? catchError401_1(req, res, next) : null

            const userId = userInfo.id,
                userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            const ociNumberK = parseInt(req.body.ociNumberK),
                otQuantity = parseInt(req.body.otQuantity),
                arrayOtKNumber = req.body.otNumberK.split(","),
                arrayOtNumberK = arrayOtKNumber.map(Number) 

            let arrayOtNumber=[], arrayOtStatus=[],
                arrayPendientesMaquina=[], arrayRevisionPendientesMaquina=[],
                arrayPendientesAjuste=[], arrayRevisionPendientesAjuste=[],
                arrayNotasAjuste=[], arrayRevisionNotasAjuste=[]

            const prefixes = [
                { prefix: 'otNumberHidden', array: arrayOtNumber },
                { prefix: 'otStatusHidden', array: arrayOtStatus },
                { prefix: 'pendientesMaquinaHidden', array: arrayPendientesMaquina },
                { prefix: 'revisionPendientesMaquina', array: arrayRevisionPendientesMaquina },
                { prefix: 'pendientesAjusteHidden', array: arrayPendientesAjuste },
                { prefix: 'revisionPendientesAjuste', array: arrayRevisionPendientesAjuste },
                { prefix: 'notasAjusteHidden', array: arrayNotasAjuste },
                { prefix: 'revisionNotasAjuste', array: arrayRevisionNotasAjuste }
            ];
            
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayInfoAddedToOt = [], infoAddedToOt = {}
            for (let i=0; i<otQuantity; i++ ) {
                infoAddedToOt = {
                    otStatus: arrayOtStatus[i],
                    otNumber: parseInt(arrayOtNumber[i]),
                    pendientesMaquina: arrayPendientesMaquina[i] || "sinDato",
                    revisionPendientesMaquina: parseInt(arrayRevisionPendientesMaquina[i]) || 0,
                    pendientesAjuste: arrayPendientesAjuste[i] || "sinDato",
                    revisionPendientesAjuste: parseInt(arrayRevisionPendientesAjuste[i]) || 0,
                    notasAjuste: arrayNotasAjuste[i] || "sinDato",
                    revisionNotasAjuste: parseInt(arrayRevisionNotasAjuste[i]) || 0,
                    creator: dataUserCreator(userCreator),
                    timestamp: formatDate(),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            //console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtPendientesFinales(
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
            
            data.slide = 13
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                return res.render('projectAjusteSelected', {
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

}

module.exports = {
    AjustesController
}