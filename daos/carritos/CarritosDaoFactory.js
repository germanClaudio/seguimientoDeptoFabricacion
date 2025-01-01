const CarritosDaoMongoDB = require('./CarritosDaoMongoDB.js'),
    cnxStr = process.env.MONGO_URL_CONNECT_PROD,
    option = process.env.PERSISTENCIA || 'Mongo'

let daoCarrito
switch (option) {
    case 'Mongo':
        daoCarrito = new CarritosDaoMongoDB(cnxStr)
        daoCarrito.init()
    break;
    default:
        daoCarrito = new CarritosDaoMongoDB(cnxStr)
        daoCarrito.init()
    break;
}

module.exports = class CarritosDaoFactory {
    static getDaoCart() {
        return daoCarrito
    }
}