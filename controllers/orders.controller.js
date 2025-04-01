const CartsService = require("../services/carts.service.js"),
    OrdersService = require("../services/orders.service.js"),
    UserService = require("../services/users.service.js"),
    ConsumiblesService = require("../services/consumibles.service.js"),

    cookie = require('../utils/cookie.js'),
    data = require('../utils/variablesInicializator.js'),
    csrf = require('csrf'),
    csrfTokens = csrf(),

    { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty } = require('../utils/generateUsers.js'),
    { catchError400_3, catchError400_5, catchError400_6, catchError400_1, catchError401_3, catchError500 } = require('../utils/catchErrors.js'),
    { uploadMultiPdfToGCS } = require("../utils/uploadFilesToGSC.js"),
    { createResumen } = require('../utils/createResumen.js'),
    { uploadMulterSinglePdfOrders } = require("../utils/uploadMulter.js");

let formatDateResumen = require('../utils/formatDate.js')



class OrdersController {  
    constructor(){
        this.orders = new OrdersService()
        this.carts = new CartsService()
        this.consumibles = new ConsumiblesService()
        this.users = new UserService()
    }

    // ---------------- Gat All Orders ---------------
    getAllOrders = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const usuario = await this.users.getUserByUsername(username)
                !usuario ? catchError401_3(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('ordersAll', {
                username,
                userInfo,
                ordenes,
                userCart,
                data,
                csrfToken,
                expires })
            
        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    // ---------------- Get Active Orders ---------------
    getActiveOrders = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const usuario = await this.users.getUserByUsername(username)
                !usuario ? catchError401_3(req, res, next) : null

            const ordenes = await this.orders.getActiveOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('ordersActive', {
                username,
                userInfo,
                ordenes,
                userCart,
                data,
                csrfToken,
                expires })
            
        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    // ---------------- Get Non Active Orders ---------------
    getNonActiveOrders = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const usuario = await this.users.getUserByUsername(username)
                !usuario ? catchError401_3(req, res, next) : null

            const ordenes = await this.orders.getNonActiveOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('ordersNonActive', {
                username,
                userInfo,
                ordenes,
                userCart,
                data,
                csrfToken,
                expires })
            
        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    // ---------------- Get All Orders by User Id ---------------
    getAllOrdersByUserId = async (req, res, next) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const usuario = await this.users.getUserByUsername(username)
                !usuario ? catchError401_3(req, res, next) : null

            const ordenes = await this.orders.getAllOrdersByUserId(usuario)
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret)
            res.render('ordersAllByUserId', {
                username,
                userInfo,
                ordenes,
                userCart,
                data,
                csrfToken,
                expires })
            
        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    deleteOrderById = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;
            
