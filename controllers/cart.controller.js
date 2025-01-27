const UserService = require("../services/users.service.js"),
    ProyectosService = require("../services/projects.service.js"),
    ClientesService = require("../services/clients.service.js"),
    MessagesService = require("../services/messages.service.js"),
    ToolsService = require("../services/tools.service.js"),
    CuttingToolsService = require("../services/cuttingTools.service.js"),
    ConsumiblesService = require("../services/consumibles.service.js"),
    SuppliersService = require("../services/suppliers.service.js"),
    CartsService = require("../services/carts.service.js"),

    csrf = require('csrf'),
    csrfTokens = csrf(),
    cookie = require('../utils/cookie.js'),
    data = require('../utils/variablesInicializator.js'),
    { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty } = require('../utils/generateUsers.js'),
    { catchError400_3, catchError400_5, catchError400_6, catchError400_1,
        catchError401_3, catchError500 } = require('../utils/catchErrors.js')
    
let consumiblePictureNotFound = "../../../src/images/upload/ConsumiblesImages/noImageFound.png",
    formatDate = require('../utils/formatDate.js')

class CartsController {  
    constructor(){
        this.projects = new ProyectosService()
        this.clients = new ClientesService()
        this.messages = new MessagesService()
        this.tools = new ToolsService()
        this.cuttingTools = new CuttingToolsService()
        this.consumibles = new ConsumiblesService()
        this.carts = new CartsService()
        this.suppliers = new SuppliersService()
        this.users = new UserService()
    }

