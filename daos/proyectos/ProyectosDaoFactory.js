const ProyectosDaoMongoDB = require('./ProyectosDaoMongoDB.js')
// const ClientesDaoArchivo = require('./ClientesDaoArchivo.js')
// const ClientesDaoMemoria = require('./ClientesDaoMemoria.js')
const { options }= require('../../options/config.js')

const filePath = options.filePath.path
const cnxStr = process.env.MONGO_URL_CONNECT_PROD

const option = process.env.PERSISTENCIA || 'Memoria'

let dao
switch (option) {
    case 'Mongo':
        dao = new ProyectosDaoMongoDB(cnxStr)
        dao.init()
        break;
    case 'File':
        // dao = new ClientesDaoArchivo(filePath)
        // dao.init()
        break;    
    default:
        // dao = new ClientesDaoMemoria()
        dao = new ProyectosDaoMongoDB(cnxStr)
        dao.init()
        break;
}

module.exports = class ProyectosDaoFactory {
    static getDao() {
        return dao
    }
}