const LineasDaoFactory = require('../daos/lineas/LineasDaoFactory.js')
const lineasDao = LineasDaoFactory.getDaoLineas()

class LineasService {
    constructor() {
        this.lineas = lineasDao
    }

    // return all functions from DB
    async getAllFunciones() {
        return await this.lineas.getAllFunciones()
    }

}

module.exports = LineasService