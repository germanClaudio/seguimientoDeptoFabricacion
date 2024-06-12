const SessionDaoMongoDB = require('./SessionDaoMongoDB.js')

const conexionStr = process.env.MONGO_URL_CONNECT_SESS

const option = process.env.PERSISTENCIA || 'Mongo'

let daoSessions
switch (option) {
    case 'Mongo':
        daoSessions = new SessionDaoMongoDB(conexionStr)
        daoSessions.init()
        break;
    // case 'File':
    //     daoUsers = new UsuariosDaoArchivo(filePath)
    //     daoUsers.init()
    //     break;    
     default:
         //daoUsers = new UsuariosDaoMemoria()
         daoSessions = new SessionDaoMongoDB(conexionStr)
         daoSessions.init()
         break;
}

module.exports = class SessionsDaoFactory {
    static getDaoSessions() {
        return daoSessions
    }
}