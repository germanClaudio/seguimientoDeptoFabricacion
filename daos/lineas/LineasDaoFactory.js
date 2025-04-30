const LineasDaoMongoDB = require('./LineasDaoMongoDB.js')

const cnxStr = process.env.MONGO_URL_CONNECT_PROD
const option = process.env.PERSISTENCIA || 'Mongo'

let daoLineas
switch (option) {
    case 'Mongo':
        daoLineas = new LineasDaoMongoDB(cnxStr)
        daoLineas.init()
        break;

    default:
        daoLineas = new LineasDaoMongoDB(cnxStr)
        daoLineas.init()
        break;
}

module.exports = class LineasDaoFactory {
    static getDaoLineas() {
        return daoLineas
    }
}