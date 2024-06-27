const ClientesDaoFactory = require('../daos/clientes/ClientesDaoFactory.js')
const clientesDao = ClientesDaoFactory.getDao()


class ClientService {
    constructor() {
        this.clientes = clientesDao
    }
    
    // returns all clients from DB
    async getAllClients() {
        return await this.clientes.getAllClients()
    }

    // returns all clients from DB according query
    async searchClientsAll() {
        return await this.clientes.searchClientsAll()
    }
    
    // returns one client by id
    async getClientById(id) {
        return await this.clientes.getClientById(id)
    }

    // returns one client by Name
    async getClientByName(name) {
        return await this.clientes.getClientByName(name)
    }

    // returns all Projects from one client by id
    async getClientProjectsById(id) {
        return await this.clientes.getClientByProjectId(id)
    }

    // returns all Projects from one client by id
    async getClientBySearching(query) {
        return await this.clientes.getClientBySearching(query)
    }

    // returns one Project from Project id
    async getClientByProjectId(id) {
        return await this.clientes.getClientProjectsById(id)
    }

    // returns details one client by id
    async selectClientById(id) {
        return await this.clientes.selectClientById(id)
    }

    // returns one client by Name or Code if exist
    async getExistingClient(cliente) {
        return await this.clientes.getExistingClient(cliente)
    }
    
    // add new client
    async addClient(cliente) {
        return await this.clientes.createNewClient(cliente)
    }
    
    // update one client
    async updateClient(id, cliente, user) {
        return await this.clientes.updateClient(id, cliente, user)
    }

    // update Project Qty. of one client
    async updateClientProjectsQty(id, cliente, user) {
        return await this.clientes.updateClientProjectsQty(id, cliente, user)
    }

    // reduce Project Qty. of one client
    async reduceClientProjectQty(id, cliente, user) {
        return await this.clientes.reduceClientProjectQty(id, cliente, user)
    }
    
    // delete one client by Id
    async deleteClientById(id, user) {
        return await this.clientes.deleteClientById(id, user)
    }

    // delete all clients
    async deleteAllClients() {
        return await this.clientes.deleteAllClients()
    }
}

module.exports = ClientService