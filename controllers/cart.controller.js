const UserService = require("../services/users.service.js"),
    ProyectosService = require("../services/projects.service.js"),
    ClientesService = require("../services/clients.service.js"),
    MessagesService = require("../services/messages.service.js"),
    ToolsService = require("../services/tools.service.js"),
    CuttingToolsService = require("../services/cuttingTools.service.js"),
    ConsumiblesService = require("../services/consumibles.service.js"),
    SuppliersService = require("../services/suppliers.service.js"),
    CartsService = require("../services/carts.service.js"),
    OrdersService = require("../services/orders.service.js");

const csrf = require('csrf'),
    csrfTokens = csrf(),
    cookie = require('../utils/cookie.js'),
    data = require('../utils/variablesInicializator.js'),
    { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty } = require('../utils/generateUsers.js'),
    { catchError400_3, catchError400_5, catchError400_6, catchError400_1, catchError401_3, catchError500 } = require('../utils/catchErrors.js'),
    { uploadPdfToGCS } = require("../utils/uploadFilesToGSC.js"),
    { uploadMulterSinglePdfOrders } = require("../utils/uploadMulter.js"),
    { createInvoice } = require('../utils/createInvoice.js');
    
let consumiblePictureNotFound = "../../../src/images/upload/ConsumiblesImages/noImageFound.png",
    formatDate = require('../utils/formatDate.js'),
    formatDateInvoice = require('../utils/formatDateInvoice.js')

