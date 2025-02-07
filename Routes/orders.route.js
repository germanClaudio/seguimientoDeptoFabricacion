const { Router } = require('express'),
    routerOrders = Router(),
    { checkAuthentication } = require('../middlewares/chekAuthentication');

const GetCarts = require('../controllers/cart.controller'),
    getCarts = GetCarts.CartsController,
    carts = new getCarts(),

    GetOrders = require('../controllers/orders.controller'),
    getOrders = GetOrders.OrdersController,
    orders = new getOrders()

// -------------------  Get All Orders List ------------------ 
routerOrders.get('/all', checkAuthentication, orders.getAllOrders)

// -------------------  Get Active Orders List ------------------ 
routerOrders.get('/Active', checkAuthentication, orders.getActiveOrders)

// -------------------  Get Non Active Orders List ------------------ 
routerOrders.get('/NonActive', checkAuthentication, orders.getNonActiveOrders)

// -------------------  Delete Order ------------------ 
routerOrders.get('/delete/:id', checkAuthentication, orders.deleteOrderById)


module.exports = routerOrders