const UserService = require("../services/users.service.js"),
    CuttingToolService = require("../services/cuttingTools.service.js"),
    OrdersService = require("../services/orders.service.js"),
    CartsService = require("../services/carts.service.js"),

    { uploadToGCS } = require("../utils/uploadFilesToGSC.js"),
    { uploadMulterSingleImageCuttingTool } = require("../utils/uploadMulter.js"),

    csrf = require('csrf'),
    csrfTokens = csrf(),

    cuttingToolPictureNotFound = "https://storage.googleapis.com/imagenesproyectosingenieria/upload/CuttingToolsImages/noImageFound.png",
    cookie = require('../utils/cookie.js'),

    data = require('../utils/variablesInicializator.js'),
    { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty, dataToolEmpty } = require('../utils/generateUsers.js')

let formatDate = require('../utils/formatDate.js')

function validateSelectField(value) {
    const validOptions = ['TOR', 'PLA', 'ESF', 
        2, 3, 4, 6, 10, 15, 16, 20, 25, 30, 32, 40, 45, 50, 52, 57, 60, 63, 65, 66, 68, 70, 75, 76, 77, 78, 80, 81, 86, 88, 89, 90, 91, 94, 96, 97, 98,
        100, 102, 107, 108, 110, 111, 113, 116, 119, 120, 121, 123, 125, 128, 130, 131, 132, 138, 140, 142, 143, 144, 146, 147, 148,
        152, 154, 155, 158, 163, 164, 165, 170, 173, 175, 176, 177, 180, 182, 183, 186, 188, 191, 192, 196, 197, 198,
        204, 210, 214, 216, 217, 220, 221, 223, 225, 226, 230, 231, 233, 238, 241, 248, 254, 264, 265, 269, 270, 276, 277, 286, 291, 296,
        302, 310, 311, 321, 330, 331, 341, 342, 343, 351, 376, 377, 386, 391, 394, 442
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
        this.orders = new OrdersService()
        this.carts = new CartsService()
    }

    getAllCuttingTools = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const herramientas = await this.herramientas.getAllCuttingTools()
            !herramientas ? catchError400_5(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewCuttingTool', {
                username,
                userInfo,
                userCart,
                ordenes,
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
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const herramienta = await this.herramientas.getCuttingToolById(id)           
            !herramienta ? catchError401_3(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null
            
            const userCart = await this.carts.getCartByUserId(usuario._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('cuttingToolDetails', {
                username,
                userInfo,
                userCart,
                ordenes,
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
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const herramienta = await this.herramientas.getCuttingToolByToolname(designation)
            !herramienta ? catchError401_3(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('cuttingToolDetails', {
                herramienta,
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

    createNewCuttingTool = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        // console.log('req.body', req.body)
        //------ Storage New CuttingTool Image in Google Store --------        
        uploadMulterSingleImageCuttingTool(req, res, async (err) => {
            try {
                // console.log('req.file: ', req.file)
                req.file ? await uploadToGCS(req, res, next) : null

                let userManager = await this.users.getUserByUsername(username);
                const userId = userManager._id,
                    userCreator = await this.users.getUserById(userId)
                !userCreator ? catchError401_3(req, res, next) : null

                const designationInput = req.body.designation.replace(/[!@$%^&*]/g, ""),
                    codeInput = req.body.codeHidden,
                    diamInput = parseInt(req.body.diamHidden),
                    largoInput = parseInt(req.body.rectHidden),
                    typeInput = req.body.type,
                    radioInput = req.body.radio || '',
                    conoInput = req.body.cono || '',
                    reduccionInput = req.body.reduccion || '',
                    prolongacionInput = req.body.prolongacion || '',
                    arrastreInput = req.body.arrastre || '',
                    terminacionInput = req.body.terminacion || '',
                    stockInput = req.body.stock

                const newCuttingToolValid = {
                    designation: designationInput,
                    code: codeInput
                };

                const cuttingToolExist = await this.herramientas.getExistingCuttingTool(newCuttingToolValid);
                if (cuttingToolExist) {
                    catchError400_7(req, res, next)

                } else {
                    if (validateSelectField(typeInput) && validateSelectField(diamInput) && validateSelectField(largoInput)) {
                        const newCuttingTool = {
                            designation: designationInput,
                            code: codeInput,
                            type: typeInput,
                            diam: diamInput,
                            largo: largoInput,
                            radio: radioInput || '',
                            cono: conoInput || '',
                            reduccion: reduccionInput || '',
                            prolongacion: prolongacionInput || '',
                            arrastre: arrastreInput || '', 
                            terminacion: terminacionInput || '',
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

                        const ordenes = await this.orders.getAllOrders()
                        !ordenes ? catchError400_5(req, res, next) : null

                        const userCart = await this.carts.getCartByUserId(userId)

                        const csrfToken = csrfTokens.create(req.csrfSecret);
                        return res.render('addNewCuttingTool', {
                            username,
                            userInfo,
                            userCart,
                            ordenes,
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
            
            uploadMulterSingleImageCuttingTool(req, res, async (err) => {
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

                        const codeInput = req.body.codeHidden,
                            codesId = herramientasRestantes.map(herramienta => herramienta.code);
                        
                        if (codesId.includes(cuttingToolToModify.code)) {
                            const err = new Error (`Ya existe una Herramienta con este Código #${codeInput}!`)
                            err.statusCode = 400
                            return next(err);
                        }
                    }    

                    const userLogged = await this.users.getUserByUsername(username);
                    !userLogged.visible ? catchError401_3(req, res, next) : null

                    const designationInput = req.body.designation,
                        codeInput = req.body.codeHidden,
                        diamInput = req.body.diamHidden,
                        largoInput = req.body.largoHidden,
                        stockInput = req.body.stock,
                        typeInput = req.body.typeHidden,
                        radioInput = req.body.radioHidden,
                        conoInput = req.body.conoHidden,
                        reduccionInput = req.body.reduccionHidden,
                        prolongacionInput = req.body.prolongacionHidden,
                        arrastreInput = req.body.arrastreHidden,
                        terminacionInput = req.body.terminacionHidden,
                        characteristicsInput = req.body.characteristics,
                        imagenInput = req.body.imageTextImageCuttingTool

                    if (validateSelectField(typeInput) && validateSelectField(parseInt(diamInput)) && validateSelectField(parseInt(largoInput) ) ) {
                        let updatedCuttingTool = {
                            designation: designationInput,
                            code: codeInput,
                            diam: diamInput,
                            largo: largoInput,
                            type: typeInput,
                            radio: radioInput || 0,
                            cono: conoInput || 0,
                            reduccion: reduccionInput || 0,
                            prolongacion: prolongacionInput || 0,
                            arrastre: arrastreInput || 0, 
                            terminacion: terminacionInput || 0,
                            characteristics: characteristicsInput,
                            imageCuttingTool: imagenInput,
                            status: req.body.status === 'on' ? Boolean(true) : Boolean(false),
                            modificator: dataUserModificatorNotEmpty(userLogged),
                            modifiedOn: formatDate(),
                            stock: stockInput || '',
                            onUse: Boolean(false),
                            usingBy: dataUserModificatorEmpty(),
                            usingByTool: dataToolEmpty()                    
                        }

                        const herramienta = await this.herramientas.updateCuttingTool(cuttingToolId, updatedCuttingTool, dataUserModificatorNotEmpty(userLogged))
                        !herramienta ? catchError400_3(req, res, next) : null

                        const ordenes = await this.orders.getAllOrders()
                        !ordenes ? catchError400_5(req, res, next) : null

                        const userCart = await this.carts.getCartByUserId(userLogged._id)
                            
                        const csrfToken = csrfTokens.create(req.csrfSecret);
                        return res.render('addNewCuttingTool', {
                            username,
                            userInfo,
                            userCart,
                            ordenes,
                            expires,
                            herramienta,
                            data,
                            csrfToken
                        })

                    } else {
                        catchError400_3(req, res, next)
                    }

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

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewCuttingTool', {
                username,
                userInfo,
                userCart,
                ordenes,
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