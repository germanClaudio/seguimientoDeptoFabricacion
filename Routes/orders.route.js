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
routerOrders.get('/active', checkAuthentication, orders.getActiveOrders)

// -------------------  Get Non Active Orders List ------------------ 
routerOrders.get('/nonActive', checkAuthentication, orders.getNonActiveOrders)

// -------------------  Get All Orders By UserId List ------------------ 
routerOrders.get('/allOrdersByUserId', checkAuthentication, orders.getAllOrdersByUserId)

// -------------------  Delete Order ------------------ 
routerOrders.post('/delete/:id', checkAuthentication, orders.deleteOrderById)

// -------------------  Prepare Order ------------------ 
routerOrders.post('/prepare/:id', checkAuthentication, orders.prepareOrderById)

// -------------------  Prepare Order ------------------ 
routerOrders.post('/deliver/:id', checkAuthentication, orders.deliverOrderById)


module.exports = routerOrders