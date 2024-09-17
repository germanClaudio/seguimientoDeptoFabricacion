const MaquinasDaoMongoDB = require('./MaquinasDaoMongoDB.js')

const cnxStr = process.env.MONGO_URL_CONNECT_PROD

const option = process.env.PERSISTENCIA || 'Mongo'

let daoTools
switch (option) {
    case 'Mongo':
        daoTools = new MaquinasDaoMongoDB(cnxStr)
        daoTools.init()
        break;
    default:
        daoTools = new MaquinasDaoMongoDB(cnxStr)
        daoTools.init()
        break;
}

module.exports = class MaquinasDaoFactory {
    static getDaoTools() {
        return daoTools
    }
}