    getAllCarts = async (req, res, next) => {        
        try {
            const carts = await this.carts.getAllCarts()
            !carts ? catchError400_5(req, res, next) : null
            return carts

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    // ---------------- Get All consumibles from one Cart ---------------
    getArrProducts = async (req, res, next) => {
        try {
            const consumibles = await this.consumibles.getAllConsumibles()
            !consumibles ? catchError400_5(req, res, next) : null
            return consumibles

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    //FIXME:  ------- reduce stock consumibles when PO is generated ---------------
    reduceStockProduct = async (req, res, next) => {
        try {
            const userLogged = await this.users.getUserByUsername(username);
            !userLogged.visible ? catchError401_3(req, res, next) : null
            return arrStockProduct
        }
        catch (error) {
            catchError400_1(req, res, next)
        }    
    }

    // ---------------- Get Cart by Id ---------------
    getCart = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const cart = await this.carts.getCart(id),
                arrProducts = await this.carts.getArrProducts(cart)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('cartDetails', {
                usuario,
                username,
                userInfo,
                arrProducts,
                expires,
                data,
                csrfToken,
                cart,
            })

        } catch (error) {
            catchError500(err, req, res, next)
        }
    }

    // ---------------- Get Cart by Id ---------------
    getCartByUserId = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        if (id) {
            try {
                const usuario = await this.users.getUserByUsername(username)
                !usuario ? catchError401_3(req, res, next) : null

                const userCart = await this.carts.getCartByUserId(id),
                    arrProducts = await this.carts.getArrProducts(userCart)

                const csrfToken = csrfTokens.create(req.csrfSecret);
                res.render('cartDetails', {
                    usuario,
                    username,
                    userInfo,
                    arrProducts,
                    expires,
                    data,
                    csrfToken,
                    userCart
                })

            } catch (err) {
                catchError500(err, req, res, next)
            }

        } else {
            console.log('Error! No existe Id:', i)
        }
    }
    
    // -------------------  Add One Product to Cart ---------------
    addItemToCart = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo;
        const expires = cookie(req)

        try {
            const productId = req.params.id,
                quantity = Number.parseInt(1),
                usuarios = await this.users.getUserByUsername(username),
                userId = usuarios._id
                !usuarios ? catchError401_3(req, res, next) : null

            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            let productDetails = await this.consumibles.getConsumibleById(productId)
            !productDetails ? catchError401_3(req, res, next) : null
            
            let cart = await this.carts.getCartByUserId(userId)
            if (cart) { //--If Cart Exists ----
                //---- check if index product exists ----
                const indexFound = cart.items.findIndex(item => item.consumibleId == productId)
                
                //----check if product exist, just add the previous quantity with the new quantity and update the total price---
                if (indexFound !== -1) {
                    cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity
                    cart.modifiedOn = formatDate()
                
                } else if (quantity > 0) { //----Check if Quantity is Greater than 0 then add item to items Array ----
                    cart.items.push({
                        consumibleId: productDetails.id,
                        designation: productDetails.designation,
                        code: productDetails.code,
                        type: productDetails.type,
                        imageConsumible: productDetails.imageConsumible || consumiblePictureNotFound,
                        qrCode: productDetails.qrCode,
                        characteristics: productDetails.characteristics,
                        timestamp: formatDate(),
                        quantity: quantity
                    })
                
                } else { //----if quantity of price is 0 throw the error -------
                    catchError500(err, req, res, next)
                }

                const userCart = await cart.save(),
                    arrProducts = await this.carts.getArrProducts(userCart),
                    csrfToken = csrfTokens.create(req.csrfSecret);

                //console.log('Cart exist-> userCart: ', userCart, ' arrProducts: ', arrProducts)
                res.render('cartDetails', {
                    userCart,
                    usuarios,
                    username,
                    userInfo,
                    productDetails,
                    data,
                    cart,
                    arrProducts,
                    expires,
                    csrfToken
                })
            
            } else { //- if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created-----
                const cartData = {
                    items: [{
                        consumibleId: productDetails.id,
                        designation: productDetails.designation,
                        code: productDetails.code,
                        type: productDetails.type,
                        imageConsumible: productDetails.imageConsumible || consumiblePictureNotFound,
                        qrCode: productDetails.qrCode,
                        characteristics: productDetails.characteristics,
                        quantity: quantity,
                        timestamp: formatDate(),
                    }],
                    userId: usuarios._id,
                    creator: dataUserCreator(userCreator),
                    active: true,
                    modifiedOn: formatDate(),
                }
                
                const userCart = await this.carts.addItemToCart(cartData),
                    arrProducts = await this.carts.getArrProducts(userCart),
                    csrfToken = csrfTokens.create(req.csrfSecret);
                
                //console.log('Cart does not exist-> userCart: ', userCart, ' arrProducts: ', arrProducts)
                res.render('cartDetails', {
                    userCart,
                    usuarios,
                    username,
                    userInfo,
                    productDetails,
                    data,
                    cart,
                    arrProducts,
                    expires,
                    csrfToken
                })
            }
            
        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    // -------------------  Add Multi Products to Cart ---------------
    addMultiItemsToCart = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo;
        const expires = cookie(req)

        try {
            const productId = req.params.id,
                quantity = Number.parseInt(1),
                usuarios = await this.users.getUserByUsername(username),
                userId = usuarios._id
                !usuarios ? catchError401_3(req, res, next) : null

            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            let productDetails = await this.consumibles.getConsumibleById(productId)
            !productDetails ? catchError401_3(req, res, next) : null
            
            let cart = await this.carts.getCartByUserId(userId)
            if (cart) { //--If Cart Exists ----
                //---- check if index product exists ----
                const indexFound = cart.items.findIndex(item => item.consumibleId == productId)
                
                //----check if product exist, just add the previous quantity with the new quantity and update the total price---
                if (indexFound !== -1) {
                    cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity
                    cart.modifiedOn = formatDate()
                
                } else if (quantity > 0) { //----Check if Quantity is Greater than 0 then add item to items Array ----
                    cart.items.push({
                        consumibleId: productDetails.id,
                        designation: productDetails.designation,
                        code: productDetails.code,
                        type: productDetails.type,
                        imageConsumible: productDetails.imageConsumible || consumiblePictureNotFound,
                        qrCode: productDetails.qrCode,
                        characteristics: productDetails.characteristics,
                        timestamp: formatDate(),
                        quantity: quantity
                    })
                
                } else { //----if quantity of price is 0 throw the error -------
                    catchError500(err, req, res, next)
                }

                const userCart = await cart.save(),
                    arrProducts = await this.carts.getArrProducts(userCart),
                    csrfToken = csrfTokens.create(req.csrfSecret);

                //console.log('Cart exist-> userCart: ', userCart, ' arrProducts: ', arrProducts)
                res.render('cartDetails', {
                    userCart,
                    usuarios,
                    username,
                    userInfo,
                    productDetails,
                    data,
                    cart,
                    arrProducts,
                    expires,
                    csrfToken
                })
            
            } else { //- if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created-----
                const cartData = {
                    items: [{
                        consumibleId: productDetails.id,
                        designation: productDetails.designation,
                        code: productDetails.code,
                        type: productDetails.type,
                        imageConsumible: productDetails.imageConsumible || consumiblePictureNotFound,
                        qrCode: productDetails.qrCode,
                        characteristics: productDetails.characteristics,
                        quantity: quantity,
                        timestamp: formatDate(),
                    }],
                    userId: usuarios._id,
                    creator: dataUserCreator(userCreator),
                    active: true,
                    modifiedOn: formatDate(),
                }
                
                const userCart = await this.carts.addItemToCart(cartData),
                    arrProducts = await this.carts.getArrProducts(userCart),
                    csrfToken = csrfTokens.create(req.csrfSecret);
                
                //console.log('Cart does not exist-> userCart: ', userCart, ' arrProducts: ', arrProducts)
                res.render('cartDetails', {
                    userCart,
                    usuarios,
                    username,
                    userInfo,
                    productDetails,
                    data,
                    cart,
                    arrProducts,
                    expires,
                    csrfToken
                })
            }
            
        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    // -----------  Empty the Cart ------------------
    emptyCart = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo;
        const expires = cookie(req),
            { id } = req.params

        if (id) {
            try {
                const usuario = await this.users.getUserById(userInfo.id)
                !usuario ? catchError401_3(req, res, next) : null
                
                let userCart = await this.carts.emptyCart(id)
                !userCart ? catchError401_3(req, res, next) : null
                
                const arrProducts = [],
                    csrfToken = csrfTokens.create(req.csrfSecret);
                
                setTimeout(()=>{
                    res.render('cartDetails', {
                        usuario,
                        username,
                        userInfo,
                        arrProducts,
                        expires,
                        data,
                        csrfToken,
                        userCart
                    })
                },2000)
                        
            } catch (err) {
                catchError500(err, req, res, next)
            }

        } else {
            console.log('Error! No existe Id:', id)
        }
    }

    // -----------  Update the Cart ------------------
    updateCart = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo,
            arrayItemsQty = [],
            arrayConsumiblesId = [];

        const expires = cookie(req),
            { id } = req.params;

        arrayItemsQty = req.body.quantities.split(',')
        arrayConsumiblesId = req.body.consumiblesId.split(',')
        
        if (id) {
            try {
                const usuario = await this.users.getUserById(userInfo.id)
                !usuario ? catchError401_3(req, res, next) : null

                let updatedCart = await this.carts.updateCart(id, arrayConsumiblesId, arrayItemsQty)
                !updatedCart ? catchError401_3(req, res, next) : null

                const clientes = await this.clients.getAllClients(),
                    proyectos = await this.projects.getAllProjects(), 
                    maquinas = await this.tools.getAllTools(),
                    herramientas = await this.cuttingTools.getAllCuttingTools(),
                    consumibles = await this.consumibles.getAllConsumibles(),
                    mensajes = await this.messages.getAllMessages(),
                    userCart = await this.carts.getCart(id),
                    carts = await this.carts.getCart(),
                    usuarios = await this.users.getAllUsers(),
                    sessionsIndex = await this.users.getAllSessions(),
                    sessions = sessionsIndex.length,
                    csrfToken = csrfTokens.create(req.csrfSecret);
                
                if (usuario.area === 'fabricacion') {
                    return res.render('indexToolShop', {
                        usuario,
                        username,
                        userInfo,
                        expires,
                        usuarios,
                        mensajes,
                        data,
                        sessions,
                        maquinas,
                        herramientas,
                        consumibles,
                        carts,
                        userCart,
                        csrfToken
                    })

                } else {
                    return res.render('index', {
                        userInfo,
                        username,
                        flag,
                        fail,
                        expires,
                        clientes,
                        usuarios,
                        proyectos,
                        mensajes,
                        data,
                        sessions,
                        maquinas,
                        herramientas,
                        consumibles,
                        proveedores,
                        csrfToken
                    })
                }
                        
            } catch (err) {
                catchError500(err, req, res, next)
            }

        } else {
            console.log('Error! No existe Id:', id)
        }
    }

    //FIXME: --- Generate P.O. in pdf format, empty the Cart and send an email to Admin ------
    genOrderCart = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo;
        const expires = cookie(req),
            { id } = req.params
        
        if (id) {
            try {
                const usuarios = await this.users.getUserByUsername(username)
                !usuarios ? catchError401_3(req, res, next) : null

                let cart = await this.carts.getCart(id)
                if ( cart.items.length > 0 ) {
                    const dateInvoice = formatDate(),
                        invoiceNumber = (cart._id.toString()).concat('_',dateInvoice),
                    
                        invoice = {
                            shipping: {
                                name: usuarios.name,
                                lastName: usuarios.lastName,
                                username: usuarios.username,
                                legajoId: usuarios.legajoId,
                                email: usuarios.email,
                                area: usuarios.area
                            },
                            items: cart.items,
                            quantity: cart.items.length,
                            modifiedOn: dateInvoice,
                            invoice_nr: invoiceNumber,
                        }
                    
                    const pathPdfFile = `./src/output/Invoice_${invoiceNumber}.pdf`
                    const pathPdfOrderFile =  `./public/src/images/output/Invoice_${invoiceNumber}.pdf`
                    const { createInvoice } = require('../utils/createInvoice.js')
                    createInvoice(invoice, pathPdfFile)
                    createInvoice(invoice, pathPdfOrderFile)
                    
                    //////////////////// gmail to Administrator //////////////////////
                    const { createTransport } = require('nodemailer')
                    const TEST_EMAIL = process.env.TEST_EMAIL
                    const PASS_EMAIL = process.env.PASS_EMAIL
        
                    const transporter = createTransport({
                        service: 'gmail',
                        port: 587,
                        auth: {
                            user: TEST_EMAIL,
                            pass: PASS_EMAIL
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    })
        
                    const mailOptions = {
                        from: 'Servidor NodeJS - Gmail - Prodismo',
                        to: TEST_EMAIL,
                        subject: `Generación PO# ${invoice.invoice_nr} desde Node JS - Gmail - ACME Inc. Ecommerce`,
                        html: `<h3 style="color: green;">El usuario ${usuarios.name} ${usuarios.lastName}, realizó la compra exitosamente!</h3>`,
                        attachments: [
                            {
                                path: `./src/output/Invoice_${invoice.invoice_nr}.pdf`
                            }
                        ]
                    }
        
                    ;(async () => {
                        try {
                            const info = await transporter.sendMail(mailOptions)
                            logger.info(info)
                        } catch (err) {
                            logger.error(err)
                        }
                    })()
    
                    // ------------ Save order in DataBase ---------------
                    const pathOrder = `src/output/Invoice_${invoice.invoice_nr}.pdf`
                    const order = await this.carts.genOrderCart(cart, invoice)
                    let orderGenerated = await order.save()
                    
                    // ------------ Reduce stock quantity -------------------
                    await this.carts.reduceStockProduct(cart)
    
                    // ------------ Empty the cart -------------------
                    cart = await this.carts.emptyCart(id)
                        
                        res.render('orderGenerated', { data, usuarios, username, userInfo, cart, orderGenerated, pathOrder, expires })
                
                } else {
                    console.log('Error! El Carrito está vacío')
                }     
            }

            catch (error) {
                catchError500(err, req, res, next)
            }

        } else {
            console.log('Error! No existe Id:', i)
        }
    }

    //FIXME: ---------------- Gat All Orders ---------------
    getAllOrders = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo;
        const expires = cookie(req)

        try {
            const usuarios = await this.users.getUserByUsername(username)
            const userId = usuarios._id // User Id
            
            let cart = await this.carts.getCartByUserId(userId)
            
            const data = await this.carts.getCart(cart._id)
            const arrProducts = await this.carts.getArrProducts(data)
            const orders = await this.carts.getAllOrders()
            
            res.render('orders', { cart, usuarios, username, userInfo, data, orders, arrProducts, expires })
            
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    // -------  Add quantity of a Product to the Cart -----------
    // addQtyToCart = async (req, res, next) => {
    //     let username = res.locals.username,
    //         userInfo = res.locals.userInfo;
    //     const expires = cookie(req)
    
    //     try {
    //         const { productId } = req.body // Product Id
    //         const quantity = Number.parseInt(req.body.quantity)
    //         const usuarios = await this.users.getUserByUsername(username)
    //         const userId = usuarios._id // User Id
    //         let cart = await this.carts.getCartByUserId(userId)
    //         let productDetails = await this.consumibles.getProductById(productId)
    
    //             if (!productDetails) {
    //             return res.status(500).json({
    //                 type: "Not Found",
    //                 msg: "Invalid request"
    //             })
    //         }
    //         //--If Cart Exists ----
    //         if (cart) {
    //             //---- check if index product exists ----
    //             const indexFound = cart.items.findIndex(item => item.productId == productId)
    
    //             //----check if product exist, just add the previous quantity with the new quantity and update the total price---
    //             if (indexFound !== -1 && quantity > 0) {
    //                 cart.items[indexFound].quantity = cart.items[indexFound].quantity + 1
    //                 cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price
    //                 cart.items[indexFound].price = productDetails.price
    //                 cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next)
    //                 cart.modifiedOn = formatDate()
    //             }
    //             //----if quantity of price is 0 throw the error -------
    //             else {
    //                 return res.status(400).json({
    //                     type: "Invalid",
    //                     msg: "Invalid request"
    //                 })
    //             }
    //             const data = await cart.save()
    //             const arrProducts = await this.carts.getArrProducts(data)
    //             res.render('cartDetails', { data, usuarios, username, userInfo, productDetails, cart, arrProducts, expires })
    //         }
    
    //     } catch (err) {
    //         console.log(err)
    //         res.status(400).json({
    //             type: "Invalid",
    //             msg: "Something Went Wrong",
    //             err: err
    //         })
    //     }
    // }

    // -----------  Removes quantity of a Product of the Cart --------
    // removeItemFromCart = async (req, res, next) => {
    //     let username = res.locals.username
    //     let userInfo = res.locals.userInfo

    //     const cookie = req.session.cookie
    //     const time = cookie.expires
    //     const expires = new Date(time)
    
    //     try {
    //         const { productId } = req.body
    //         const quantity = Number.parseInt(req.body.quantity)

    //         const usuarios = await this.users.getUserByUsername(username)
    //         const userId = usuarios._id // User Id

    //         let cart = await this.carts.getCartByUserId(userId)
    //         let productDetails = await this.consumibles.getProductById(productId)
    
    //             if (!productDetails) {
    //             return res.status(500).json({
    //                 type: "Product Not Found",
    //                 msg: "Invalid Product request"
    //             })
    //         }
    //         //--If Cart Exists ----
    //         if (cart) {
    //             //---- check if index exists ----
    //             const indexFound = cart.items.findIndex(item => item.productId == productId)
    //             //------this removes an item from the the cart if the quantity is set to zero.
    //             if (indexFound !== -1 && quantity === 1) {
    //                 cart.items.splice(indexFound, 1)
    //                 if (cart.items.length == 0) {
    //                     cart.subTotal = 0
    //                 } else {
    //                     cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next)
    //                 }
    //             }
    //             //----------check if product exist, just add the previous quantity with the new quantity and update the total price-------
    //             else if (indexFound !== -1 && quantity > 1) {
    //                 cart.items[indexFound].quantity = cart.items[indexFound].quantity - 1
    //                 cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price
    //                 cart.items[indexFound].price = productDetails.price
    //                 cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next)
    //                 cart.modifiedOn = formatDate()
    //             }
    //             //----if quantity of price is 0 throw the error -------
    //             else {
    //                 return res.status(400).json({
    //                     type: "Invalid",
    //                     msg: "Invalid request"
    //                 })
    //             }
    //             const data = await cart.save()
    //             const arrProducts = await this.carts.getArrProducts(data)
    //             res.render('cartDetails', { data, usuarios, username, userInfo, productDetails, cart, arrProducts, expires })
    //         }
    //     } catch (err) {
    //         console.log(err)
    //         res.status(400).json({
    //             type: "Invalid",
    //             msg: "Something Went Wrong",
    //             err: err
    //         })
    //     }
    // }

    // -------  Removes all items from one Product of the Cart -------
    // deleteItemFromCart = async (req, res, next) => {
    //     let username = res.locals.username,
    //         userInfo = res.locals.userInfo;
    //     const expires = cookie(req)
    
    //     try {
    //         const usuarios = await this.users.getUserByUsername(username)
    //         const userId = usuarios._id // User Id
    //         const { productId } = req.body // Product Id
    //         const quantity = 0
    //         let cart = await this.carts.getCartByUserId(userId)
    //         let productDetails = await this.consumibles.getProductById(productId)
    
    //         if (!productDetails) {
    //             return res.status(500).json({
    //                 type: "Product Not Found",
    //                 msg: "Invalid request"
    //             })
    //         }
    //         //--If Cart Exists ----
    //         if (cart) {
    //             //---- check if index exists ----
    //             const indexFound = cart.items.findIndex(item => item.productId == productId)
    //             //------this removes an item from the the cart because the quantity is set to zero.
    //             if (indexFound !== -1 && quantity <= 0) {
    //                 cart.items.splice(indexFound, 1)
    //                 if (cart.items.length == 0) {
    //                     cart.subTotal = 0
    //                 } else {
    //                     cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next)
    //                 }
    //             }
    //             //----if quantity of price is 0 throw the error -------
    //             else {
    //                 return res.status(400).json({
    //                     type: "Invalid",
    //                     msg: "Invalid request"
    //                 })
    //             }
    //             const data = await cart.save()
    //             const arrProducts = await this.carts.getArrProducts(data)
    //             res.render('cartDetails', { data, usuarios, username, userInfo, productDetails, cart, arrProducts, expires })
    //         }
    
    //     } catch (err) {
    //         console.log(err)
    //         res.status(400).json({
    //             type: "Invalid",
    //             msg: "Something Went Wrong",
    //             err: err
    //         })
    //     }
    // }

}

module.exports = { CartsController }