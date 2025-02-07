const OrdenesDaoFactory = require('../daos/ordenes/OrdenesDaoFactory.js'),
    ordenesDao = OrdenesDaoFactory.getDaoOrders()

class OrdersService {
    constructor() {
        this.ordenes = ordenesDao
    }

    // returns all Orders
    async getAllOrders() {
        return this.ordenes.getAllOrders()
    }

    // returns Active Orders
    async getActiveOrders() {
        return this.ordenes.getActiveOrders()
    }

    // returns Non Active Orders
    async getNonActiveOrders() {
        return this.ordenes.getNonActiveOrders()
    }

    // Detele Order
    async deleteOrderById(id, userModificator) {
        return this.ordenes.deleteOrderById(id, userModificator)
    }
    
}

module.exports = OrdersService
