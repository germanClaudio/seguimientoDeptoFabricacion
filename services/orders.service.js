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

    // returns All Orders by User Id
    async getAllOrdersByUserId(user) {
        return this.ordenes.getAllOrdersByUserId(user)
    }

    // Detele Order by Id
    async deleteOrderById(id, userModificator) {
        return this.ordenes.deleteOrderById(id, userModificator)
    }

    // Prepare Order by Id
    async prepareOrderById(id, userModificator) {
        return this.ordenes.prepareOrderById(id, userModificator)
    }

    // Deliver Order by Id
    async deliverOrderById(id, userModificator) {
        return this.ordenes.deliverOrderById(id, userModificator)
    }
    
}

module.exports = OrdersService
