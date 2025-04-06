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

    // returns one Order by Id
    async getOrderById(id) {
        return this.ordenes.getOrderById(id)
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

    // returns All items consumed by Users
    async getAllItemsOrdered(user) {
        return this.ordenes.getAllItemsOrdered(user)
    }

    // Detele Order by Id
    async deleteOrderById(id, userModificator) {
        return this.ordenes.deleteOrderById(id, userModificator)
    }

    // Prepare Order by Id
    async prepareOrderById(id, userModificator) {
        return this.ordenes.prepareOrderById(id, userModificator)
    }

    // Change Status Multi Order by Id
    async updateOrderStatusMulti(idOrders, arrayInputStatus, userModificator) {
        return this.ordenes.updateOrderStatusMulti(idOrders, arrayInputStatus, userModificator)
    }

    // Deliver Order by Id
    async deliverOrderById(id, userModificator) {
        return this.ordenes.deliverOrderById(id, userModificator)
    }

    // Download Multi Resumen Orders
    async resumenMultiOrders(id, userModificator) {
        return this.ordenes.resumenMultiOrders(id, userModificator)
    }
    
}

module.exports = OrdersService
