const ProyectosService = require("../services/projects.service.js")
const ClientesService = require("../services/clients.service.js")
const UserService = require("../services/users.service.js")
const ProgramasService = require("../services/programms.service.js")
const AjustesService = require("../services/ajustes.service.js")
const ToolService = require("../services/tools.service.js")

// const { uploadToGCS, uploadToGCSingleFile } = require("../utils/uploadFilesToGSC.js")
// const { uploadMulterMultiImages, uploadMulterSingleImageProject, uploadMulterSingleImageOci } = require("../utils/uploadMulter.js")
// const multer = require('multer')

let formatDate = require('../utils/formatDate.js')
let tieneNumeros = require('../utils/gotNumbers.js')
let esStringUObjeto = require('../utils/isNumberOrObject.js')
const csrf = require('csrf');
const csrfTokens = csrf();

// let imageNotFound = "../../../src/images/upload/LogoClientImages/noImageFound.png"
const cookie = require('../utils/cookie.js')

let data = require('../utils/variablesInicializator.js')

const { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty, dataUserAuthorizator } = require('../utils/generateUsers.js')

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

class AjustesController {
    constructor() {
        this.projects = new ProyectosService()
        this.clients = new ClientesService()
        this.users = new UserService()
        this.programms = new ProgramasService()
        this.ajustes = new AjustesService()
        this.tools = new ToolService()
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

            const proyectos = await this.ajustes.getAllProjectsWon()
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
            const proyecto = await this.ajustes.selectProjectByProjectId(id)
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
                res.render('projectAjusteSelected', {
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

    // -----------------------------------------------------------
    // addInfoOtDistribucion = async (req, res, next) => {
    //     const id = req.params.id
    //     let username = res.locals.username
    //     let userInfo = res.locals.userInfo
    //     const expires = cookie(req)
        
    //     try {
    //         const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
    //         !mainProyecto ? catchError400(req, res, next) : null

    //         const clientId = req.body.clientIdHidden
    //         const cliente = await this.clients.selectClientById(clientId)     
    //         if (!cliente) {
    //             catchError401(req, res, next)
    //         }
            
    //         const projectId = req.body.projectIdHidden
    //         let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
    //         if (!proyecto) {
    //             catchError401_1(req, res, next)
    //         }

    //         const userId = userInfo.id
    //         const userCreator = await this.users.getUserById(userId)
    //         if (!userCreator) {
    //             catchError401_3(req, res, next)
    //         }
            
    //         const ociNumberK = parseInt(req.body.ociNumberK)
    //         const resultado = req.body.detalleNumberK.split(",")

    //         const arrayDetalleKNumber = resultado.map(item => {
    //             const partes = item.split('_'); // Dividir la cadena por "_"
    //             return parseInt(partes[partes.length - 1]); // Obtener el último número y convertirlo a entero
    //         });
    //         const arrayDetalleNumberK = arrayDetalleKNumber //.map(Number)

    //         const arrayOtKNumber = req.body.otNumberK.split(",")
    //         const arrayOtNumberK = arrayOtKNumber.map(Number) 
    //         const otQuantity = parseInt(req.body.otQuantity)
    //         const detallesQuantity = parseInt(req.body.detallesQuantity)
    //         const totalDetallesQuantity = parseInt(req.body.totalDetallesQuantity)

    //         let arrayIdDetalle=[], arrayOtNumber=[], arrayOtStatus=[], arrayDetalleNumber=[],
    //             arrayMecanizado2dCompleto=[], arrayRevisionMecanizado2dCompleto=[],
    //             arrayMecanizado3dPrefinal=[], arrayRevisionMecanizado3dPrefinal=[],
    //             arrayMecanizado3dFinal=[], arrayRevisionMecanizado3dFinal=[],
    //             arrayBancoArmado=[], arrayRevisionBancoArmado=[]

    //         const prefixes = [
    //             { prefix: 'detalleIdHidden', array: arrayIdDetalle },
    //             { prefix: 'otNumberHidden', array: arrayOtNumber },
    //             { prefix: 'otStatusHidden', array: arrayOtStatus },
    //             { prefix: 'detalleNumberHidden', array: arrayDetalleNumber },
    //             { prefix: 'mecanizado2dCompletoHidden', array: arrayMecanizado2dCompleto },
    //             { prefix: 'revisionMecanizado2dCompleto', array: arrayRevisionMecanizado2dCompleto },
    //             { prefix: 'mecanizado3dPrefinalHidden', array: arrayMecanizado3dPrefinal },
    //             { prefix: 'revisionMecanizado3dPrefinal', array: arrayRevisionMecanizado3dPrefinal },
    //             { prefix: 'mecanizado3dFinalHidden', array: arrayMecanizado3dFinal },
    //             { prefix: 'revisionMecanizado3dFinal', array: arrayRevisionMecanizado3dFinal },
    //             { prefix: 'bancoArmadoHidden', array: arrayBancoArmado },
    //             { prefix: 'revisionBancoArmado', array: arrayRevisionBancoArmado }
    //         ];
            
    //         for (const key in req.body) {
    //             const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
    //             match ? match.array.push(req.body[key]) : null
    //         }
            
    //         let arrayInfoAddedToDetail = []
    //         for (let i=0; i<detallesQuantity; i++ ) {
    //             var infoAddedToOt = {
    //                 idDetalle: arrayIdDetalle[i],
    //                 otStatus: arrayOtStatus[i],
    //                 otNumber: parseInt(arrayOtNumber[i]),
    //                 detalleNumber: arrayDetalleNumber[i],
    //                 mecanizado2dCompleto: arrayMecanizado2dCompleto[i] || "sinDato",
    //                 revisionMecanizado2dCompleto: parseInt(arrayRevisionMecanizado2dCompleto[i]) || 0,
    //                 mecanizado3dPrefinal: arrayMecanizado3dPrefinal[i] || "sinDato",
    //                 revisionMecanizado3dPrefinal: parseInt(arrayRevisionMecanizado3dPrefinal[i]) || 0,
    //                 mecanizado3dFinal: arrayMecanizado3dFinal[i] || "sinDato",
    //                 revisionMecanizado3dFinal: parseInt(arrayRevisionMecanizado3dFinal[i]) || 0,
    //                 bancoArmado: arrayBancoArmado[i] || "sinDato",
    //                 revisionBancoArmado: parseInt(arrayRevisionBancoArmado[i]) || 0,
    //                 timestamp: formatDate(),
    //                 creator: dataUserCreator(userCreator),
    //                 modificator: dataUserModificatorEmpty(),
    //                 modifiedOn: "",
    //             }
    //             arrayInfoAddedToDetail.push(infoAddedToOt)
    //         }
    //         // console.log('arrayInfoAddedToDetail-controller', arrayInfoAddedToDetail)

    //         const itemUpdated = await this.ajustes.addInfoOtDistribucion(
    //             projectId,
    //             otQuantity,
    //             ociNumberK,
    //             arrayOtNumberK,
    //             arrayDetalleNumberK,
    //             detallesQuantity,
    //             totalDetallesQuantity,
    //             arrayInfoAddedToDetail
    //         )
    
    //         if (!itemUpdated) {
    //             catchError400_3(req, res, next)
    //         }

    //         proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
    //         if (!proyecto) {
    //             catchError401_1(req, res, next)
    //         }
            
    //         data.slide = 0
    //         const csrfToken = csrfTokens.create(req.csrfSecret);
    //         setTimeout(() => {
    //             return res.render('projectWonSelectedDetail', {
    //                 proyecto,
    //                 username,
    //                 userInfo,
    //                 expires,
    //                 cliente,
    //                 data,
    //                 csrfToken
    //             })
    //         }, 1000)

    //     } catch (err) {
    //         catchError500(err, req, res, next)
    //     }
    // }

    // -----------------------------------------------------------
    // addInfoProgramacionPrimera = async (req, res, next) => {
    //     const id = req.params.id
    //     let username = res.locals.username
    //     let userInfo = res.locals.userInfo
    //     const expires = cookie(req)
        
    //     try {
    //         const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
    //         !mainProyecto ? catchError400(req, res, next) : null

    //         const clientId = req.body.clientIdHidden
    //         const cliente = await this.clients.selectClientById(clientId)     
    //         if (!cliente) {
    //             catchError401(req, res, next)
    //         }
            
    //         const projectId = req.body.projectIdHidden
    //         let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
    //         if (!proyecto) {
    //             catchError401_1(req, res, next)
    //         }

    //         const userId = userInfo.id
    //         const userCreator = await this.users.getUserById(userId)
    //         if (!userCreator) {
    //             catchError401_3(req, res, next)
    //         }
            
    //         const ociNumberK = parseInt(req.body.ociNumberK)
    //         const resultado = req.body.detalleNumberK.split(",")

    //         const arrayDetalleKNumber = resultado.map(item => {
    //             const partes = item.split('_'); // Dividir la cadena por "_"
    //             return parseInt(partes[partes.length - 1]); // Obtener el último número y convertirlo a entero
    //         });
    //         const arrayDetalleNumberK = arrayDetalleKNumber //.map(Number)

    //         const arrayOtKNumber = req.body.otNumberK.split(",")
    //         const arrayOtNumberK = arrayOtKNumber.map(Number) 
    //         const otQuantity = parseInt(req.body.otQuantity)
    //         const detallesQuantity = parseInt(req.body.detallesQuantity)
    //         const totalDetallesQuantity = parseInt(req.body.totalDetallesQuantity)

    //         let arrayIdDetalle=[], arrayOtNumber=[], arrayOtStatus=[], arrayDetalleNumber=[],
    //             arrayRt=[], arrayEstadoRt=[], arrayRevisionRt=[],
    //             arrayPreparacionGeo=[], arrayEstadoPreparacionGeo=[], arrayRevisionPreparacionGeo=[],
    //             arrayPrograma2d=[], arrayEstadoPrograma2d=[], arrayRevisionPrograma2d=[]

    //         const prefixes = [
    //             { prefix: 'detalleIdHidden', array: arrayIdDetalle },
    //             { prefix: 'otNumberHidden', array: arrayOtNumber },
    //             { prefix: 'otStatusHidden', array: arrayOtStatus },
    //             { prefix: 'detalleNumberHidden', array: arrayDetalleNumber },
    //             { prefix: 'rtHidden', array: arrayRt },
    //             { prefix: 'estadoRtHidden', array: arrayEstadoRt },
    //             { prefix: 'revisionRtHidden', array: arrayRevisionRt },
    //             { prefix: 'preparacionGeoHidden', array: arrayPreparacionGeo },
    //             { prefix: 'estadoPreparacionGeoHidden', array: arrayEstadoPreparacionGeo },
    //             { prefix: 'revisionPreparacionGeoHidden', array: arrayRevisionPreparacionGeo },
    //             { prefix: 'programa2dHidden', array: arrayPrograma2d },
    //             { prefix: 'estadoPrograma2dHidden', array: arrayEstadoPrograma2d },
    //             { prefix: 'revisionPrograma2dHidden', array: arrayRevisionPrograma2d }
    //         ];
            
    //         for (const key in req.body) {
    //             const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
    //             match ? match.array.push(req.body[key]) : null
    //         }
            
    //         let arrayInfoAddedToDetail = []
    //         for (let i=0; i<detallesQuantity; i++ ) {

    //             let rtUser, preparacionGeoUser, programa2dUser
    //             let rtUserToShow, preparacionGeoUserToShow, programa2dUserToShow
    //             arrayRt[i] == 'sinDato' || arrayRt[i] == 'S/D' ?
    //                 rtUser = 'sinDato'
    //             :
    //                 tieneNumeros(arrayRt[i]) ? rtUser = await this.users.getUserById(arrayRt[i]) : rtUser = arrayRt[i]
                
    //             arrayPreparacionGeo[i] == 'sinDato' || arrayPreparacionGeo[i] == 'S/D' ?
    //                 preparacionGeoUser = 'sinDato'
    //             :    
    //                 tieneNumeros(arrayPreparacionGeo[i]) ? preparacionGeoUser = await this.users.getUserById(arrayPreparacionGeo[i]) : preparacionGeoUser = arrayPreparacionGeo[i]
                
    //             arrayPrograma2d[i] == 'sinDato' || arrayPrograma2d[i] == 'S/D' ?
    //                 programa2dUser = 'sinDato'
    //             :        
    //                 tieneNumeros(arrayPrograma2d[i]) ? programa2dUser = await this.users.getUserById(arrayPrograma2d[i]) : programa2dUser = arrayPrograma2d[i]

    //             rtUser == 'sinDato' ? rtUserToShow = 'sinDato' : esStringUObjeto(rtUser) ? rtUserToShow = `${rtUser.name} ${rtUser.lastName}` : rtUserToShow = rtUser
    //             preparacionGeoUser == 'sinDato' ? preparacionGeoUserToShow = 'sinDato' : esStringUObjeto(preparacionGeoUser) ? preparacionGeoUserToShow = `${preparacionGeoUser.name} ${preparacionGeoUser.lastName}` : preparacionGeoUserToShow = preparacionGeoUser
    //             programa2dUser == 'sinDato' ? programa2dUserToShow = 'sinDato' : esStringUObjeto(programa2dUser) ? programa2dUserToShow = `${programa2dUser.name} ${programa2dUser.lastName}` : programa2dUserToShow = programa2dUser

    //             var infoAddedToOt = {
    //                 idDetalle: arrayIdDetalle[i],
    //                 otStatus: arrayOtStatus[i],
    //                 otNumber: parseInt(arrayOtNumber[i]),
    //                 detalleNumber: arrayDetalleNumber[i],
    //                 rt: rtUserToShow || "sinDato",
    //                 estadoRt: arrayEstadoRt[i] || "sinDato",
    //                 revisionRt: parseInt(arrayRevisionRt[i]) || 0,
    //                 preparacionGeo: preparacionGeoUserToShow || "sinDato",
    //                 estadoPreparacionGeo: arrayEstadoPreparacionGeo[i] || "sinDato",
    //                 revisionPreparacionGeo: parseInt(arrayRevisionPreparacionGeo[i]) || 0,
    //                 programa2d: programa2dUserToShow || "sinDato",
    //                 estadoPrograma2d: arrayEstadoPrograma2d[i] || "sinDato",
    //                 revisionPrograma2d: parseInt(arrayRevisionPrograma2d[i]) || 0,
    //                 timestamp: formatDate(),
    //                 creator: dataUserCreator(userCreator),
    //                 modificator: dataUserModificatorEmpty(),
    //                 modifiedOn: "",
    //             }
    //             arrayInfoAddedToDetail.push(infoAddedToOt)
    //         }
    //         //console.log('arrayInfoAddedToDetail-controller', arrayInfoAddedToDetail)

    //         const itemUpdated = await this.ajustes.addInfoProgramacionPrimera(
    //             projectId,
    //             otQuantity,
    //             ociNumberK,
    //             arrayOtNumberK,
    //             arrayDetalleNumberK,
    //             detallesQuantity,
    //             totalDetallesQuantity,
    //             arrayInfoAddedToDetail
    //         )
    
    //         if (!itemUpdated) {
    //             catchError400_3(req, res, next)
    //         }

    //         proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
    //         if (!proyecto) {
    //             catchError401_1(req, res, next)
    //         }

    //         data.slide = 1
    //         const csrfToken = csrfTokens.create(req.csrfSecret);
    //         setTimeout(() => {
    //             return res.render('projectWonSelectedDetail', {
    //                 proyecto,
    //                 username,
    //                 userInfo,
    //                 expires,
    //                 cliente,
    //                 data,
    //                 csrfToken
    //             })
    //         }, 1000)

    //     } catch (err) {
    //         catchError500(err, req, res, next)
    //     }
    // }

    // -----------------------------------------------------------
    // addInfoProgramacionSegunda = async (req, res, next) => {
    //     const id = req.params.id
    //     let username = res.locals.username
    //     let userInfo = res.locals.userInfo
    //     const expires = cookie(req)
        
    //     try {
    //         const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
    //         !mainProyecto ? catchError400(req, res, next) : null

    //         const clientId = req.body.clientIdHidden
    //         const cliente = await this.clients.selectClientById(clientId)     
    //         if (!cliente) {
    //             catchError401(req, res, next)
    //         }
            
    //         const projectId = req.body.projectIdHidden
    //         let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
    //         if (!proyecto) {
    //             catchError401_1(req, res, next)
    //         }

    //         const userId = userInfo.id
    //         const userCreator = await this.users.getUserById(userId)
    //         if (!userCreator) {
    //             catchError401_3(req, res, next)
    //         }
            
    //         const ociNumberK = parseInt(req.body.ociNumberK)
    //         const resultado = req.body.detalleNumberK.split(",")

    //         const arrayDetalleKNumber = resultado.map(item => {
    //             const partes = item.split('_'); // Dividir la cadena por "_"
    //             return parseInt(partes[partes.length - 1]); // Obtener el último número y convertirlo a entero
    //         });
    //         const arrayDetalleNumberK = arrayDetalleKNumber //.map(Number)

    //         const arrayOtKNumber = req.body.otNumberK.split(",")
    //         const arrayOtNumberK = arrayOtKNumber.map(Number) 
    //         const otQuantity = parseInt(req.body.otQuantity)
    //         const detallesQuantity = parseInt(req.body.detallesQuantity)
    //         const totalDetallesQuantity = parseInt(req.body.totalDetallesQuantity)

    //         let arrayIdDetalle=[], arrayOtNumber=[], arrayOtStatus=[], arrayDetalleNumber=[],
    //             arrayPrograma3d2F=[], arrayEstadoPrograma3d2F=[], arrayRevisionPrograma3d2F=[],
    //             arrayPrograma3d4F=[], arrayEstadoPrograma3d4F=[], arrayRevisionPrograma3d4F=[],
    //             arrayNotasProgramacion=[], arrayRevisionNotasProgramacion=[]

    //         const prefixes = [
    //             { prefix: 'detalleIdHidden', array: arrayIdDetalle },
    //             { prefix: 'otNumberHidden', array: arrayOtNumber },
    //             { prefix: 'otStatusHidden', array: arrayOtStatus },
    //             { prefix: 'detalleNumberHidden', array: arrayDetalleNumber },
    //             { prefix: 'programa3d2FHidden', array: arrayPrograma3d2F },
    //             { prefix: 'estadoPrograma3d2FHidden', array: arrayEstadoPrograma3d2F },
    //             { prefix: 'revisionPrograma3d2FHidden', array: arrayRevisionPrograma3d2F },
    //             { prefix: 'programa3d4FHidden', array: arrayPrograma3d4F },
    //             { prefix: 'estadoPrograma3d4FHidden', array: arrayEstadoPrograma3d4F },
    //             { prefix: 'revisionPrograma3d4FHidden', array: arrayRevisionPrograma3d4F },
    //             { prefix: 'notasProgramacionHidden', array: arrayNotasProgramacion },
    //             { prefix: 'revisionNotasProgramacionHidden', array: arrayRevisionNotasProgramacion }
    //         ];
            
    //         for (const key in req.body) {
    //             const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
    //             match ? match.array.push(req.body[key]) : null
    //         }
            
    //         let arrayInfoAddedToDetail = []
    //         for (let i=0; i<detallesQuantity; i++ ) {

    //             let programa3d2FUser, programa3d4FUser
    //             let programa3d2FUserToShow, programa3d4FUserToShow
    //             arrayPrograma3d2F[i] == 'sinDato' || arrayPrograma3d2F[i] == 'S/D' ?
    //                 programa3d2FUser = 'sinDato'
    //             :
    //                 tieneNumeros(arrayPrograma3d2F[i]) ? programa3d2FUser = await this.users.getUserById(arrayPrograma3d2F[i]) : programa3d2FUser = arrayPrograma3d2F[i]
                
    //             arrayPrograma3d4F[i] == 'sinDato' || arrayPrograma3d4F[i] == 'S/D' ?
    //                 programa3d4FUser = 'sinDato'
    //             :    
    //                 tieneNumeros(arrayPrograma3d4F[i]) ? programa3d4FUser = await this.users.getUserById(arrayPrograma3d4F[i]) : programa3d4FUser = arrayPrograma3d4F[i]
                
    //             programa3d2FUser == 'sinDato' ? programa3d2FUserToShow = 'sinDato' : esStringUObjeto(programa3d2FUser) ? programa3d2FUserToShow = `${programa3d2FUser.name} ${programa3d2FUser.lastName}` : programa3d2FUserToShow = programa3d2FUser
    //             programa3d4FUser == 'sinDato' ? programa3d4FUserToShow = 'sinDato' : esStringUObjeto(programa3d4FUser) ? programa3d4FUserToShow = `${programa3d4FUser.name} ${programa3d4FUser.lastName}` : programa3d4FUserToShow = programa3d4FUser
                
    //             var infoAddedToOt = {
    //                 idDetalle: arrayIdDetalle[i],
    //                 otStatus: arrayOtStatus[i],
    //                 otNumber: parseInt(arrayOtNumber[i]),
    //                 detalleNumber: arrayDetalleNumber[i],
    //                 programa3d2F: programa3d2FUserToShow || "sinDato",
    //                 estadoPrograma3d2F: arrayEstadoPrograma3d2F[i] || "sinDato",
    //                 revisionPrograma3d2F: parseInt(arrayRevisionPrograma3d2F[i]) || 0,
    //                 programa3d4F: programa3d4FUserToShow || "sinDato",
    //                 estadoPrograma3d4F: arrayEstadoPrograma3d4F[i] || "sinDato",
    //                 revisionPrograma3d4F: parseInt(arrayRevisionPrograma3d4F[i]) || 0,
    //                 notasProgramacion: arrayNotasProgramacion[i] || "sinDato",
    //                 revisionNotasProgramacion: parseInt(arrayRevisionNotasProgramacion[i]) || 0,
    //                 timestamp: formatDate(),
    //                 creator: dataUserCreator(userCreator),
    //                 modificator: dataUserModificatorEmpty(),
    //                 modifiedOn: "",
    //             }
    //             arrayInfoAddedToDetail.push(infoAddedToOt)
    //         }
    //         //console.log('arrayInfoAddedToDetail-controller', arrayInfoAddedToDetail)

    //         const itemUpdated = await this.ajustes.addInfoProgramacionSegunda(
    //             projectId,
    //             otQuantity,
    //             ociNumberK,
    //             arrayOtNumberK,
    //             arrayDetalleNumberK,
    //             detallesQuantity,
    //             totalDetallesQuantity,
    //             arrayInfoAddedToDetail
    //         )
    
    //         if (!itemUpdated) {
    //             catchError400_3(req, res, next)
    //         }

    //         proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
    //         if (!proyecto) {
    //             catchError401_1(req, res, next)
    //         }

    //         data.slide = 2
    //         const csrfToken = csrfTokens.create(req.csrfSecret);
    //         setTimeout(() => {
    //             return res.render('projectWonSelectedDetail', {
    //                 proyecto,
    //                 username,
    //                 userInfo,
    //                 expires,
    //                 cliente,
    //                 data,
    //                 csrfToken
    //             })
    //         }, 1000)

    //     } catch (err) {
    //         catchError500(err, req, res, next)
    //     }
    // }

    // -----------------------------------------------------------
    // addInfoMecanizadoPrimera = async (req, res, next) => {
    //     const id = req.params.id
    //     let username = res.locals.username
    //     let userInfo = res.locals.userInfo
    //     const expires = cookie(req)
        
    //     try {
    //         const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
    //         !mainProyecto ? catchError400(req, res, next) : null

    //         const clientId = req.body.clientIdHidden
    //         const cliente = await this.clients.selectClientById(clientId)     
    //         if (!cliente) {
    //             catchError401(req, res, next)
    //         }
            
    //         const projectId = req.body.projectIdHidden
    //         let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
    //         if (!proyecto) {
    //             catchError401_1(req, res, next)
    //         }

    //         const userId = userInfo.id
    //         const userCreator = await this.users.getUserById(userId)
    //         if (!userCreator) {
    //             catchError401_3(req, res, next)
    //         }
            
    //         const ociNumberK = parseInt(req.body.ociNumberK)
    //         const resultado = req.body.detalleNumberK.split(",")

    //         const arrayDetalleKNumber = resultado.map(item => {
    //             const partes = item.split('_'); // Dividir la cadena por "_"
    //             return parseInt(partes[partes.length - 1]); // Obtener el último número y convertirlo a entero
    //         });
    //         const arrayDetalleNumberK = arrayDetalleKNumber //.map(Number)

    //         const arrayOtKNumber = req.body.otNumberK.split(",")
    //         const arrayOtNumberK = arrayOtKNumber.map(Number) 
    //         const otQuantity = parseInt(req.body.otQuantity)
    //         const detallesQuantity = parseInt(req.body.detallesQuantity)
    //         const totalDetallesQuantity = parseInt(req.body.totalDetallesQuantity)

    //         let arrayIdDetalle=[], arrayOtNumber=[], arrayOtStatus=[], arrayDetalleNumber=[],
    //             arrayFCero=[], arrayEstadoFCero=[], arrayRevisionFCero=[],
    //             arrayFUno=[], arrayEstadoFUno=[], arrayRevisionFUno=[],
    //             arrayFDos=[], arrayEstadoFDos=[], arrayRevisionFDos=[]

    //         const prefixes = [
    //             { prefix: 'detalleIdHidden', array: arrayIdDetalle },
    //             { prefix: 'otNumberHidden', array: arrayOtNumber },
    //             { prefix: 'otStatusHidden', array: arrayOtStatus },
    //             { prefix: 'detalleNumberHidden', array: arrayDetalleNumber },
    //             { prefix: 'fCeroHidden', array: arrayFCero },
    //             { prefix: 'estadoFCeroHidden', array: arrayEstadoFCero },
    //             { prefix: 'revisionFCeroHidden', array: arrayRevisionFCero },
    //             { prefix: 'fUnoHidden', array: arrayFUno },
    //             { prefix: 'estadoFUnoHidden', array: arrayEstadoFUno },
    //             { prefix: 'revisionFUnoHidden', array: arrayRevisionFUno },
    //             { prefix: 'fDosHidden', array: arrayFDos },
    //             { prefix: 'estadoFDosHidden', array: arrayEstadoFDos },
    //             { prefix: 'revisionFDosHidden', array: arrayRevisionFDos }
    //         ];
            
    //         for (const key in req.body) {
    //             const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
    //             match ? match.array.push(req.body[key]) : null
    //         }
            
    //         let arrayInfoAddedToDetail = []
    //         for (let i=0; i<detallesQuantity; i++ ) {

    //             let fCeroTool, fUnoTool, fDosTool
    //             let fCeroToolToShow, fUnoToolToShow, fDosToolToShow
    //             arrayFCero[i] == 'sinDato' || arrayFCero[i] == 'S/D' ?
    //                 fCeroTool = 'sinDato'
    //             :
    //                 tieneNumeros(arrayFCero[i]) ? fCeroTool = await this.tools.getToolById(arrayFCero[i]) : fCeroTool = arrayFCero[i]
                
    //             arrayFUno[i] == 'sinDato' || arrayFUno[i] == 'S/D' ?
    //                 fUnoTool = 'sinDato'
    //             :    
    //                 tieneNumeros(arrayFUno[i]) ? fUnoTool = await this.tools.getToolById(arrayFUno[i]) : fUnoTool = arrayFUno[i]
                
    //             arrayFDos[i] == 'sinDato' || arrayFDos[i] == 'S/D' ?
    //                 fDosTool = 'sinDato'
    //             :        
    //                 tieneNumeros(arrayFDos[i]) ? fDosTool = await this.tools.getToolById(arrayFDos[i]) : fDosTool = arrayFDos[i]

    //             fCeroTool == 'sinDato' ? fCeroToolToShow = 'sinDato' : esStringUObjeto(fCeroTool) ? fCeroToolToShow = `${fCeroTool.designation}` : fCeroToolToShow = fCeroTool
    //             fUnoTool == 'sinDato' ? fUnoToolToShow = 'sinDato' : esStringUObjeto(fUnoTool) ? fUnoToolToShow = `${fUnoTool.designation}` : fUnoToolToShow = fUnoTool
    //             fDosTool == 'sinDato' ? fDosToolToShow = 'sinDato' : esStringUObjeto(fDosTool) ? fDosToolToShow = `${fDosTool.designation}` : fDosToolToShow = fDosTool

    //             var infoAddedToOt = {
    //                 idDetalle: arrayIdDetalle[i],
    //                 otStatus: arrayOtStatus[i],
    //                 otNumber: parseInt(arrayOtNumber[i]),
    //                 detalleNumber: arrayDetalleNumber[i],
    //                 fCero: fCeroToolToShow || "sinDato",
    //                 estadoFCero: arrayEstadoFCero[i] || "sinDato",
    //                 revisionFCero: parseInt(arrayRevisionFCero[i]) || 0,
    //                 fUno: fUnoToolToShow || "sinDato",
    //                 estadoFUno: arrayEstadoFUno[i] || "sinDato",
    //                 revisionFUno: parseInt(arrayRevisionFUno[i]) || 0,
    //                 fDos: fDosToolToShow || "sinDato",
    //                 estadoFDos: arrayEstadoFDos[i] || "sinDato",
    //                 revisionFDos: parseInt(arrayRevisionFDos[i]) || 0,
    //                 timestamp: formatDate(),
    //                 creator: dataUserCreator(userCreator),
    //                 modificator: dataUserModificatorEmpty(),
    //                 modifiedOn: "",
    //             }
    //             arrayInfoAddedToDetail.push(infoAddedToOt)
    //         }
    //         // console.log('arrayInfoAddedToDetail-controller', arrayInfoAddedToDetail)

    //         const itemUpdated = await this.ajustes.addInfoMecanizadoPrimera(
    //             projectId,
    //             otQuantity,
    //             ociNumberK,
    //             arrayOtNumberK,
    //             arrayDetalleNumberK,
    //             detallesQuantity,
    //             totalDetallesQuantity,
    //             arrayInfoAddedToDetail
    //         )
    
    //         if (!itemUpdated) {
    //             catchError400_3(req, res, next)
    //         }

    //         proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
    //         if (!proyecto) {
    //             catchError401_1(req, res, next)
    //         }

    //         data.slide = 3
    //         const csrfToken = csrfTokens.create(req.csrfSecret);
    //         setTimeout(() => {
    //             return res.render('projectWonSelectedDetail', {
    //                 proyecto,
    //                 username,
    //                 userInfo,
    //                 expires,
    //                 cliente,
    //                 data,
    //                 csrfToken
    //             })
    //         }, 1000)

    //     } catch (err) {
    //         catchError500(err, req, res, next)
    //     }
    // }

    // -----------------------------------------------------------
    // addInfoMecanizadoSegunda = async (req, res, next) => {
    //     const id = req.params.id
    //     let username = res.locals.username
    //     let userInfo = res.locals.userInfo
    //     const expires = cookie(req)
        
    //     try {
    //         const mainProyecto = await this.projects.selectProjectsByMainProjectId(id)
    //         !mainProyecto ? catchError400(req, res, next) : null

    //         const clientId = req.body.clientIdHidden
    //         const cliente = await this.clients.selectClientById(clientId)     
    //         if (!cliente) {
    //             catchError401(req, res, next)
    //         }
            
    //         const projectId = req.body.projectIdHidden
    //         let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
    //         if (!proyecto) {
    //             catchError401_1(req, res, next)
    //         }

    //         const userId = userInfo.id
    //         const userCreator = await this.users.getUserById(userId)
    //         if (!userCreator) {
    //             catchError401_3(req, res, next)
    //         }
            
    //         const ociNumberK = parseInt(req.body.ociNumberK)
    //         const resultado = req.body.detalleNumberK.split(",")

    //         const arrayDetalleKNumber = resultado.map(item => {
    //             const partes = item.split('_'); // Dividir la cadena por "_"
    //             return parseInt(partes[partes.length - 1]); // Obtener el último número y convertirlo a entero
    //         });
    //         const arrayDetalleNumberK = arrayDetalleKNumber //.map(Number)

    //         const arrayOtKNumber = req.body.otNumberK.split(",")
    //         const arrayOtNumberK = arrayOtKNumber.map(Number) 
    //         const otQuantity = parseInt(req.body.otQuantity)
    //         const detallesQuantity = parseInt(req.body.detallesQuantity)
    //         const totalDetallesQuantity = parseInt(req.body.totalDetallesQuantity)

    //         let arrayIdDetalle=[], arrayOtNumber=[], arrayOtStatus=[], arrayDetalleNumber=[],
    //             arrayFTres=[], arrayEstadoFTres=[], arrayRevisionFTres=[],
    //             arrayFCuatro=[], arrayEstadoFCuatro=[], arrayRevisionFCuatro=[],
    //             arrayNotasMecanizado=[], arrayRevisionNotasMecanizado=[]

    //         const prefixes = [
    //             { prefix: 'detalleIdHidden', array: arrayIdDetalle },
    //             { prefix: 'otNumberHidden', array: arrayOtNumber },
    //             { prefix: 'otStatusHidden', array: arrayOtStatus },
    //             { prefix: 'detalleNumberHidden', array: arrayDetalleNumber },
    //             { prefix: 'fTresHidden', array: arrayFTres },
    //             { prefix: 'estadoFTresHidden', array: arrayEstadoFTres },
    //             { prefix: 'revisionFTresHidden', array: arrayRevisionFTres },
    //             { prefix: 'fCuatroHidden', array: arrayFCuatro },
    //             { prefix: 'estadoFCuatroHidden', array: arrayEstadoFCuatro },
    //             { prefix: 'revisionFCuatroHidden', array: arrayRevisionFCuatro },
    //             { prefix: 'notasMecanizadoHidden', array: arrayNotasMecanizado },
    //             { prefix: 'revisionNotasMecanizadoHidden', array: arrayRevisionNotasMecanizado }
    //         ];
            
    //         for (const key in req.body) {
    //             const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
    //             match ? match.array.push(req.body[key]) : null
    //         }
            
    //         let arrayInfoAddedToDetail = []
    //         for (let i=0; i<detallesQuantity; i++ ) {

    //             let fTresTool, fCuatroTool
    //             let fTresToolToShow, fCuatroToolToShow
    //             arrayFTres[i] == 'sinDato' || arrayFTres[i] == 'S/D' ?
    //                 fTresTool = 'sinDato'
    //             :
    //                 tieneNumeros(arrayFTres[i]) ? fTresTool = await this.tools.getToolById(arrayFTres[i]) : fTresTool = arrayFTres[i]
                
    //             arrayFCuatro[i] == 'sinDato' || arrayFCuatro[i] == 'S/D' ?
    //                 fCuatroTool = 'sinDato'
    //             :    
    //                 tieneNumeros(arrayFCuatro[i]) ? fCuatroTool = await this.tools.getToolById(arrayFCuatro[i]) : fCuatroTool = arrayFCuatro[i]
                
    //             fTresTool == 'sinDato' ? fTresToolToShow = 'sinDato' : esStringUObjeto(fTresTool) ? fTresToolToShow = `${fTresTool.designation}` : fTresToolToShow = fTresTool
    //             fCuatroTool == 'sinDato' ? fCuatroToolToShow = 'sinDato' : esStringUObjeto(fCuatroTool) ? fCuatroToolToShow = `${fCuatroTool.designation}` : fCuatroToolToShow = fCuatroTool
                
    //             var infoAddedToOt = {
    //                 idDetalle: arrayIdDetalle[i],
    //                 otStatus: arrayOtStatus[i],
    //                 otNumber: parseInt(arrayOtNumber[i]),
    //                 detalleNumber: arrayDetalleNumber[i],
    //                 fTres: fTresToolToShow || "sinDato",
    //                 estadoFTres: arrayEstadoFTres[i] || "sinDato",
    //                 revisionFTres: parseInt(arrayRevisionFTres[i]) || 0,
    //                 fCuatro: fCuatroToolToShow || "sinDato",
    //                 estadoFCuatro: arrayEstadoFCuatro[i] || "sinDato",
    //                 revisionFCuatro: parseInt(arrayRevisionFCuatro[i]) || 0,
    //                 notasMecanizado: arrayNotasMecanizado[i] || "sinDato",
    //                 revisionNotasMecanizado: parseInt(arrayRevisionNotasMecanizado[i]) || 0,
    //                 timestamp: formatDate(),
    //                 creator: dataUserCreator(userCreator),
    //                 modificator: dataUserModificatorEmpty(),
    //                 modifiedOn: "",
    //             }
    //             arrayInfoAddedToDetail.push(infoAddedToOt)
    //         }
    //         console.log('arrayInfoAddedToDetail-controller', arrayInfoAddedToDetail)

    //         const itemUpdated = await this.ajustes.addInfoMecanizadoSegunda(
    //             projectId,
    //             otQuantity,
    //             ociNumberK,
    //             arrayOtNumberK,
    //             arrayDetalleNumberK,
    //             detallesQuantity,
    //             totalDetallesQuantity,
    //             arrayInfoAddedToDetail
    //         )
    
    //         if (!itemUpdated) {
    //             catchError400_3(req, res, next)
    //         }

    //         proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
    //         if (!proyecto) {
    //             catchError401_1(req, res, next)
    //         }

    //         data.slide = 4
    //         const csrfToken = csrfTokens.create(req.csrfSecret);
    //         setTimeout(() => {
    //             return res.render('projectWonSelectedDetail', {
    //                 proyecto,
    //                 username,
    //                 userInfo,
    //                 expires,
    //                 cliente,
    //                 data,
    //                 csrfToken
    //             })
    //         }, 1000)

    //     } catch (err) {
    //         catchError500(err, req, res, next)
    //     }
    // }
}

module.exports = {
    AjustesController
}