        try {
            const userId = userInfo.id,
                userLogged = await this.users.getUserById(userId)
            !userLogged ? catchError401_3(req, res, next) : null

            const order = await this.orders.deleteOrderById(id, dataUserModificatorNotEmpty(userLogged))
            !order ? catchError401_3(req, res, next) : null

            const numberScreen = parseInt(req.params.screen) || 0;
            const screenHandlers = {
                1: {
                    screen: 'ordersActive',
                    getOrders: async () => await this.orders.getActiveOrders()
                },
                2: {
                    screen: 'ordersNonActive',
                    getOrders: async () => await this.orders.getNonActiveOrders()
                },
                default: {
                    screen: 'ordersAll',
                    getOrders: async () => await this.orders.getAllOrders()
                }
            };
            const handler = screenHandlers[numberScreen] || screenHandlers.default;
            const screen = handler.screen;
            const ordenes = await handler.getOrders();
            !ordenes ? catchError400_5(req, res, next) : null
            
            const userCart = await this.carts.getCartByUserId(userId)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render(`${screen}`, {
                username,
                userInfo,
                expires,
                ordenes,
                userCart,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    prepareOrderById = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;
            
        try {
            const userId = userInfo.id,
                userLogged = await this.users.getUserById(userId)
            !userLogged ? catchError401_3(req, res, next) : null

            const order = await this.orders.prepareOrderById(id, dataUserModificatorNotEmpty(userLogged))
            !order ? catchError401_3(req, res, next) : null

            const numberScreen = parseInt(req.params.screen) || 0;
            const screenHandlers = {
                1: {
                    screen: 'ordersActive',
                    getOrders: async () => await this.orders.getActiveOrders()
                },
                2: {
                    screen: 'ordersNonActive',
                    getOrders: async () => await this.orders.getNonActiveOrders()
                },
                default: {
                    screen: 'ordersAll',
                    getOrders: async () => await this.orders.getAllOrders()
                }
            };
            const handler = screenHandlers[numberScreen] || screenHandlers.default;
            const screen = handler.screen;
            const ordenes = await handler.getOrders();
            !ordenes ? catchError400_5(req, res, next) : null
            
            const userCart = await this.carts.getCartByUserId(userId)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render(`${screen}`, {
                username,
                userInfo,
                expires,
                ordenes,
                userCart,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    modifyMultiOrderById = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;
            
        try {
            const userId = userInfo.id,
                userLogged = await this.users.getUserById(userId)
            !userLogged ? catchError401_3(req, res, next) : null

            let arrayInputStatus=[], arrayIdOrderHidden=[]

            const prefixes = [
                { prefix: 'newOrdenSatus', array: arrayInputStatus },
                { prefix: 'idOrdenHidden_', array: arrayIdOrderHidden }
            ];

            for (const key in req.body) {
                const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                if (match) {
                    match.array.push(req.body[key]);
                }
            }

            const order = await this.orders.updateOrderStatusMulti(arrayIdOrderHidden, arrayInputStatus, dataUserModificatorNotEmpty(userLogged))
            !order.success ? catchError401_3(req, res, next) : null

            //console.log('req.params.screen: ', req.params.screen)
            const numberScreen = parseInt(req.params.screen) || 1;
            const screenHandlers = {
                1: {
                    screen: 'ordersActive',
                    getOrders: async () => await this.orders.getActiveOrders()
                },
                2: {
                    screen: 'ordersNonActive',
                    getOrders: async () => await this.orders.getNonActiveOrders()
                },
                default: {
                    screen: 'ordersAll',
                    getOrders: async () => await this.orders.getAllOrders()
                }
            };
            const handler = screenHandlers[numberScreen] || screenHandlers.default;
            const screen = handler.screen;
            const ordenes = await handler.getOrders();
            !ordenes ? catchError400_5(req, res, next) : null
            
            const userCart = await this.carts.getCartByUserId(userId)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render(`${screen}`, {
                username,
                userInfo,
                expires,
                ordenes,
                userCart,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    deliverOrderById = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const userId = userInfo.id,
                userLogged = await this.users.getUserById(userId)
            !userLogged ? catchError401_3(req, res, next) : null

            const order = await this.orders.deliverOrderById(id, dataUserModificatorNotEmpty(userLogged))
            !order ? catchError401_3(req, res, next) : null

            const numberScreen = parseInt(req.body.screen) || 0;
            const screenHandlers = {
                1: {
                    screen: 'ordersActive',
                    getOrders: async () => await this.orders.getActiveOrders()
                },
                2: {
                    screen: 'ordersNonActive',
                    getOrders: async () => await this.orders.getNonActiveOrders()
                },
                default: {
                    screen: 'ordersAll',
                    getOrders: async () => await this.orders.getAllOrders()
                }
            };
            const handler = screenHandlers[numberScreen] || screenHandlers.default;
            const screen = handler.screen;
            const ordenes = await handler.getOrders();
            !ordenes ? catchError400_5(req, res, next) : null
            const userCart = await this.carts.getCartByUserId(userId)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render(`${screen}`, {
                username,
                userInfo,
                expires,
                ordenes,
                userCart,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    resumenMultiOrders = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
            
            uploadMulterSinglePdfOrders(req, res, async (err) => {
                try {
                    let arrayUsersLegajo = [],
                        arrayOrdersId = [],
                        pathResumenOrder = [],
                        arrayResumen = [],
                        ordersInformation = [];

                    const prefixes = [
                        { prefix: 'user-header-', array: arrayUsersLegajo },
                        { prefix: 'idOrdenHidden_', array: arrayOrdersId }
                    ];
                    
                    for (const key in req.body) {
                        const match = prefixes.find(({ prefix }) => key.startsWith(prefix));
                        match ? match.array.push(req.body[key]) : null
                    }

                    // console.log('arrayUsersLegajo: ', arrayUsersLegajo)
                    // console.log('arrayOrdersId: ', arrayOrdersId)

                    const usuario = await this.users.getUserByUsername(username)
                    !usuario ? catchError401_3(req, res, next) : null
                    const userId = usuario._id

                    const userCreator = await this.users.getUserById(userId)
                    !userCreator ? catchError401_3(req, res, next) : null

                    // Función para extraer los últimos números
                    function extraerUltimosNumeros(str) {
                        const numeros = str.match(/\d+$/);
                        return numeros ? numeros[0] : null;
                    }
                    
                    for (let u=0; u < parseInt(arrayUsersLegajo.length); u++) {
                        let userLegajo = extraerUltimosNumeros(arrayUsersLegajo[u]),
                            userForResumen = await this.users.getUserByLegajoId(userLegajo)

                        const dateResumen = formatDateResumen(),
                            resumenNumber = (userForResumen._id.toString()).concat('_',dateResumen),
                            pathPdfFile = `https://storage.googleapis.com/imagenesproyectosingenieria/upload/PdfResumenOrders/Resumen_${resumenNumber}.pdf`;
                            
                            pathResumenOrder.push(pathPdfFile);

                        let orderNumbers = [], resumen = {}

                        for (let o=0 ; o < parseInt(arrayOrdersId.length); o++) {
                            // console.log('A- arrayOrdersId: ', arrayOrdersId[o])
                            ordersInformation = await this.orders.getOrderById(arrayOrdersId[o])
                            
                            let legajoIdUser = ordersInformation.shipping[0].legajoIdUser
                            // console.log('B1- legajoIdUser: ', legajoIdUser)
                            // console.log('B2- userForResumen.legajoId: ', userForResumen.legajoId)
                            legajoIdUser === userForResumen.legajoId ? orderNumbers.push(ordersInformation) : null
                        }
                        
                        resumen = {
                            shipping: {
                                name: userForResumen.name,
                                lastName: userForResumen.lastName,
                                username: userForResumen.username,
                                legajoIdUser: userForResumen.legajoId,
                                email: userForResumen.email,
                                area: userForResumen.area
                            },
                            orders: orderNumbers,
                            quantity: parseInt(orderNumbers.length),
                            creartor: userCreator._id,
                            timestamp: new Date(),
                            resumen_nr: resumenNumber,
                            resumenStorageUrl: pathPdfFile
                        }
                        arrayResumen.push(resumen)
                        
                        const resumenName = `Resumen_${resumenNumber}.pdf`,
                            pdfFileOrderBuffer = await createResumen(resumen)

                        if (err) {
                            return next(err);
                        }
                        
                        // Subir el PDF a Google Cloud Storage
                        uploadMultiPdfToGCS(req, res, next, resumenName, pdfFileOrderBuffer)
                            .then(() => {
                                console.log('PDF: ', resumenName ,' uploaded successfully');
                            })
                            .catch((error) => {
                                console.error('Error uploading PDF:', error);
                            });
                            
                        //////////////////// gmail to Administrator //////////////////////
                        // const { createTransport } = require('nodemailer'),
                        //     TEST_EMAIL = process.env.TEST_EMAIL,
                        //     PASS_EMAIL = process.env.PASS_EMAIL,

                        //     transporter = createTransport({
                        //         service: 'gmail',
                        //         port: 587,
                        //         auth: {
                        //             user: TEST_EMAIL,
                        //             pass: PASS_EMAIL
                        //         },
                        //         tls: {
                        //             rejectUnauthorized: false
                        //         }
                        //     })

                        // const mailOptions = {
                        //     from: 'Servidor NodeJS - Gmail - Prodismo',
                        //     to: TEST_EMAIL, //usuario.email,
                        //     subject: `Generación resumen# ${resumen.resumen_nr} desde App Seguimiento Ingeniería-Fabricación - Prodismo SRL`,
                        //     html: `<h5 style="color: green;">Se generó el resumen del usuario ${userForResumen.name} ${userForResumen.lastName} exitosamente!</h5>`,
                        //     attachments: [
                        //         {
                        //             path: `${pathPdfFile}`
                        //         }
                        //     ]
                        // }
                        // ;(async () => {
                        //     try {
                        //         const info = await transporter.sendMail(mailOptions)
                        //         // console.log(info)

                        //     } catch (err) {
                        //         console.log('Error enviando mail: ', err)
                        //     }
                        // })()
                    }

                    const ordenes = await this.orders.getActiveOrders()
                    !ordenes ? catchError400_5(req, res, next) : null

                    const userCart = await this.carts.getCartByUserId(usuario._id)
                    
                    return res.render('resumenGenerated', {
                        data,
                        usuario,
                        username,
                        userInfo,
                        userCart,
                        arrayResumen,
                        ordenes,
                        pathResumenOrder,
                        expires
                    })

                } catch (err) {
                    catchError500(err, req, res, next)
                }
            })
    }
    
}

module.exports = { OrdersController }