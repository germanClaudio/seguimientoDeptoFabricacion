const UserService = require("../services/users.service.js"),
    ConsumibleService = require("../services/consumibles.service.js"),
    CartsService = require("../services/carts.service.js"),
    OrdersService = require("../services/orders.service.js"),
    { uploadToGCS } = require("../utils/uploadFilesToGSC.js"),
    { uploadMulterSingleImageConsumibles } = require("../utils/uploadMulter.js"),
    csrf = require('csrf'),
    csrfTokens = csrf(),
    cookie = require('../utils/cookie.js'),
    data = require('../utils/variablesInicializator.js'),
    { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty } = require('../utils/generateUsers.js'),
    {catchError400_3, catchError400_5, catchError400_6, catchError400_1, catchError401_3, catchError500 } = require('../utils/catchErrors.js')

let formatDate = require('../utils/formatDate.js'),
    consumiblePictureNotFound = "https://storage.googleapis.com/imagenesproyectosingenieria/upload/ConsumiblesImages/noImageFound.png"

function validateSelectField(value) {
    const validOptions = [
        'epp', 'ropa', 'consumiblesAjuste', 'consumiblesMeca', 'consumiblesLineas', 'otros',
        'projectManager', 'cadCam', 'mecanizado', 'ajuste', 'metrologia', 'lineas', 'todos',
        'ingenieria', 'fabricacion', 'proyectos', 'administracion', 'todas'
    ]
    return validOptions.includes(value);
}

class ConsumiblesController {  
    constructor(){
        this.users = new UserService()
        this.consumibles = new ConsumibleService()
        this.carts = new CartsService()
        this.orders = new OrdersService()
    }

