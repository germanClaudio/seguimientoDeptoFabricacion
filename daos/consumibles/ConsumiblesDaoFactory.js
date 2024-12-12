const ConsumiblesDaoMongoDB = require('./ConsumiblesDaoMongoDB.js')

const cnxStr = process.env.MONGO_URL_CONNECT_PROD

const option = process.env.PERSISTENCIA || 'Mongo'

let daoConsumibles
switch (option) {
    case 'Mongo':
        daoConsumibles = new ConsumiblesDaoMongoDB(cnxStr)
        daoConsumibles.init()
        break;
    default:
        daoConsumibles = new ConsumiblesDaoMongoDB(cnxStr)
        daoConsumibles.init()
        break;
}

module.exports = class ConsumiblesDaoFactory {
    static getDaoConsumibles() {
        return daoConsumibles
    }
}