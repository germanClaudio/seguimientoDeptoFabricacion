const ProveedoresDaoFactory = require('../daos/proveedores/ProveedoresDaoFactory.js')
const proveedoresDao = ProveedoresDaoFactory.getDaoSuppliers()

class SupplierService {
    constructor() {
        this.suppliers = proveedoresDao
    }

    // return all suppliers from DB
    async getAllSuppliers() {
        return await this.suppliers.getAllSuppliers()
    }
    
    // return one supplier by designation
    async getSupplierByDesignation(designation) {
        return await this.suppliers.getSupplierByDesignation(designation)
    }

    // return one supplier by id
    async getSupplierById(id) {
        return await this.suppliers.getSupplierById(id)
    }

    // return one supplier by designation || code
    async getExistingSupplier(supplier) {
        return await this.suppliers.getExistingSupplier(supplier)
    }

    // Register new supplier
    async addNewSupplier(newSupplier) {
        return await this.suppliers.createNewSupplier(newSupplier)
    }
    
    // update one supplier by supplier Id
    async updateSupplier(id, updatedSupplier, userModificator) {
        return await this.suppliers.updateSupplier(id, updatedSupplier, userModificator)
    }

    // delete one supplier by Id
    async deleteSupplierById(id, modificator) {
        return await this.suppliers.deleteSupplierById(id, modificator)
    }

    // search All suppliers
    async searchSuppliers() {
        return await this.suppliers.searchSuppliers()
    }

    // returns all Suppliers from serching
    async getSuppliersBySearching(query) {
        return await this.suppliers.getSuppliersBySearching(query)
    }
}

module.exports = SupplierService