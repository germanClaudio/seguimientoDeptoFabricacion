const { Router } = require('express'),
    routerCarts = Router(),
    { checkAuthentication } = require('../middlewares/chekAuthentication')
// const { authUserMiddleware } = require('../middlewares/authUser.middleware.js')

const GetCarts = require('../controllers/cart.controller'),
    getCarts = GetCarts.CartsController,
    carts = new getCarts()

// -------------------  Get All Carts ------------------ 
routerCarts.get('/', checkAuthentication, carts.getAllCarts)

// -------------------  Select a Cart By User Id ------------------ 
routerCarts.get('/user/:id', checkAuthentication, carts.getCartByUserId) 

// -------------------  Select a Cart By Cart Id ------------------ 
routerCarts.get('/:id', checkAuthentication, carts.getCart)

// -------------------  Add One Product to Cart ------------------ 
routerCarts.get('/add/:id', checkAuthentication, carts.addItemToCart)

// -------------------  Add Multi Products to Cart ------------------ 
// routerCarts.post('/addMulti', checkAuthentication, carts.addMultiItemsToCart)

// -------------------  Removes quantity of a Product of the Cart ------------------ 
routerCarts.post('/updateCart/:id', checkAuthentication, carts.updateCart)

// -------------------  Empty the Cart ------------------ 
routerCarts.get('/empty-cart/:id', checkAuthentication, carts.emptyCart)

// -------------------  Generate Purcharse Order of the Cart ------------------ 
routerCarts.get('/genOrder/:id', checkAuthentication, carts.genOrderCart)

// -------------------  Get All Orders List ------------------ 
routerCarts.get('/ordersAll', checkAuthentication, carts.getAllOrders)

// -------------------  Add quantity of a Product to the Cart --------------- 
// routerCarts.post('/addQty/:id', checkAuthentication, carts.addQtyToCart)

// -------------------  Removes quantity of a Product of the Cart ------------------ 
// routerCarts.post('/remove/:id', checkAuthentication, carts.removeItemFromCart)

// -------------------  Removes all items from one Product of the Cart ------------------ 
// routerCarts.post('/deleteItem/:id', checkAuthentication, carts.deleteItemFromCart)


module.exports = routerCarts