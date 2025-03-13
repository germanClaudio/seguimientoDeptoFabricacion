const ContainerMongoDB = require('../../contenedores/containerMongoDB.js'),
    mongoose = require('mongoose'),
    Consumibles = require('../../models/consumibles.models.js')

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
            const consumibles = await Consumibles.find({ 
                visible: true
            }).sort({ 
                favorito: -1,  // Ordena por "favorito" de mayor a menor
                timestamp: -1 // Luego ordena por "timestamp" de más reciente a más antiguo
            });
            
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
                const consumible = await Consumibles.findOne(
                    {type: `${type}`}
                    .sort({ 
                        favorito: -1,  // Ordena por "favorito" de mayor a menor
                        timestamp: -1 // Luego ordena por "timestamp" de más reciente a más antiguo
                    })
                )
                
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
            if (query.statusConsumibles !== 'todos') {
                if (query.statusConsumibles === true) {
                    searchQuery.status = true;
                } else if (query.statusConsumibles === false) {
                    searchQuery.status = false;
                } else {
                    throw new Error(`Valor inválido para statusConsumible: ${query.statusConsumible}`);
                }
            }

            // Manejar otros campos
            if (query.typeConsumibles !== 'todos') {
                searchQuery.type = query.typeConsumibles;
            }

            if (query.talleConsumibles !== 'todos') {
                searchQuery.typeStock = query.talleConsumibles;
            }

            if (query.stockConsumibles !== 'todos') {
                if (query.stockConsumibles == 'conStock') {
                    searchQuery.stock = true;
                } else if(query.stockConsumibles == 'sinStock') {
                    searchQuery.stock = false;
                } else {
                    throw new Error(`Valor inválido para stockConsumible: ${query.stockConsumible}`);
                }
            }

            console.log('1-searchQuery Dao: ', searchQuery)

            // Ejecutar consulta
            const resultados = await switchFilterConsumibles(Consumibles, searchQuery);
            console.log('2-resultados Dao: ', resultados)
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
                stockNumber = newConsumible.stock;
            
            if (!designation || !code || stockNumber == {} ) {
                process.exit(1)

            } else {
                try {
                    const nuevoConsumible = {
                        designation: newConsumible.designation,
                        code: newConsumible.code,
                        type: newConsumible.type,
                        tipoTalle: newConsumible.tipoTalle,
                        stock: stockNumber || { 0: 1 } ,
                        qrCode: newConsumible.qrCode || '',
                        characteristics: newConsumible.characteristics,
                        imageConsumible: newConsumible.imageConsumible,
                        status: newConsumible.status,
                        creator: newConsumible.creator,
                        timestamp: newConsumible.timestamp,
                        modificator: newConsumible.modificator,
                        modifiedOn: newConsumible.modifiedOn,
                        visible: true,
                        favorito: parseInt(newConsumible.favorite) || 1,
                        limMaxUser: parseInt(newConsumible.limMaxUser) || 1
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
        if (!id || !updatedConsumible || !userModificator) {
            throw new Error('Faltan parámetros requeridos: id, datos actualizados o usuario modificador');
        }
    
        try {
            const consumibleMongoDB = await Consumibles.findById(id);
            if (!consumibleMongoDB) {
                throw new Error(`No existe el consumible con id: ${id}`);
            }

            // Determinar campos actualizados
            const getField = (field) => updatedConsumible.hasOwnProperty(field) && updatedConsumible[field] !== '' ? updatedConsumible[field] : consumibleMongoDB[field];
    
            const designation = getField('designation'),
                code = getField('code'),
                type = getField('type'),
                qrCode = getField('qrCode'),
                characteristics = getField('characteristics'),
                imageConsumible = getField('imageConsumible'),
                status = getField('status'),
                tipoTalle = getField('tipoTalle'),
                favorito = parseInt(getField('favorito')) || consumibleMongoDB.favorito,
                limMaxUser = parseInt(getField('limMaxUser')) || 1
            
                // Manejo del stock
            let stock = consumibleMongoDB.stock;
            if (updatedConsumible.hasOwnProperty('stock')) {
                if (tipoTalle === 'unico') {
                    const stockValue = parseInt(updatedConsumible.stock['0'], 10);
                    stock = !isNaN(stockValue) ? { '0': stockValue } : stock;
                } else {
                    stock = typeof updatedConsumible.stock === 'object' ? updatedConsumible.stock : stock;
                }
            }
    
            // Actualizar documento
            const updateResult = await Consumibles.updateOne(
                { _id: id },
                {
                    $set: {
                        designation,
                        code,
                        type,
                        qrCode,
                        stock,
                        characteristics,
                        imageConsumible,
                        status: Boolean(status),
                        tipoTalle,
                        modificator: userModificator,
                        modifiedOn: new Date(),
                        favorito,
                        limMaxUser
                    }
                },
                { new: true }
            );
    
            if (!updateResult.acknowledged) {
                throw new Error('Error al actualizar el consumible');
            }
    
            return await Consumibles.findById(id);
    
        } catch (error) {
            console.error('Error en updateConsumible:', error);
            throw error;
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
                                modifiedOn: new Date()
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
                    if (itemMongoDB && itemMongoDB.tipoTalle === 'unico') {
                        
                        function calculateStockInitial(stockMap) {
                            let total = 0
                            for (const value of stockMap.values()) {
                                total += value;
                            }
                            return total
                        }
                        let stockInitial = calculateStockInitial(itemMongoDB.stock)

                        const stockValue = parseInt(arrayItemsToModify[i].stock);
                        let stock = !isNaN(stockValue) ? { '0': stockValue } : { '0': stockInitial };

                        if (stockInitial !== stockValue) {
                            await Consumibles.updateOne(
                                { _id: itemMongoDB._id },
                                {
                                    stock: stock,
                                    modificator: arrayItemsToModify[i].modificator,
                                    modifiedOn: new Date()
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