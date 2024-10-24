const UserService = require("../services/users.service.js")
const ToolService = require("../services/tools.service.js")

const { uploadToGCS } = require("../utils/uploadFilesToGSC.js")
const { uploadMulterSingleImageTool } = require("../utils/uploadMulter.js")

let formatDate = require('../utils/formatDate.js')

const csrf = require('csrf');
const csrfTokens = csrf();

let toolPictureNotFound = "../../../src/images/upload/toolsImages/noImageFound.png"
const cookie = require('../utils/cookie.js')

const data = require('../utils/variablesInicializator.js')

const { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty } = require('../utils/generateUsers.js')

const {catchError400_3,
        catchError400_5,
        catchError400_6,
        catchError401_3,
        catchError500
} = require('../utils/catchErrors.js')

class ToolsController {  
    constructor(){
        this.users = new UserService()
        this.tools = new ToolService()
    }

    getAllTools = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const maquinas = await this.tools.getAllTools()
            !maquinas ? catchError400_5(req, res, next) : null

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewTool', {
                username,
                userInfo,
                expires,
                maquinas,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getToolById = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const maquina = await this.tools.getToolById(id)           
            !maquina ? catchError401_3(req, res, next) : null

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('toolDetails', {
                username,
                userInfo,
                expires,
                maquina,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getToolByDesignation = async (req, res, next) => {
        const { designation } = req.params
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const maquina = await this.tools.getToolByToolname(designation)
            !maquina ? catchError401_3(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('toolDetails', {
                maquina,
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

    createNewTool = async (req, res, next) => {
        let username = res.locals.username;
        let userInfo = res.locals.userInfo;
        const expires = cookie(req)

        //------ Storage New Tool Image in Google Store --------        
        uploadMulterSingleImageTool(req, res, async (err) => {
            try {
                if (req.file) {
                    await uploadToGCS(req, res, next)
                }

                let userManager = await this.users.getUserByUsername(username);
                const userId = userManager._id;
                const userCreator = await this.users.getUserById(userId);
                !userCreator ? catchError401_3(req, res, next) : null

                const designationInput = req.body.designation.replace(/[!@#$%^&*]/g, "");
                const codeInput = req.body.code;

                const newToolValid = {
                    designation: designationInput,
                    code: codeInput
                };

                const toolExist = await this.tools.getExistingTool(newToolValid);
                if (toolExist) {
                    catchError400_6(req, res, next)
                } else {
                        const newTool = {
                        designation: designationInput,
                        code: codeInput,
                        type: req.body.type,
                        characteristics: req.body.characteristics,
                        imageTool: req.body.imageTextImageTool || toolPictureNotFound,
                        status: req.body.status === 'on' ? Boolean(true) : Boolean(false) || Boolean(true),
                        creator: dataUserCreator(userCreator),
                        timestamp: formatDate(),
                        modificator: dataUserModificatorEmpty(),
                        modifiedOn: '',
                        visible: true
                    };

                    const maquina = await this.tools.addNewTool(newTool);
                    !maquina ? catchError400_6(req, res, next) : null

                    const usuarioLog = await this.users.getUserByUsername(username);
                    !usuarioLog.visible ? catchError401_3(req, res, next) : null

                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    return res.render('addNewTool', {
                        username,
                        userInfo,
                        expires,
                        data,
                        csrfToken,
                        maquina
                    });
                }

            } catch (err) {
                catchError500(err, req, res, next)
            }
        })
    }
    
    updateTool = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        uploadMulterSingleImageTool(req, res, async (err) => {
            try {
                if (req.file) {
                    await uploadToGCS(req, res, next)
                }
                
                const toolId = id
                const toolToModify = await this.tools.getToolById(toolId)

                const toolInput = req.body.designation.replace(/[!@#$%^&* ]/g, "")
                let maquinasRestantes
                const designationValid = await this.tools.getToolByDesignation(toolInput)
                const otherTools = await this.tools.getAllTools()
                
                // Función para eliminar una maquina de la lista si coincide con la maquina a comparar
                function eliminarMaquina(lista, maquina) {
                    return lista.filter(h => {
                        return h._id.toString() !== maquina._id.toString()
                    })
                }
                
                // Eliminar la maquina de la lista
                if (designationValid) {
                    maquinasRestantes = eliminarMaquina(otherTools, designationValid)

                    const designations = maquinasRestantes.map(maquina => maquina.designation)
                    if (designations.includes(toolToModify.designation)) {
                        const err = new Error (`Ya existe una Maquina con esta designación: ${toolInput}!`)
                        err.statusCode = 400
                        return next(err);
                    }

                    const codeInput = req.body.code
                    const codesId = maquinasRestantes.map(maquina => maquina.code);
                    
                    if (codesId.includes(toolToModify.code)) {
                        const err = new Error (`Ya existe una Maquina con este Código #${codeInput}!`)
                        err.statusCode = 400
                        return next(err);
                    }
                }    

                const userLogged = await this.users.getUserByUsername(username);
                !userLogged.visible ? catchError401_3(req, res, next) : null

                let updatedTool = {
                    designation: req.body.designation,
                    code: req.body.code,
                    type: req.body.type,
                    characteristics: req.body.characteristics,
                    imageTool: req.body.imageTextImageToolUpdate,
                    status: req.body.status === 'on' ? Boolean(true) : Boolean(false),
                    modificator: dataUserModificatorNotEmpty(userLogged),
                    modifiedOn: formatDate()
                }

                const maquina = await this.tools.updateTool(toolId, updatedTool, dataUserModificatorNotEmpty(userLogged))
                !maquina ? catchError400_3(req, res, next) : null
                        
                const csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('addNewTool', {
                    username,
                    userInfo,
                    expires,
                    maquina,
                    data,
                    csrfToken,
                })

            } catch (err) {
                catchError500(err, req, res, next)
            }
        })
    }

    searchTools = async (req, res, next) => {
        try {
            const tools = await this.tools.getAllTools()
            !tools ? catchError400_5(req, res, next) : null
            res.send(tools)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    deleteToolById = async (req, res, next) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const toolToDelete = await this.tools.getToolById(id)
            !toolToDelete ? catchError401_3(req, res, next) : null

            const userId = userInfo.id
            const userLogged = await this.users.getUserById(userId)
            !userLogged ? catchError401_3(req, res, next) : null

            const maquina = await this.tools.deleteToolById(id, dataUserModificatorNotEmpty(userLogged))
            !maquina ? catchError401_3(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewTool', {
                username,
                userInfo,
                expires,
                maquina,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

}

module.exports = { ToolsController }