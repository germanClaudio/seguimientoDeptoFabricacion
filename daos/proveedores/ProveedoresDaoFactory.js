const ProveedoresDaoMongoDB = require('./ProveedoresDaoMongoDB.js')

const cnxStr = process.env.MONGO_URL_CONNECT_PROD

const option = process.env.PERSISTENCIA || 'Mongo'

let daoSuppliers
switch (option) {
    case 'Mongo':
        daoSuppliers = new ProveedoresDaoMongoDB(cnxStr)
        daoSuppliers.init()
        break;
    default:
        daoSuppliers = new ProveedoresDaoMongoDB(cnxStr)
        daoSuppliers.init()
        break;
}

module.exports = class ProveedoresDaoFactory {
    static getDaoSuppliers() {
        return daoSuppliers
    }
}