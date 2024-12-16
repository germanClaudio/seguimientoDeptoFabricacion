const UserService = require("../services/users.service.js")
const CuttingToolService = require("../services/cuttingTools.service.js")

const { uploadToGCS } = require("../utils/uploadFilesToGSC.js")
const { uploadMulterSingleImageCuttingTool } = require("../utils/uploadMulter.js")

let formatDate = require('../utils/formatDate.js')

const csrf = require('csrf');
const csrfTokens = csrf();

let cuttingToolPictureNotFound = "../../../src/images/upload/CuttingToolsImages/noImageFound.png"
const cookie = require('../utils/cookie.js')

const data = require('../utils/variablesInicializator.js')

const { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty, dataToolEmpty } = require('../utils/generateUsers.js')

function validateSelectField(value) {
    const validOptions = ['toricas', 'planas', 'esfericas', 'final', 'altoAvance', 'otras', 
        16, 20, 25, 32, 50, 52, 63, 80, 100, 125
    ]
    return validOptions.includes(value);
}

const {catchError400_3,
        catchError400_5,
        catchError400_6,
        catchError400_7,
        catchError401_3,
        catchError500
} = require('../utils/catchErrors.js')

class CuttingToolsController {  
    constructor(){
        this.users = new UserService()
        this.herramientas = new CuttingToolService()
    }

