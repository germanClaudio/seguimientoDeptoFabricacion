const HerramientasDaoMongoDB = require('./HerramientasDaoMongoDB.js')

const cnxStr = process.env.MONGO_URL_CONNECT_PROD

const option = process.env.PERSISTENCIA || 'Mongo'

let daoCuttingTools
switch (option) {
    case 'Mongo':
        daoCuttingTools = new HerramientasDaoMongoDB(cnxStr)
        daoCuttingTools.init()
        break;
    default:
        daoCuttingTools = new HerramientasDaoMongoDB(cnxStr)
        daoCuttingTools.init()
        break;
}

module.exports = class HerramientasDaoFactory {
    static getDaoCuttingTools() {
        return daoCuttingTools
    }
}