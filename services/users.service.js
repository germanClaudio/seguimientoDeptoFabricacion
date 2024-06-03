const UsuariosDaoFactory = require('../daos/usuarios/UsuariosDaoFactory.js')
const usuariosDao = UsuariosDaoFactory.getDaoUsers()

class UserService {
    constructor() {
        this.usuarios = usuariosDao
    }

    async login() {
        return await this.usuarios.login(username, password)
    }

    // return index page
    async index() {
        return await this.usuarios.index()
    }

    // return client page
    async clientes() {
        return await this.usuarios.clientes()
    }
    
    // return all users from DB
    async getAllUsers() {
        return await this.usuarios.getAllUsers()
    }

    // return all sessions from DB
    async getAllSessions() {
        return await this.usuarios.getAllSessions()
    }
    
    // return one user by username
    async getUserByUsername(username) {
        return await this.usuarios.getUserByUsername(username)
    }

    // return one user by email
    async getUserByEmail(email) {
        return await this.usuarios.getUserByEmail(email)
    }

    // return one user by id
    async getUserById(id) {
        return await this.usuarios.getUserById(id)
    }

     // return one user by LegajoId
     async getUserByLegajoId(legajoId) {
        return await this.usuarios.getUserByLegajoId(legajoId)
    }

    // return one user by username & password
    async getUserByUsernameAndPassword(username, password) {
        return await this.usuarios.getUserByUsernameAndPassword(username, password)
    }

    // return one user by username || email || legajoId
    async getExistingUser(user) {
        return await this.usuarios.getExistingUser(user)
    }
    
    // Reset user Password and send email to user
    async resetUserPassword(user) {
        return await this.usuarios.resetUserPassword(user)
    }

    // Update user Password
    async updatePasswordByUser(id, updatedUserPassword, userModificator) {
        return await this.usuarios.updatePasswordByUser(id, updatedUserPassword, userModificator)
    }
    
    // Update user Preferences
    async getUserSettings(id) {
        return await this.usuarios.getUserById(id)
    }

    // Register new user
    async addNewUser(newUser) {
        return await this.usuarios.createNewUser(newUser)
    }
    
    // update one user by user Id
    async updateUser(id, updatedUser, userLogged) {
        return await this.usuarios.updateUser(id, updatedUser, userLogged)
    }

    // update one user Preferences by user Id
    async updateUserPreferences(id, updatedUser, userLogged) {
        return await this.usuarios.updateUserPreferences(id, updatedUser, userLogged)
    }

    // search user sort by permission
    async searchUsers(permiso) {
        return await this.usuarios.searchUsers(permiso)
    }
    
    // delete one user by Id
    async deleteUserById(id, user) {
        return await this.usuarios.deleteUserById(id, user)
    }

    // User logout
    async userLogout(id, user) {
        return await this.usuarios.userLogout(id, user)
    }

    // authBloq
    async authBloq(id, user) {
        return await this.usuarios.authBloq(id, user)
    }

    // authBloq
    async authNoBloq(id, user) {
        return await this.usuarios.authNoBloq(id, user)
    }
}

module.exports = UserService