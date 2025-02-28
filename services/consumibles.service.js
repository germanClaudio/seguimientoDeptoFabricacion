const ConsumiblesDaoFactory = require('../daos/consumibles/ConsumiblesDaoFactory.js')
const consumiblesDao = ConsumiblesDaoFactory.getDaoConsumibles()

class ConsumibleService {
    constructor() {
        this.consumible = consumiblesDao
    }

    // return all consumible from DB
    async getAllConsumibles() {
        return await this.consumible.getAllConsumibles()
    }

    // return all consumible from DB for users
    async getConsumiblesForUsers() {
        return await this.consumible.getConsumiblesForUsers()
    }
    
    // return one consumible by designation
    async getConsumibleByDesignation(designation) {
        return await this.consumible.getConsumibleByDesignation(designation)
    }

    // return one consumible by id
    async getConsumibleById(id) {
        return await this.consumible.getConsumibleById(id)
    }

    // return one consumible by designation || code
    async getExistingConsumible(consumible) {
        return await this.consumible.getExistingConsumible(consumible)
    }

    // Register new consumible
    async addNewConsumible(newConsumible) {
        return await this.consumible.createNewConsumible(newConsumible)
    }
    
    // update one consumible by consumible Id
    async updateConsumible(id, updatedConsumible, userModificator) {
        return await this.consumible.updateConsumible(id, updatedConsumible, userModificator)
    }

    // delete one consumible by Id
    async deleteConsumibleById(id, modificator) {
        return await this.consumible.deleteConsumibleById(id, modificator)
    }

    // search All consumible
    // async searchConsumibles() {
    //     return await this.consumible.searchConsumibles()
    // }

    // returns all Consumibles from serching
    async getConsumiblesBySearching(query) {
        return await this.consumible.getConsumiblesBySearching(query)
    }

    // Modify stock from selected items
    async modificarStockConsumibles(infoStock) {
        return await this.consumible.modificarStockConsumibles(infoStock)
    }
}

module.exports = ConsumibleService