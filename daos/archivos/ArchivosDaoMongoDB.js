// const ContainerMongoDB = require('../../contenedores/containerMongoDB.js')
// const mongoose = require('mongoose')
// // const Archivos = require('../../models/archivos.models.js')

// const advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000}

// class ArchivosDaoMongoDB extends ContainerMongoDB {
//     constructor(cnxStr) {
//         super(cnxStr)
//     }

//     async init() {
//         mongoose.connect(this.cnxStr, advancedOptions)
//         console.log('Connected to MongoDB Server 1-2-3 - ArchivosDaoFactory.js')
//     }

//     async disconnet() {
//         await this.disconnection
//         console.log('Disconnected from MongoDB Server')
//     }
// }

// module.exports = ArchivosDaoMongoDB