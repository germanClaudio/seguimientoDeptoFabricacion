const UserService = require("../services/users.service.js"),
    ToolService = require("../services/tools.service.js"),

    csrf = require('csrf'),
    csrfTokens = csrf(),

    toolPictureNotFound = "https://storage.googleapis.com/imagenesproyectosingenieria/upload/ToolsImages/noImageFound.png"
    cookie = require('../utils/cookie.js'),

    data = require('../utils/variablesInicializator.js'),

    { uploadToGCS } = require("../utils/uploadFilesToGSC.js"),
    { uploadMulterSingleImageTool } = require("../utils/uploadMulter.js"),
    { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty } = require('../utils/generateUsers.js')

const {catchError400_3,
    catchError400_5,
    catchError400_6,
    catchError401_3,
    catchError500
} = require('../utils/catchErrors.js')

let formatDate = require('../utils/formatDate.js')

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
        let username = res.locals.username,
            userInfo = res.locals.userInfo;
        const expires = cookie(req)

        //------ Storage New Tool Image in Google Store --------        
        uploadMulterSingleImageTool(req, res, async (err) => {
            try {
                // console.log('req.file: ', req.file)
                req.file ? await uploadToGCS(req, res, next) : null

                let userManager = await this.users.getUserByUsername(username);
                const userId = userManager._id,
                    userCreator = await this.users.getUserById(userId)
                !userCreator ? catchError401_3(req, res, next) : null

                const designationInput = req.body.designation.replace(/[!@#$%^&*]/g, ""),
                    codeInput = req.body.code,
                    modelInput = req.body.model

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
                        model: modelInput,
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
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        uploadMulterSingleImageTool(req, res, async (err) => {
            try {
                req.file ? await uploadToGCS(req, res, next) : null

                const toolId = id,
                    toolToModify = await this.tools.getToolById(toolId)

                let maquinasRestantes
                const toolInput = req.body.designation.replace(/[!@#$%^&* ]/g, ""),
                    designationValid = await this.tools.getToolByDesignation(toolInput),
                    otherTools = await this.tools.getAllTools()
                
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

                    const codeInput = req.body.code,
                        codesId = maquinasRestantes.map(maquina => maquina.code);
                    
                    if (codesId.includes(toolToModify.code)) {
                        const err = new Error (`Ya existe una Maquina con este Código #${codeInput}!`)
                        err.statusCode = 400
                        return next(err);
                    }

                    const modelInput = req.body.model,
                        modelsId = maquinasRestantes.map(maquina => maquina.model);
                    
                    if (modelsId.includes(toolToModify.model)) {
                        const err = new Error (`Ya existe una Maquina con este Modelo #${modelInput}!`)
                        err.statusCode = 400
                        return next(err);
                    }
                }    

                const userLogged = await this.users.getUserByUsername(username);
                !userLogged.visible ? catchError401_3(req, res, next) : null

                let updatedTool = {
                    designation: req.body.designation,
                    code: req.body.code,
                    model: req.body.model,
                    type: req.body.typeHidden,
                    characteristics: req.body.characteristics,
                    imageTool: req.body.imageTextImageTool,
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
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const toolToDelete = await this.tools.getToolById(id)
            !toolToDelete ? catchError401_3(req, res, next) : null

            const userId = userInfo.id,
                userLogged = await this.users.getUserById(userId)
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