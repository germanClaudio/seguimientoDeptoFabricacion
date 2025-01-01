const OrdenesDaoMongoDB = require('./OrdenesDaoMongoDB.js'),
    cnxStr = process.env.MONGO_URL_CONNECT_PROD,
    option = process.env.PERSISTENCIA || 'Mongo'

let daoOrdenes
switch (option) {
    case 'Mongo':
        daoOrdenes = new OrdenesDaoMongoDB(cnxStr)
        daoOrdenes.init()
    break;
    default:
        daoOrdenes = new OrdenesDaoMongoDB(cnxStr)
        daoOrdenes.init()
    break;
}

module.exports = class OrdenesDaoFactory {
    static getDaoOrders() {
        return daoOrdenes
    }
}