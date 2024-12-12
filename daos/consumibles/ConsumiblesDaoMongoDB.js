const ContainerMongoDB = require('../../contenedores/containerMongoDB.js')
const mongoose = require('mongoose')
const Consumibles = require('../../models/consumibles.models.js')

const advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000 }

const formatDate = require('../../utils/formatDate.js')
// const util = require('util')
const { switchFilterConsumibles } = require('../../utils/switchFilterConsumibles.js')


class ConsumiblesDaoMongoDB extends ContainerMongoDB {
    constructor(cnxStr) {
        super(cnxStr)
    }

    async init() {
        mongoose.connect(this.cnxStr, advancedOptions)
    }

    async getAllConsumibles() {
        try {
            const consumibles = await Consumibles.find()
            if(!consumibles) {
                return new Error ('No hay consumibles en la DB!')
            } else {
                return consumibles
            }

        } catch (error) {
            console.error("Error MongoDB getConsumibles: ", error)
            return new Error ('No hay consumibles en la DB!')
        }
    }

    async getConsumibleById(id) {
        if(id){
            try {
                const consumible = await Consumibles.findOne( {_id: `${id}`} )
                if (consumible === undefined || consumible === null) {
                    new Error (`El Consumible no existe con ese ID${id}!`)
                } else {
                    return consumible
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`El Consumible no existe con ese ID${id}!`)
        }
    }

    async getConsumibleByCode(code) {
        if(code){
            try {
                const consumible = await Consumibles.findOne( {code: `${code}`} )
                if (consumible) {
                    return null
                } else {
                    return consumible
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`Error en codigo ${code}!`)
        }
    }

    async getConsumibleByCode(model) {
        if(model){
            try {
                const consumible = await Consumibles.findOne( {model: `${model}`} )
                if (consumible) {
                    return null
                } else {
                    return consumible
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`Error en modelo ${model}!`)
        }
    }

    async getConsumibleByType(type) {
        if(type){
            try {
                const consumible = await Consumibles.findOne( {type: `${type}`} )
                if (consumible) {
                    return null
                } else {
                    return consumible
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`Error en tipo ${type}!`)
        }
    }
    
    async getConsumibleByDesignation(designation) { 
        if(designation) {
            try {        
                const consumible = await Consumibles.findOne( {designation: `${designation}`} );
                if (consumible) {
                    return false
                } else {
                    return consumible
                }

            } catch (error) {
                console.error('Aca esta el error vieja: ', error)
            }
        } else {
            return console.error('Aca esta el error(designation invalid)')
        }
    }

    async getConsumiblesBySearching(query) {
        let filter
        var designationAndCodeQuery = [{ 'designation': { $regex: `${query.queryConsumible}`, $options: 'i' } }, 
                                        { 'code': { $regex: `${query.queryConsumible}`, $options: 'i' } },
                                        { 'model': { $regex: `${query.queryConsumible}`, $options: 'i' } },
                                    ]

        if (query.queryConsumible === '') {
            if (query.statusConsumible === 'todas') {
                if (query.typeConsumible === 'todas') {
                    filter = 'nullAllAll'
                } else if (query.typeConsumible === 'cnc') {
                    filter = 'nullAllCnc'
                } else if (query.typeConsumible === 'prensa') {
                    filter = 'nullAllPress'
                } else {
                    filter = 'nullAllOther'
                }
            } else if (query.statusConsumible) {
                if (query.typeConsumible === 'todas') {
                    filter = 'nullActiveAll'
                } else if (query.typeConsumible === 'cnc') {
                    filter = 'nullActiveCnc'
                } else if (query.typeConsumible === 'prensa') {
                    filter = 'nullActivePress'
                } else {
                    filter = 'nullActiveOther'
                }
            } else if (!query.statusConsumible) {
                if (query.typeConsumible === 'todas') {
                    filter = 'nullInactiveAll'
                } else if (query.typeConsumible === 'cnc') {
                    filter = 'nullInactiveCnc'
                } else if (query.typeConsumible === 'prensa') {
                    filter = 'nullInactivePress'
                } else {
                    filter = 'nullInactiveOther'
                }
            }

        } else {
            if (query.statusConsumible === 'todas') {
                if (query.typeConsumible === 'todas') {
                    filter = 'notNullAllAll'
                } else if (query.typeConsumible === 'cnc') {
                    filter = 'notNullAllCnc'
                } else if (query.typeConsumible === 'prensa') {
                    filter = 'notNullAllPress'
                } else {
                    filter = 'notNullAllOther'
                }
            } else if (query.statusConsumible) {
                if (query.typeConsumible === 'todas') {
                    filter = 'notNullActiveAll'
                } else if (query.typeConsumible === 'cnc') {
                    filter = 'notNullActiveCnc'
                } else if (query.typeConsumible === 'prensa') {
                    filter = 'notNullActivePress'
                } else {
                    filter = 'notNullActiveOther'
                }
            } else if (!query.statusConsumible) {
                if (query.typeConsumible === 'todas') {
                    filter = 'notNullInactiveAll'
                } else if (query.typeConsumible === 'cnc') {
                    filter = 'notNullInactiveCnc'
                } else if (query.typeConsumible === 'prensa') {
                    filter = 'notNullInactivePress'
                } else {
                    filter = 'notNullInactiveOther'
                }
            }
        }

        try {
            const resultados = await switchFilterConsumibles(filter, Consumibles, designationAndCodeQuery)
            if (resultados) {
                return resultados
            } else {
                return false
            }

        } catch (error) {
            console.error("Error MongoDB getConsumiblesBySearching: ",error)
        }
    }

    async getExistingConsumible(newConsumible) {
        const codeIdNum = newConsumible.code,
            modelIdNum = newConsumible.model
        
        if (newConsumible) {
            const consumible = await Consumibles.findOne(
                { $or: [ {designation: `${newConsumible.designation}`}, {code: codeIdNum}, {model: modelIdNum} ] });
            if (consumible) {
                return consumible
            } else {
                return false
            }

        } else {
            return new Error (`No se pudo encontrar el consumible!`)
        }
    }
    
    async createNewConsumible(newConsumible) {
        if (newConsumible) {
            let designation = newConsumible.designation || "",
                code = newConsumible.code || ""
                // model = newConsumible.model || "";

            if (!designation || !code ) {
                process.exit(1)
            } else {
                try {
                    const nuevaConsumible = {
                        designation: newConsumible.designation,
                        code: newConsumible.code,
                        // model: newConsumible.model,
                        type: newConsumible.type,
                        characteristics: newConsumible.characteristics,
                        imageConsumible: newConsumible.imageConsumible,
                        status: newConsumible.status,
                        creator: newConsumible.creator,
                        timestamp: newConsumible.timestamp,
                        modificator: newConsumible.modificator,
                        modifiedOn: '',
                        visible: newConsumible.visible
                    }             

                    const newConsumibleCreated = new Consumibles(nuevaConsumible)
                    await newConsumibleCreated.save()
                    return true

                } catch (error) {
                    console.error(error)
                    return new Error (`No se pudo crear el Consumible! Error Try-catch`)
                }
            }

        } else {
            return new Error (`No se pudo crear el Consumible! Error else/if`)
        }
    }

    async updateConsumible(id, updatedConsumible, userModificator) {    
        if (id && updatedConsumible && userModificator) {
            try {
                const consumibleMongoDB = await Consumibles.findById( { _id: id } )
                let imageUrl = '', designation = '', characteristics = '', code = '', model = '', type = ''
                // console.log('updatedConsumible: ', updatedConsumible)
                // console.log('consumibleMongoDB: ', consumibleMongoDB)
                updatedConsumible.imageConsumible !== '' ? imageUrl = updatedConsumible.imageConsumible : imageUrl = consumibleMongoDB.imageConsumible
                updatedConsumible.designation !== '' ? designation = updatedConsumible.designation : designation = consumibleMongoDB.designation
                updatedConsumible.characteristics !== '' ? characteristics = updatedConsumible.characteristics : characteristics = consumibleMongoDB.characteristics
                updatedConsumible.code !== '' ? code = updatedConsumible.code : code = consumibleMongoDB.code
                // updatedConsumible.model !== '' ? model = updatedConsumible.model : model = consumibleMongoDB.model
                updatedConsumible.type !== '' ? type = updatedConsumible.type : code = consumibleMongoDB.type
                
                if(consumibleMongoDB) {
                    var updatedFinalConsumible = await Consumibles.updateOne(
                        { _id: consumibleMongoDB._id  },
                        {
                            $set: {
                                designation: designation,
                                code: code,
                                model: model,
                                type: type,
                                characteristics: characteristics,
                                imageConsumible: imageUrl,
                                status: updatedConsumible.status,
                                modificator: userModificator,
                                modifiedOn: formatDate()
                            }
                        },
                        { new: true }
                    )

                    return updatedFinalConsumible.acknowledged ?
                        await Consumibles.findById({ _id: id }) 
                        :
                        new Error(`No se actualizó el item: ${itemUpdated._id}`);

                } else {
                    return new Error(`No existe el item Consumible con este id: ${itemUpdated._id} `)
                }

            } catch (error) {
                console.error("Error MongoDB updateConsumible: ", error)
                return new Error (`No se pudo actualizar el consumible!`)
            }

        } else {
            console.info('El Consumible, los datos o el modificador no existen! ', updatedConsumible)
            return new Error (`No se pudo actualizar el Consumible!`)
        }
    }

    async deleteConsumibleById(id, userModificator) {
        if(id){
            try {
                const consumibleMongoDB = await Consumibles.findById({_id: id })
            
                if(consumibleMongoDB) {
                    let inactive = Boolean(false)
                    var consumibleDeleted = await Consumibles.updateOne(
                        { _id: id }, 
                        {
                            $set: {
                                visible: inactive,
                                status: inactive,
                                modificator: userModificator,
                                modifiedOn: formatDate()
                            }
                        },
                        { new: true }
                    )

                    return consumibleDeleted.acknowledged 
                    ? await Consumibles.findById({ _id: id }) 
                    : new Error(`No se eliminó el item: ${userMongoDB._id}`);

                    
                } else {
                    return new Error (`El Consumible no existe con ese Id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB deleteConsumible: ",error)
            }

        } else {
            return new Error (`El Consumible no existe con ese ID${id}!`)
        }    
    }

    async disconnet() {
        await this.disconnection
        console.log('Disconnected from MongoDB Server')
    }
}

module.exports = ConsumiblesDaoMongoDB 