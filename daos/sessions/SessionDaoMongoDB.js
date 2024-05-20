const ContainerMongoDBSessions = require('../../contenedores/sessions/containerMongoDB.js')
const mongoose = require('mongoose')
const Sessions = require('../../models/sessions.models.js')
// const console = require('../../utils/winston.js')

class SessionsDaoMongoDB extends ContainerMongoDBSessions {
    constructor(conexionStr) {
        super(conexionStr)
    }

    async init() {
        // await this.connectionSession
        mongoose.connect(this.cnxStr, { //createConnection or connect
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB Server 1-2-3 - SessionsDaoFactory.js')
   }

   async getAllSessions() {
       try {
            //console.log('Sessions - Dao 0: ', Sessions.collection)
            const sessions = await Sessions.find()
            //console.log('sessionsDao 1: ', sessions)
            if (!sessions) {
                    return new Error ('Error! No hay sessiones en la DB!')
            } else {
                    return sessions
            }
        } catch (error) {
            console.error("Error MongoDB getSessions: ",error)
            return new Error ('No hay sessiones en la DB!')
        }
    }

    async disconnet() {
        await this.disconnectionSession
        console.log('Disconnected from MongoDB Server')
    }
}

module.exports = SessionsDaoMongoDB 