    getAllConsumibles = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const consumibles = await this.consumibles.getAllConsumibles()
            !consumibles ? catchError400_5(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewConsumible', {
                username,
                userInfo,
                userCart,
                ordenes,
                expires,
                consumibles,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getConsumiblesForUsers = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null
            
            const consumibles = await this.consumibles.getAllConsumibles()
            !consumibles ? catchError400_5(req, res, next) : null

            const ordenes = await this.orders.getAllOrdersByUserId(usuario),
                userCart = await this.carts.getCartByUserId(usuario._id)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('selectConsumible', {
                usuario,
                username,
                userInfo,
                expires,
                consumibles,
                ordenes,
                data,
                csrfToken,
                userCart
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getConsumibleById = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const consumible = await this.consumibles.getConsumibleById(id)           
            !consumible ? catchError401_3(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('consumibleDetails', {
                username,
                userInfo,
                userCart,
                ordenes,
                expires,
                consumible,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getConsumibleByDesignation = async (req, res, next) => {
        const { designation } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null
            
            const consumible = await this.consumibles.getConsumibleByConsumiblename(designation)
            !consumible ? catchError401_3(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('consumibleDetails', {
                consumible,
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

    createNewConsumible = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;

        //------ Storage New Consumible Image in Google Store --------        
        uploadMulterSingleImageConsumibles(req, res, async (err) => {
            try {
                req.file ? await uploadToGCS(req, res, next) : null

                let userManager = await this.users.getUserByUsername(username);
                const userId = userManager._id,
                    userCreator = await this.users.getUserById(userId)
                !userCreator ? catchError401_3(req, res, next) : null

                //console.log('req.body: ', req.body)

                function parseStockValue(value) {
                    return parseInt(value) || 0;
                }
                
                function createStockTotal(tipoTalle, body) {
                    if (tipoTalle === 'unico') {
                        return { 0: parseStockValue(body.stock) };
                    }
                
                    const stockTotal = {};
                    if (tipoTalle === 'talle') {
                        const talles = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
                        talles.forEach(talle => {
                            stockTotal[talle] = parseStockValue(body[`stock${talle.toUpperCase()}`]);
                        });

                    } else if (tipoTalle === 'numero') {
                        for (let i = 35; i <= 65; i++) {
                            stockTotal[i] = parseStockValue(body[`stockNum${i}`]);
                        }
                    }
                    return stockTotal;
                }
                
                let stockTotal = createStockTotal(req.body.tipoTalle, req.body);

                const designationInput = req.body.designation.replace(/[!@#$%^&*]/g, ""),
                    codeInput = req.body.code                    

                const newConsumibleValid = {
                    designation: designationInput,
                    code: codeInput
                };

                let typeConsumible = 'otro'
                validateSelectField(req.body.type) ? typeConsumible = req.body.type : catchError400_6(req, res, next)

                const consumibleExist = await this.consumibles.getExistingConsumible(newConsumibleValid);
                if (consumibleExist) {
                    catchError400_6(req, res, next)
                    
                } else {
                    const newConsumible = {
                        designation: designationInput,
                        code: codeInput,
                        type: typeConsumible,
                        characteristics: req.body.characteristics,
                        qrCode: req.body.qrConsumibleInput || '',
                        tipoTalle: req.body.tipoTalle || 'unico',
                        stock: stockTotal,
                        imageConsumible: req.body.imageTextImageConsumibles || consumiblePictureNotFound,
                        status: req.body.status === 'on' ? Boolean(true) : Boolean(false) || Boolean(true),
                        creator: dataUserCreator(userCreator),
                        timestamp: new Date(),
                        modificator: dataUserModificatorEmpty(),
                        modifiedOn: new Date(),
                        visible: true,
                        favorito: parseInt(req.body.favorite) || 1,
                        limMaxUser: parseInt(req.body.limMaxUser) || 1
                    };
                    //console.log('newConsumible: ', newConsumible)
                    
                    const consumible = await this.consumibles.addNewConsumible(newConsumible);
                    !consumible ? catchError400_6(req, res, next) : null
                    
                    //console.log('consumible: ', consumible)

                    const usuarioLog = await this.users.getUserByUsername(username);
                    !usuarioLog.visible ? catchError401_3(req, res, next) : null

                    const ordenes = await this.orders.getAllOrders()
                    !ordenes ? catchError400_5(req, res, next) : null

                    const userCart = await this.carts.getCartByUserId(usuarioLog._id)

                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    return res.render('addNewConsumible', {
                        username,
                        userInfo,
                        userCart,
                        ordenes,
                        expires,
                        data,
                        csrfToken,
                        consumible
                    });
                }

            } catch (err) {
                catchError500(err, req, res, next)
            }
        })
    }
    
    updateConsumible = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        uploadMulterSingleImageConsumibles(req, res, async (err) => {
            try {
                req.file ? await uploadToGCS(req, res, next) : null

                const consumibleId = id,
                    consumibleToModify = await this.consumibles.getConsumibleById(consumibleId)

                let consumiblesRestantes
                const consumibleInput = req.body.designation.replace(/[!@#$%^&* ]/g, ""),
                    designationValid = await this.consumibles.getConsumibleByDesignation(consumibleInput),
                    otherConsumibles = await this.consumibles.getAllConsumibles()
                
                // Función para eliminar un consumible de la lista si coincide con el consumible a comparar
                function eliminarConsumible(lista, consumible) {
                    return lista.filter(h => {
                        return h._id.toString() !== consumible._id.toString()
                    })
                }

                function parseStockValue(value) {
                    return parseInt(value) || 0;
                }
                
                function createStockTotal(tipoTalle, body) {
                    if (tipoTalle === 'unico') {
                        return { 0: parseStockValue(body.stock) };
                    }
                
                    const stockTotal = {};
                    if (tipoTalle === 'talle') {
                        const talles = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
                        talles.forEach(talle => {
                            stockTotal[talle] = parseStockValue(body[`stock${talle.toUpperCase()}`]);
                        });

                    } else if (tipoTalle === 'numero') {
                        for (let i = 35; i <= 65; i++) {
                            stockTotal[i] = parseStockValue(body[`stockNum${i}`]);
                        }
                    }
                    return stockTotal;
                }
                
                let stockTotal = createStockTotal(req.body.tipoTalle, req.body);

                let typeConsumible = 'otro'
                validateSelectField(req.body.type) ? typeConsumible = req.body.type : catchError400_6(req, res, next)
                
                // Eliminar el consumible de la lista
                if (designationValid) {
                    consumiblesRestantes = eliminarConsumible(otherConsumibles, designationValid)

                    const designations = consumiblesRestantes.map(consumible => consumible.designation)
                    if (designations.includes(consumibleToModify.designation)) {
                        const err = new Error (`Ya existe un Consumible con esta designación: ${consumibleInput}!`)
                        err.statusCode = 400
                        return next(err);
                    }

                    const codeInput = req.body.code,
                        codesId = consumiblesRestantes.map(consumible => consumible.code);
                    
                    if (codesId.includes(consumibleToModify.code)) {
                        const err = new Error (`Ya existe un Consumible con este Código #${codeInput}!`)
                        err.statusCode = 400
                        return next(err);
                    }
                }

                const userLogged = await this.users.getUserByUsername(username);
                !userLogged.visible ? catchError401_3(req, res, next) : null

                let updatedConsumible = {
                    designation: req.body.designation,
                    code: req.body.code,
                    type: typeConsumible,
                    qrCode: req.body.qrConsumibleInput,
                    tipoTalle: req.body.tipoTalle || 'unico',
                    stock: stockTotal,
                    characteristics: req.body.characteristics,
                    imageConsumible: req.body.imageTextImageConsumibles,
                    status: req.body.status === 'on' ? Boolean(true) : Boolean(false),
                    modificator: dataUserModificatorNotEmpty(userLogged),
                    modifiedOn: new Date(),
                    favorito: parseInt(req.body.favorite) || 1,
                    limMaxUser: parseInt(req.body.limMaxUser) || 1
                }

                const consumible = await this.consumibles.updateConsumible(consumibleId, updatedConsumible, dataUserModificatorNotEmpty(userLogged))
                !consumible ? catchError400_3(req, res, next) : null

                const ordenes = await this.orders.getAllOrders()
                !ordenes ? catchError400_5(req, res, next) : null

                const userCart = await this.carts.getCartByUserId(userLogged._id)
                        
                const csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('addNewConsumible', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    consumible,
                    data,
                    csrfToken,
                })

            } catch (err) {
                catchError500(err, req, res, next)
            }
        })
    }

    searchConsumibles = async (req, res, next) => {
        try {
            const consumibles = await this.consumibles.getConsumiblesBySearching() // searchConsumibles()
            !consumibles ? catchError400_5(req, res, next) : null
            res.send(consumibles)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    deleteConsumibleById = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const consumibleToDelete = await this.consumibles.getConsumibleById(id)
            !consumibleToDelete ? catchError401_3(req, res, next) : null

            const userId = userInfo.id,
                userLogged = await this.users.getUserById(userId)
            !userLogged ? catchError401_3(req, res, next) : null

            const consumible = await this.consumibles.deleteConsumibleById(id, dataUserModificatorNotEmpty(userLogged))
            !consumible ? catchError401_3(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userLogged._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewConsumible', {
                username,
                userInfo,
                userCart,
                ordenes,
                expires,
                consumible,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    modificarStockConsumibles = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const userLogged = await this.users.getUserByUsername(username);
            !userLogged.visible ? catchError401_3(req, res, next) : null

            let idConsumibles = [], stocksConsumibles = [];

            const prefixes = [
                { prefix: 'inputStockNumber_', array: stocksConsumibles },
                { prefix: 'idItemHidden_', array: idConsumibles }
            ];
    
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                match ? match.array.push(req.body[key]) : null
            }
            
            let arrayItemsToModify = [], updatedConsumible ={}
            if (idConsumibles.length>0) {
                for(let i=0; i<idConsumibles.length; i++) {
                    updatedConsumible = {
                        id: idConsumibles[i],
                        stock: stocksConsumibles[i],
                        modificator: dataUserModificatorNotEmpty(userLogged)
                    }
                    arrayItemsToModify.push(updatedConsumible)
                }

            } else {
                catchError400_1(req, res, next)
            }

            const consumible = await this.consumibles.modificarStockConsumibles(arrayItemsToModify)
            !consumible ? catchError400_3(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userLogged._id)
                    
            const csrfToken = csrfTokens.create(req.csrfSecret);
            setTimeout(() => {
                return res.render('addNewConsumible', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    consumible,
                    data,
                    csrfToken,
                })
            }, 400)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

}

module.exports = { ConsumiblesController }