class CartsController {  
    constructor(){
        this.projects = new ProyectosService()
        this.clients = new ClientesService()
        this.messages = new MessagesService()
        this.tools = new ToolsService()
        this.cuttingTools = new CuttingToolsService()
        this.consumibles = new ConsumiblesService()
        this.carts = new CartsService()
        this.orders = new OrdersService()
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

    // ------- reduce stock consumibles when PO is generated ---------------
    reduceStockProduct = async (req, res, next) => {
        try {
            const userLogged = await this.users.getUserByUsername(username);
            !userLogged.visible ? catchError401_3(req, res, next) : null
            return arrStockProduct
        }
        catch (err) {
            catchError400_1(err, req, res, next)
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

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    // ---------------- Get Cart by UserId ---------------
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
            let arrayInputQuantityNumber=[], idItemHidden=[]

            const prefixes = [
                { prefix: 'inputQuantityNumber_', array: arrayInputQuantityNumber },
                { prefix: 'idItemHidden_', array: idItemHidden }
            ];
        
            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                if (match) {
                    match.array.push(req.body[key]);
                }
            }

            let arrayItemAddedToCart = []
            for (let i=0; i<parseInt(idItemHidden.length); i++) {
                let productDetails = await this.consumibles.getConsumibleById(idItemHidden[i])
                if (!productDetails) {
                    catchError401_3(req, res, next)

                } else {
                    let itemAddedToCart = {
                        itemIdNumber: idItemHidden[i],
                        itemQuantity: Number.parseInt(arrayInputQuantityNumber[i]),
                        itemDetails: productDetails
                    }
                    arrayItemAddedToCart.push(itemAddedToCart)
                }
            }

            const usuarios = await this.users.getUserByUsername(username),
                userId = usuarios._id
                !usuarios ? catchError401_3(req, res, next) : null

            const userCreator = await this.users.getUserById(userId)
            !userCreator ? catchError401_3(req, res, next) : null
            
            let cart = await this.carts.getCartByUserId(userId)
            if (cart) { //--If Cart Exists ----
                for (let i=0; i<parseInt(arrayItemAddedToCart.length); i++) {
                    //---- check if index product exists ----
                    const indexFound = cart.items.findIndex(item => item.consumibleId == arrayItemAddedToCart[i].itemIdNumber)
                    
                    //----check if product exist, just add the previous quantity with the new quantity and update the total price---
                    if (indexFound !== -1) {
                        cart.items[indexFound].quantity = cart.items[indexFound].quantity + arrayItemAddedToCart[i].itemQuantity
                        cart.modifiedOn = formatDate()
                    
                    } else { //if (arrayItemAddedToCart[i].itemQuantity > 0)  ----Check if Quantity is Greater than 0 then add item to items Array ----
                        cart.items.push({
                            consumibleId: arrayItemAddedToCart[i].itemIdNumber,
                            designation: arrayItemAddedToCart[i].itemDetails.designation,
                            code: arrayItemAddedToCart[i].itemDetails.code,
                            type: arrayItemAddedToCart[i].itemDetails.type,
                            imageConsumible: arrayItemAddedToCart[i].itemDetails.imageConsumible || consumiblePictureNotFound,
                            qrCode: arrayItemAddedToCart[i].itemDetails.qrCode,
                            characteristics: arrayItemAddedToCart[i].itemDetails.characteristics,
                            quantity: arrayItemAddedToCart[i].itemQuantity,
                            timestamp: formatDate()
                        })
                        cart.modifiedOn = formatDate()
                    }
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
                        data,
                        cart,
                        arrProducts,
                        expires,
                        csrfToken
                    })
            
            } else { //- if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created-----
                let cartItems = []
                for (let i=0; i<parseInt(arrayItemAddedToCart.length); i++) {
                    cartItems.push(
                        {
                            consumibleId: arrayItemAddedToCart[i].itemIdNumber,
                            designation: arrayItemAddedToCart[i].itemDetails.designation,
                            code: arrayItemAddedToCart[i].itemDetails.code,
                            type: arrayItemAddedToCart[i].itemDetails.type,
                            imageConsumible: arrayItemAddedToCart[i].itemDetails.imageConsumible || consumiblePictureNotFound,
                            qrCode: arrayItemAddedToCart[i].itemDetails.qrCode,
                            characteristics: arrayItemAddedToCart[i].itemDetails.characteristics,
                            quantity: arrayItemAddedToCart[i].itemQuantity,
                            timestamp: formatDate()
                        }
                    )
                }

                // console.log('Cart does not exist-> CartItems ', cartItems)
                const cartData = {
                    items: cartItems,
                    userId: usuarios._id,
                    creator: dataUserCreator(userCreator),
                    active: true,
                    modifiedOn: formatDate(),
                }
                
                const userCart = await this.carts.addItemToCart(cartData),
                    arrProducts = await this.carts.getArrProducts(userCart),
                    csrfToken = csrfTokens.create(req.csrfSecret);
                
                // console.log('Cart does not exist-> userCart: ', userCart, ' arrProducts: ', arrProducts)
                res.render('cartDetails', {
                    userCart,
                    usuarios,
                    username,
                    userInfo,
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

    // --- Generate P.O. in pdf format, empty the Cart and send an email to Admin ------
    genOrderCart = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo,
            arrayItemsQty = [],
            arrayConsumiblesId = [];

        const expires = cookie(req),
            id = req.body.cartId
        arrayItemsQty = req.body.quantities.split(',')
        arrayConsumiblesId = req.body.consumiblesId.split(',')
        
        if (id) {
            //------ Storage New Order pdf in Google Store --------        
            uploadMulterSinglePdfOrders(req, res, async (err) => {
                try {
                    const usuario = await this.users.getUserByUsername(username)
                    !usuario ? catchError401_3(req, res, next) : null

                    let updatedCart = await this.carts.updateCart(id, arrayConsumiblesId, arrayItemsQty)
                    !updatedCart ? catchError401_3(req, res, next) : null

                    let cart = await this.carts.getCart(id)
                    if ( cart.items.length > 0 ) {
                        const dateInvoice = formatDateInvoice(),
                            invoiceNumber = (cart._id.toString()).concat('_',dateInvoice),
                            pathPdfFile = `https://storage.googleapis.com/imagenesproyectosingenieria/upload/PdfOrders/Invoice_${invoiceNumber}.pdf`,
                        
                            invoice = {
                                shipping: {
                                    name: usuario.name,
                                    lastName: usuario.lastName,
                                    username: usuario.username,
                                    legajoIdUser: usuario.legajoId,
                                    email: usuario.email,
                                    area: usuario.area
                                },
                                items: cart.items,
                                quantity: parseInt(cart.items.length),
                                timestamp: new Date(),
                                modificator: dataUserModificatorEmpty(),
                                modifiedOn: new Date(), //dateInvoice,
                                invoice_nr: invoiceNumber,
                                invoiceStorageUrl: pathPdfFile,
                                visible: Boolean(true),
                                active: Boolean(true),
                                prepared: Boolean(false),
                            }
                        
                        const invoiceName = `Invoice_${invoiceNumber}.pdf`,
                            pdfFileOrderBuffer = createInvoice(invoice)

                            if (err) {
                                return next(err);
                            }
                            
                            // Subir el PDF a Google Cloud Storage
                            uploadPdfToGCS(req, res, next, invoiceName, pdfFileOrderBuffer)
                                .then(() => {
                                    //console.log('PDF uploaded successfully');
                                })
                                .catch((error) => {
                                    console.error('Error uploading PDF:', error);
                                });
                        
                        // ------------ Save order in DataBase ---------------
                        let pathOrder = pathPdfFile, //`src/images/output/Invoice_${invoice.invoice_nr}.pdf`,
                            orderGenerated = await this.carts.genOrderCart(cart, invoice)
                        
                        // ------------ Reduce stock quantity -------------------
                        let stockReduced = await this.carts.reduceStockProduct(cart)
                        !stockReduced ? catchError401_3(req, res, next) : null
                        // ------------ Empty the cart -------------------
                        cart = await this.carts.emptyCart(id)

                        //////////////////// gmail to Administrator //////////////////////
                        const { createTransport } = require('nodemailer'),
                            TEST_EMAIL = process.env.TEST_EMAIL,
                            PASS_EMAIL = process.env.PASS_EMAIL,

                            transporter = createTransport({
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
                            to: TEST_EMAIL, //usuario.email,
                            subject: `Generación pedido# ${invoice.invoice_nr} desde App Seguimiento Ingeniería-Fabricación - Prodismo SRL`,
                            html: `<h5 style="color: green;">El usuario ${usuario.name} ${usuario.lastName}, realizó el pedido exitosamente!</h5>`,
                            attachments: [
                                {
                                    path: `${pathPdfFile}`
                                }
                            ]
                        }
                        ;(async () => {
                            try {
                                const info = await transporter.sendMail(mailOptions)
                                // console.log(info)
                            } catch (err) {
                                console.log('Error enviando mail: ', err)
                            }
                        })()
                            
                        return res.render('orderGenerated', {
                            data,
                            usuario,
                            username,
                            userInfo,
                            cart,
                            orderGenerated,
                            pathOrder,
                            expires
                        })
                    
                    } else {
                        console.log('Error! El Carrito está vacío')
                    }     
                }

                catch (err) {
                    catchError500(err, req, res, next)
                }
            })

        } else {
            console.log('Error! No existe Id:', i)
        }
    }

}

module.exports = { CartsController }