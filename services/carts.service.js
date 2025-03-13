const CarritosDaoFactory = require('../daos/carritos/CarritosDaoFactory.js'),
    carritosDao = CarritosDaoFactory.getDaoCart()

class CartService {
    constructor() {
        this.carritos = carritosDao
    }

    // return all carts from DB
    async getAllCarts() {
        return await this.carritos.getAllCarts()
    }

    // returns all products from one Cart
    async getArrProducts(data) {
        return this.carritos.getArrProducts(data)
    }

    // reduce quantity of all products from one Cart when shopping is done
    async reduceStockProduct(data, array) {
        return this.carritos.reduceStockProduct(data, array)
    }

    // returns a cart by Id
    async getCart(id) {
        return this.carritos.getCart(id)
    }

    // returns all product from a Cart
    async getCartByUserId(id) {
        return this.carritos.getCartByUserId(id)
    }
    
    // add new product to a cart (It doesn't use Dao Layer)
    async addItemToCart(payload) {
        return this.carritos.addItemToCart(payload)
    }

    // add new products to a cart
    async addMultiItemsToCart(payload) {
        return this.carritos.addMultiItemsToCart(payload)
    }
    
    // remove one product from cart
    async removeItemFromCart(payload) {
        return this.carritos.removeItemFromCart(payload)
    }

    // update items/products from cart
    async updateCart(id, consumiblesId, items) {
        return this.carritos.updateCart(id, consumiblesId, items)
    }
    
    // Empty cart by Id
    async emptyCart(id) {
        return this.carritos.emptyCart(id)
    }

    // Generate Order Cart
    async genOrderCart(id, invoice) {
        return this.carritos.genOrderCart(id, invoice)
    }

}

module.exports = CartService
