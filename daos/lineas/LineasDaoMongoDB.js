const ContainerMongoDB = require('../../contenedores/containerMongoDB.js'),
    mongoose = require('mongoose'),
    Lineas = require('../../models/lineas.models.js'),

    advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000 }

class LineasDaoMongoDB extends ContainerMongoDB {
    constructor(cnxStr) {
        super(cnxStr)
    }

    async init() {
        // await this.connection
        mongoose.connect(this.cnxStr, advancedOptions)
    }

    async getAllFunciones() {
        try {
            const funciones = await Lineas.find({
                visible: true
            }).sort({ 
                timestamp: -1, 
                modifiedOn: -1 
            });

            if (!funciones) {
                return new Error ('No hay funcniones en la DB!')
                
            } else {
                return funciones    
            }

        } catch (error) {
            console.error("Error MongoDB getAllFunciones: ", error)
            return new Error ('No hay funciones en la DB!')
        }
    }

    async disconnet() {
        await this.disconnection
    }
}

module.exports = LineasDaoMongoDB 