const CartsService = require("../services/carts.service.js"),
    OrdersService = require("../services/orders.service.js"),
    UserService = require("../services/users.service.js"),
    ConsumiblesService = require("../services/consumibles.service.js"),
    cookie = require('../utils/cookie.js'),
    data = require('../utils/variablesInicializator.js'),
    csrf = require('csrf'),
    csrfTokens = csrf(),
    formatDate = require('../utils/formatDate.js')

class OrdersController {  
    constructor(){
        this.orders = new OrdersService()
        this.carts = new CartsService()
        this.consumibles = new ConsumiblesService()
        this.users = new UserService()
    }

    // ---------------- Gat All Orders ---------------
    getAllOrders = async (req, res) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

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

}

module.exports = { OrdersController }