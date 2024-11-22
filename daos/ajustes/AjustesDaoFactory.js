const AjustesDaoMongoDB = require('./AjustesDaoMongoDB.js')

const { options }= require('../../options/config.js')

// const filePath = options.filePath.path
const cnxStr = process.env.MONGO_URL_CONNECT_PROD

const option = process.env.PERSISTENCIA || 'Mongo'

let dao
switch (option) {
    case 'Mongo':
        dao = new AjustesDaoMongoDB(cnxStr)
        dao.init()
        break;
    case 'File':
        // dao = new ClientesDaoArchivo(filePath)
        // dao.init()
        break;    
    default:
        dao = new AjustesDaoMongoDB(cnxStr)
        dao.init()

        break;
}

module.exports = class AjustesDaoFactory {
    static getDaoAjustes() {
        return dao
    }
}