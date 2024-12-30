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
        const buildQuery = (queryText) => {
            const conditions = [
                queryText ? { designation: { $regex: queryText, $options: 'i' } } : null,
                queryText ? { code: { $regex: queryText, $options: 'i' } } : null,
            ];
            return conditions.filter(Boolean);
        };
    
        try {
            const searchQuery = {};
            if (query.queryConsumibles) {
                const orConditions = buildQuery(query.queryConsumibles);
                if (orConditions.length > 0) {
                    searchQuery.$or = orConditions;
                }
            }

            // Manejar campo statusConsumible
            if (query.statusConsumibles !== 'todas') {
                if (query.statusConsumibles === true) {
                    searchQuery.status = true;
                } else if (query.statusConsumibles === false) {
                    searchQuery.status = false;
                } else {
                    throw new Error(`Valor inválido para statusConsumible: ${query.statusConsumible}`);
                }
            }

            // Manejar otros campos
            if (query.typeConsumibles !== 'todas') {
                searchQuery.type = query.typeConsumibles;
            }
            if (query.stockConsumibles !== 'todas') {
                if (query.stockConsumibles == 'conStock') {
                    searchQuery.stock = true;
                } else if(query.stockConsumibles == 'sinStock') {
                    searchQuery.stock = false;
                } else {
                    throw new Error(`Valor inválido para stockConsumible: ${query.stockConsumible}`);
                }
            }

            // Ejecutar consulta
            const resultados = await switchFilterConsumibles(Consumibles, searchQuery);
            return resultados.length ? resultados : false;
    
        } catch (error) {
            console.error("Error MongoDB getConsumiblesBySearching: ", error);
            return false;
        }
    }

    async getExistingConsumible(newConsumible) {
        const codeIdNum = newConsumible.code
        
        if (newConsumible) {
            const consumible = await Consumibles.findOne(
                { $or: [ {designation: `${newConsumible.designation}`}, {code: codeIdNum} ] });
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
                code = newConsumible.code || "",
                stockNumber = parseInt(newConsumible.stock) || 1;
            
            if (!designation || !code || stockNumber === 0 ) {
                process.exit(1)

            } else {
                try {
                    const nuevoConsumible = {
                        designation: newConsumible.designation,
                        code: newConsumible.code,
                        type: newConsumible.type,
                        stock: stockNumber || 1,
                        qrCode: newConsumible.qrCode || '',
                        characteristics: newConsumible.characteristics,
                        imageConsumible: newConsumible.imageConsumible,
                        status: newConsumible.status,
                        creator: newConsumible.creator,
                        timestamp: newConsumible.timestamp,
                        modificator: newConsumible.modificator,
                        modifiedOn: '',
                        visible: true
                    }             

                    const newConsumibleCreated = new Consumibles(nuevoConsumible)
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
                let imageUrl = '', designation = '', characteristics = '', code = '', type = '', qrCode = '', status = '', stock = ''
                
                updatedConsumible.imageConsumible !== '' ? imageUrl = updatedConsumible.imageConsumible : imageUrl = consumibleMongoDB.imageConsumible
                updatedConsumible.designation !== '' ? designation = updatedConsumible.designation : designation = consumibleMongoDB.designation
                updatedConsumible.characteristics !== '' ? characteristics = updatedConsumible.characteristics : characteristics = consumibleMongoDB.characteristics
                updatedConsumible.code !== '' ? code = updatedConsumible.code : code = consumibleMongoDB.code
                updatedConsumible.type !== '' ? type = updatedConsumible.type : type = consumibleMongoDB.type
                updatedConsumible.qrCode !== '' ? qrCode = updatedConsumible.qrCode : qrCode = consumibleMongoDB.qrCode
                updatedConsumible.stock !== '' ? stock = updatedConsumible.stock : stock = consumibleMongoDB.stock
                updatedConsumible.status !== '' ? status = updatedConsumible.status : status = consumibleMongoDB.status

                
                if(consumibleMongoDB) {
                    var updatedFinalConsumible = await Consumibles.updateOne(
                        { _id: consumibleMongoDB._id  },
                        {
                            $set: {
                                designation: designation,
                                code: code,
                                type: type,
                                qrCode: qrCode,
                                stock: parseInt(stock),
                                characteristics: characteristics,
                                imageConsumible: imageUrl,
                                status: status,
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
                    let inactive = Boolean(false),
                        consumibleDeleted = await Consumibles.updateOne(
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

    // ------------Modify stock items----------------
    async modificarStockConsumibles(arrayItemsToModify) {
        const lengthArray = parseInt(arrayItemsToModify.length) || 0

        if (lengthArray>0) {
            for (let i=0; i<lengthArray; i++) {
                try {
                    const itemMongoDB = await Consumibles.findById({ _id: arrayItemsToModify[i].id })
                    
                    // Si encontro el proyecto en la BBDD ----- 
                    if (itemMongoDB) {
                        // Recupero los datos originales y comparo,
                        let stockInitial = itemMongoDB.stock 
                        
                        if (stockInitial !== parseInt(arrayItemsToModify[i].stock)) {
                            await Consumibles.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    stock: parseInt(arrayItemsToModify[i].stock),
                                    modificator: arrayItemsToModify[i].modificator,
                                    modifiedOn: formatDate()
                                },
                                { new: true }
                            )
                        }
                        
                    } else {
                        return new Error(`No se encontró el Consumible id# ${arrayItemsToModify[i].id}`)
                    }
                    
                } catch (error) {
                    console.error("Error MongoDB modifing stock: ", error)
                }
            }
            const itemsUpdated = await Consumibles.find()
            return itemsUpdated

        } else {
            return new Error(`No se modificó el stock en el item. Largo array: ${lengthArray}`)
        }
        
    }

    async disconnet() {
        await this.disconnection
        console.log('Disconnected from MongoDB Server')
    }
    
}

module.exports = ConsumiblesDaoMongoDB 