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
    getAllOrders = async (req, res) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const usuario = await this.users.getUserByUsername(username)
                !usuario ? catchError401_3(req, res, next) : null

            const orders = await this.orders.getAllOrders()
            !orders ? catchError400_5(req, res, next) : null
            const csrfToken = csrfTokens.create(req.csrfSecret);

            res.render('ordersAll', {
                username,
                userInfo,
                data,
                orders,
                csrfToken,
                expires })
            
        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    // ---------------- Get Active Orders ---------------
    getActiveOrders = async (req, res) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const usuario = await this.users.getUserByUsername(username)
                !usuario ? catchError401_3(req, res, next) : null

            const orders = await this.orders.getActiveOrders()
            !orders ? catchError400_5(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);

            res.render('ordersActive', {
                username,
                userInfo,
                // cart,
                orders,
                data,
                csrfToken,
                expires })
            
        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    // ---------------- Gat Non Active Orders ---------------
    getNonActiveOrders = async (req, res) => {
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const usuario = await this.users.getUserByUsername(username)
                !usuario ? catchError401_3(req, res, next) : null

            const orders = await this.orders.getNonActiveOrders()
            !orders ? catchError400_5(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);

            res.render('ordersNonActive', {
                username,
                userInfo,
                // cart,
                orders,
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
            userInfo = res.locals.userInfo

        try {
            const userId = userInfo.id,
                userLogged = await this.users.getUserById(userId)
            !userLogged ? catchError401_3(req, res, next) : null

            const order = await this.orders.deleteConsumibleById(id, dataUserModificatorNotEmpty(userLogged))
            !order ? catchError401_3(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('orders', {
                username,
                userInfo,
                expires,
                orders,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    
}

module.exports = { OrdersController }