const CartsService = require("../services/carts.service.js"),
    OrdersService = require("../services/orders.service.js"),
    UserService = require("../services/users.service.js"),
    ConsumiblesService = require("../services/consumibles.service.js"),
    cookie = require('../utils/cookie.js'),
    data = require('../utils/variablesInicializator.js'),
    csrf = require('csrf'),
    csrfTokens = csrf(),
    { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty } = require('../utils/generateUsers.js'),
    { catchError400_3, catchError400_5, catchError400_6, catchError400_1, catchError401_3, catchError500 } = require('../utils/catchErrors.js');
    
let formatDate = require('../utils/formatDate.js')

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
    
}

module.exports = { OrdersController }