    getAllCuttingTools = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const herramientas = await this.herramientas.getAllCuttingTools()
            !herramientas ? catchError400_5(req, res, next) : null

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewCuttingTool', {
                username,
                userInfo,
                expires,
                herramientas,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getCuttingToolById = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const herramienta = await this.herramientas.getCuttingToolById(id)           
            !herramienta ? catchError401_3(req, res, next) : null

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('cuttingToolDetails', {
                username,
                userInfo,
                expires,
                herramienta,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getCuttingToolByDesignation = async (req, res, next) => {
        const { designation } = req.params,
            expires = cookie(req)
        let userInfo = res.locals.userInfo
        
        try {
            const herramienta = await this.herramientas.getCuttingToolByToolname(designation)
            !herramienta ? catchError401_3(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('cuttingToolDetails', {
                herramienta,
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

    createNewCuttingTool = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        const expires = cookie(req)

        //------ Storage New CuttingTool Image in Google Store --------        
        uploadMulterSingleImageCuttingTool(req, res, async (err) => {
            try {
                // console.log('req.file: ', req.file)
                if (req.file) {
                    await uploadToGCS(req, res, next)
                }

                let userManager = await this.users.getUserByUsername(username);
                const userId = userManager._id,
                    userCreator = await this.users.getUserById(userId)
                !userCreator ? catchError401_3(req, res, next) : null

                const designationInput = req.body.designation.replace(/[!@$%^&*]/g, ""),
                    codeInput = req.body.code,
                    diamInput = parseInt(req.body.diamHidden),
                    typeInput = req.body.type,
                    stockInput = req.body.stock

                const newCuttingToolValid = {
                    designation: designationInput,
                    code: codeInput,
                    diam: parseInt(diamInput),
                    type: typeInput
                };

                const cuttingToolExist = await this.herramientas.getExistingCuttingTool(newCuttingToolValid);
                if (cuttingToolExist) {
                    catchError400_7(req, res, next)

                } else {
                    if (validateSelectField(newCuttingToolValid.type) && validateSelectField(newCuttingToolValid.diam)) {
                        const newCuttingTool = {
                            designation: designationInput,
                            code: codeInput,
                            type: typeInput,
                            diam: diamInput,
                            characteristics: req.body.characteristics,
                            imageCuttingTool: req.body.imageTextImageCuttingTool || cuttingToolPictureNotFound,
                            status: req.body.status === 'on' ? Boolean(true) : Boolean(false) || Boolean(true),
                            creator: dataUserCreator(userCreator),
                            timestamp: formatDate(),
                            modificator: dataUserModificatorEmpty(),
                            modifiedOn: '',
                            visible: true,
                            stock: stockInput,
                            onUse: Boolean(false),
                            usingBy: dataUserModificatorEmpty(),
                            usingByTool: dataToolEmpty()
                        };
                        
                        const herramienta = await this.herramientas.addNewCuttingTool(newCuttingTool);
                        !herramienta ? catchError400_6(req, res, next) : null

                        const usuarioLog = await this.users.getUserByUsername(username);
                        !usuarioLog.visible ? catchError401_3(req, res, next) : null

                        const csrfToken = csrfTokens.create(req.csrfSecret);
                        return res.render('addNewCuttingTool', {
                            username,
                            userInfo,
                            expires,
                            data,
                            csrfToken,
                            herramienta
                        });

                    } else {
                        catchError400_3(req, res, next)
                    }
                }

            } catch (err) {
                catchError500(err, req, res, next)
            }
        })
    }
    
    updateCuttingTool = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        uploadMulterSingleImageTool(req, res, async (err) => {
            try {
                req.file ? await uploadToGCS(req, res, next) : null

                const cuttingToolId = id,
                    cuttingToolToModify = await this.herramientas.getCuttingToolById(cuttingToolId)

                let herramientasRestantes
                const cuttingToolInput = req.body.designation.replace(/[!@#$%^&* ]/g, ""),
                    designationValid = await this.herramientas.getCuttingToolByDesignation(cuttingToolInput),
                    otherCuttingTool = await this.herramientas.getAllCuttingTools()
                
                // Función para eliminar una herramienta de la lista si coincide con la herramienta a comparar
                function eliminarHerramienta(lista, herramienta) {
                    return lista.filter(h => {
                        return h._id.toString() !== herramienta._id.toString()
                    })
                }
                
                // Eliminar la herramienta de la lista
                if (designationValid) {
                    herramientasRestantes = eliminarHerramienta(otherCuttingTool, designationValid)

                    const designations = herramientasRestantes.map(herramienta => herramienta.designation)
                    if (designations.includes(cuttingToolToModify.designation)) {
                        const err = new Error (`Ya existe una Herramienta con esta designación: ${cuttingToolInput}!`)
                        err.statusCode = 400
                        return next(err);
                    }

                    const codeInput = req.body.code,
                        codesId = herramientasRestantes.map(herramienta => herramienta.code);
                    
                    if (codesId.includes(cuttingToolToModify.code)) {
                        const err = new Error (`Ya existe una Herramienta con este Código #${codeInput}!`)
                        err.statusCode = 400
                        return next(err);
                    }
                }    

                const userLogged = await this.users.getUserByUsername(username);
                !userLogged.visible ? catchError401_3(req, res, next) : null

                let updatedTool = {
                    designation: req.body.designation,
                    code: req.body.code,
                    diam: diamInput,
                    type: req.body.typeHidden,
                    characteristics: req.body.characteristics,
                    imageCuttingTool: req.body.imageTextImageCuttingTool,
                    status: req.body.status === 'on' ? Boolean(true) : Boolean(false),
                    modificator: dataUserModificatorNotEmpty(userLogged),
                    modifiedOn: formatDate(),
                    stock: stockInput,
                    onUse: Boolean(false),
                    usingBy: dataUserModificatorEmpty(),
                    usingByTool: dataToolEmpty()                    
                }

                const herramienta = await this.herramientas.updateCuttingTool(cuttingToolId, updatedTool, dataUserModificatorNotEmpty(userLogged))
                !herramienta ? catchError400_3(req, res, next) : null
                        
                const csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('addNewCuttingTool', {
                    username,
                    userInfo,
                    expires,
                    herramienta,
                    data,
                    csrfToken
                })

            } catch (err) {
                catchError500(err, req, res, next)
            }
        })
    }

    searchCuttingTools = async (req, res, next) => {
        try {
            const herramientas = await this.herramientas.getAllCuttingTools()
            !herramientas ? catchError400_5(req, res, next) : null
            res.send(herramientas)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    deleteCuttingToolById = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const cuttingToolToDelete = await this.herramientas.getCuttingToolById(id)
            !cuttingToolToDelete ? catchError401_3(req, res, next) : null

            const userId = userInfo.id,
                userLogged = await this.users.getUserById(userId)
            !userLogged ? catchError401_3(req, res, next) : null

            const herramienta = await this.herramientas.deleteCuttingToolById(id, dataUserModificatorNotEmpty(userLogged))
            !herramienta ? catchError401_3(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewCuttingTool', {
                username,
                userInfo,
                expires,
                herramienta,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

}

module.exports = { CuttingToolsController }