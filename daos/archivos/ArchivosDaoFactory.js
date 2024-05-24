const ArchivosDaoMongoDB = require('./ArchivosDaoMongoDB.js')

const cnxStr = process.env.MONGO_URL_CONNECT_PROD

const option = process.env.PERSISTENCIA || 'Memoria'

let daoFiles
switch (option) {
    case 'Mongo':
        daoFiles = new ArchivosDaoMongoDB(cnxStr)
        daoFiles.init()
        break;

    default:
        
        daoFiles = new ArchivosDaoMongoDB(cnxStr)
        daoFiles.init()
        break;
}

module.exports = class UsuariosDaoFactory {
    static getDaoFiles() {
        return daoFiles
    }
}