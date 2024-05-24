const ContainerMongoDB = require('../../contenedores/archivos/containerMongoDB.js')
const mongoose = require('mongoose')
// const Archivos = require('../../models/archivos.models.js')

class ArchivosDaoMongoDB extends ContainerMongoDB {
    constructor(cnxStr) {
        super(cnxStr)
    }

    async init() {
        mongoose.connect(this.cnxStr, { //createConnection or connect
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB Server 1-2-3 - ArchivosDaoFactory.js')
    }

    async disconnet() {
        await this.disconnection
        console.log('Disconnected from MongoDB Server')
    }
}

module.exports = ArchivosDaoMongoDB