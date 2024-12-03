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

    //-------------------------------------------------------------
    addInfoOtArmado = async (req, res, next) => {
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
            let proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            if (!proyecto) {
                catchError401_1(req, res, next)
            }

            const userId = userInfo.id
            const userCreator = await this.users.getUserById(userId)
            if (!userCreator) {
                catchError401_3(req, res, next)
            }
            
            const ociNumberK = parseInt(req.body.ociNumberK)
            const otQuantity = parseInt(req.body.otQuantity)
            const arrayOtKNumber = req.body.otNumberK.split(",")
            const arrayOtNumberK = arrayOtKNumber.map(Number) 

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
            
            let arrayInfoAddedToOt = []
            for (let i=0; i<otQuantity; i++ ) {
                var infoAddedToOt = {
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
                    timestamp: formatDate(),
                    creator: dataUserCreator(userCreator),
                    modificator: dataUserModificatorEmpty(),
                    modifiedOn: "",
                }
                arrayInfoAddedToOt.push(infoAddedToOt)
            }
            console.log(arrayInfoAddedToOt)

            const itemUpdated = await this.ajustes.addInfoOtArmado(
                projectId,
                otQuantity,
                ociNumberK,
                arrayOtNumberK,
                arrayInfoAddedToOt
            )
    
            if (!itemUpdated) {
                catchError400_3(req, res, next)
            }

            proyecto = await this.projects.selectProjectsByMainProjectId(projectId)
            if (!proyecto) {
                catchError401_4(req, res, next)
            }
            
            data.slide = 0
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                return res.render('projectAjusteSelected', {
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

}

module.exports = {
    AjustesController
}