const ContainerMongoDB = require('../../contenedores/containerMongoDB.js')
const mongoose = require('mongoose')
const Herramientas = require('../../models/herramientas.models.js')

const advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000 }

const formatDate = require('../../utils/formatDate.js')
const util = require('util')
const { switchFilterCuttingTools } = require('../../utils/switchFilterCuttingTools.js')


class HerramientasDaoMongoDB extends ContainerMongoDB {
    constructor(cnxStr) {
        super(cnxStr)
    }

    async init() {
        mongoose.connect(this.cnxStr, advancedOptions)
    }

    async getAllCuttingTools() {
        try {
            const cuttingTools = await Herramientas.find()
            if(!cuttingTools) {
                return new Error ('No hay herramientas en la DB!')
            } else {
                return cuttingTools
            }

        } catch (error) {
            console.error("Error MongoDB getCuttingTools: ", error)
            return new Error ('No hay herramientas en la DB!')
        }
    }

    async getCuttingToolById(id) {
        if(id){
            try {
                const cuttingTool = await Herramientas.findOne( {_id: `${id}`} )
                if (!cuttingTool) {
                    new Error (`La Herramienta no existe con ese ID${id}!`)
                } else {
                    return cuttingTool
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`La Herramienta no existe con ese ID${id}!`)
        }
    }

    async getCuttingToolByCode(code) {
        if(code){
            try {
                const cuttingTool = await Herramientas.findOne( {code: `${code}`} )
                if (!cuttingTool) {
                    return null
                } else {
                    return cuttingTool
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`Error en codigo ${code}!`)
        }
    }

    async getCuttingToolByCode(model) {
        if(model){
            try {
                const cuttingTool = await Herramientas.findOne( {model: `${model}`} )
                if (!cuttingTool) {
                    return null
                } else {
                    return cuttingTool
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`Error en modelo ${model}!`)
        }
    }

    async getCuttingToolByTyoe(type) {
        if(type){
            try {
                const cuttingTool = await Herramientas.findOne( {type: `${type}`} )
                if (!cuttingTool) {
                    return null
                } else {
                    return cuttingTool
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`Error en tipo ${type}!`)
        }
    }
    
    async getCuttingToolByDesignation(designation) { 
        if(designation) {
            try {        
                const cuttingTool = await Herramientas.findOne( {designation: `${designation}`} );
                if (!cuttingTool) {
                    return false
                } else {
                    return cuttingTool
                }

            } catch (error) {
                console.error('Error getCuttingToolByDesignation: ', error)
            }
        } else {
            return console.error('Error getCuttingToolByDesignation (designation invalid)')
        }
    }

    async getCuttingToolsBySearching(query) {
        let filter
        var design_Code_Type_Diam_OnUseQuery = [{ 'designation': { $regex: `${query.queryCuttingTool}`, $options: 'i' } }, 
                                        { 'code': { $regex: `${query.queryCuttingTool}`, $options: 'i' } },
                                        { 'type': { $regex: `${query.queryCuttingTool}`, $options: 'i' } },
                                        { 'diam': { $regex: `${query.queryCuttingTool}`, $options: 'i' } },
                                        { 'onUse': { $regex: `${query.queryCuttingTool}`, $options: 'i' } },
                                    ]

        if (query.queryCuttingTool === '') {
            if (query.statusCuttingTool === 'todas') {
                if (query.typeCuttingTool === 'todas') {
                    filter = 'nullAllAll'
                } else if (query.typeCuttingTool === 'toricas') {
                    filter = 'nullAllToricas'
                } else if (query.typeCuttingTool === 'planas') {
                    filter = 'nullAllPlanas'
                } else if (query.typeCuttingTool === 'esfericas') {
                    filter = 'nullAllEsfericas'
                } else if (query.typeCuttingTool === 'final') {
                    filter = 'nullAllFinal'
                } else if (query.typeCuttingTool === 'altoAvance') {
                    filter = 'nullAllAltoAvance'
                } else {
                    filter = 'nullAllOther'
                }

            } else if (query.statusCuttingTool) {
                if (query.typeCuttingTool === 'todas') {
                    filter = 'nullActiveAll'
                } else if (query.typeCuttingTool === 'toricas') {
                    filter = 'nullActiveToricas'
                } else if (query.typeCuttingTool === 'planas') {
                    filter = 'nullActivePlanas'
                } else if (query.typeCuttingTool === 'esfericas') {
                    filter = 'nullActiveEsfericas'
                } else if (query.typeCuttingTool === 'final') {
                    filter = 'nullActiveFinal'
                } else if (query.typeCuttingTool === 'altoAvance') {
                    filter = 'nullActiveAltoAvance'
                } else {
                    filter = 'nullActiveOther'
                }

            } else if (!query.statusCuttingTool) {
                if (query.typeCuttingTool === 'todas') {
                    filter = 'nullInactiveAll'
                } else if (query.typeCuttingTool === 'toricas') {
                    filter = 'nullInactiveToricas'
                } else if (query.typeCuttingTool === 'planas') {
                    filter = 'nullInactivePlanas'
                } else if (query.typeCuttingTool === 'esfericas') {
                    filter = 'nullInactiveEsfericas'
                } else if (query.typeCuttingTool === 'final') {
                    filter = 'nullInactiveFinal'
                } else if (query.typeCuttingTool === 'altoAvance') {
                    filter = 'nullInactiveAltoAvance'
                } else {
                    filter = 'nullInactiveOther'
                }
            }

        } else {
            if (query.statusCuttingTool === 'todas') {
                if (query.typeCuttingTool === 'todas') {
                    filter = 'notNullAllAll'
                } else if (query.typeCuttingTool === 'toricas') {
                    filter = 'notNullAllToricas'
                } else if (query.typeCuttingTool === 'planas') {
                    filter = 'notNullAllPlanas'
                } else if (query.typeCuttingTool === 'esfericas') {
                    filter = 'notNullAllEsfericas'
                } else if (query.typeCuttingTool === 'final') {
                    filter = 'notNullAllFinal'
                } else if (query.typeCuttingTool === 'altoavance') {
                    filter = 'notNullAllAltoavance'
                } else {
                    filter = 'notNullAllOther'
                }
            } else if (query.statusCuttingTool) {
                if (query.typeCuttingTool === 'todas') {
                    filter = 'notNullActiveAll'
                } else if (query.typeCuttingTool === 'toricas') {
                    filter = 'notNullActiveToricas'
                } else if (query.typeCuttingTool === 'planas') {
                    filter = 'notNullActivePlanas'
                } else if (query.typeCuttingTool === 'esfericas') {
                    filter = 'notNullActiveEsfericas'
                } else if (query.typeCuttingTool === 'final') {
                    filter = 'notNullActiveFinal'
                } else if (query.typeCuttingTool === 'AltoAvance') {
                    filter = 'notNullActiveAltoAvance'
                } else {
                    filter = 'notNullActiveOther'
                }
            } else if (!query.statusCuttingTool) {
                if (query.typeCuttingTool === 'todas') {
                    filter = 'notNullInactiveAll'
                } else if (query.typeCuttingTool === 'toricas') {
                    filter = 'notNullInactiveToricas'
                } else if (query.typeCuttingTool === 'planas') {
                    filter = 'notNullInactivePlanas'
                } else if (query.typeCuttingTool === 'esfericas') {
                    filter = 'notNullInactiveEsfericas'
                } else if (query.typeCuttingTool === 'final') {
                    filter = 'notNullInactiveFinal'
                } else if (query.typeCuttingTool === 'altoAvance') {
                    filter = 'notNullInactiveAltoAvance'
                } else {
                    filter = 'notNullInactiveOther'
                }
            }
        }

        try {
            const resultados = await switchFilterCuttingTools(filter, Herramientas, design_Code_Type_Diam_OnUseQuery)
            if (resultados) {
                return resultados
            } else {
                return false
            }

        } catch (error) {
            console.error("Error MongoDB getCuttingToolsBySearching: ",error)
        }
    }

    async getExistingCuttingTool(newCuttingTool) {
        const codeIdNum = newCuttingTool.code,
            typeId = newCuttingTool.type
        
        if (newCuttingTool) {
            const cuttingCuttingTool = await Herramientas.findOne(
                { $or: [ {designation: `${newCuttingTool.designation}`}, {code: codeIdNum}, {type: typeId} ] });
            if (cuttingCuttingTool) {
                return cuttingCuttingTool
            } else {
                return false
            }

        } else {
            return new Error (`No se pudo encontrar la maquina!`)
        }
    }
    
    async createNewCuttingTool(newCuttingTool) {
        if (newCuttingTool) {
            let designation = newCuttingTool.designation || "",
                code = newCuttingTool.code || "",
                type = newCuttingTool.type || "";
                diam = newCuttingTool.diam || "";

            if (!designation || !code || !type ) {
                process.exit(1)
            } else {
                try {
                    const nuevaHerramienta = {
                        designation: newCuttingTool.designation,
                        code: newCuttingTool.code,
                        type: newCuttingTool.type,
                        diam: newCuttingTool.diam,
                        characteristics: newCuttingTool.characteristics,
                        imageCuttingTool: newCuttingTool.imageCuttingTool,
                        status: newCuttingTool.status,
                        creator: newCuttingTool.creator,
                        timestamp: newCuttingTool.timestamp,
                        modificator: newCuttingTool.modificator,
                        modifiedOn: '',
                        visible: newCuttingTool.visible,
                        stock: newCuttingTool.stock,
                        onUse: newCuttingTool.onUse,
                        usingBy: newCuttingTool.usingBy,
                        usingByTool: newCuttingTool.usingByTool
                    }             

                    const newCuttingToolCreated = new Herramientas(nuevaHerramienta)
                    await newCuttingToolCreated.save()
                    return true

                } catch (error) {
                    console.error(error)
                    return new Error (`No se pudo crear la Herramienta! Error Try-catch`)
                }
            }

        } else {
            return new Error (`No se pudo crear la Herramienta! Error else/if`)
        }
    }
    //FIXME:
    async updateCuttingTool(id, updatedCuttingTool, userModificator) {    
        if (id && updatedCuttingTool && userModificator) {
            try {
                const toolMongoDB = await Herramientas.findById( { _id: id } )
                let imageUrl = '', designation = '', characteristics = '', code = '', model = '', type = ''
                
                updatedCuttingTool.imageCuttingTool !== '' ? imageUrl = updatedCuttingTool.imageCuttingTool : imageUrl = toolMongoDB.imageCuttingTool
                updatedCuttingTool.designation !== '' ? designation = updatedCuttingTool.designation : designation = toolMongoDB.designation
                updatedCuttingTool.characteristics !== '' ? characteristics = updatedCuttingTool.characteristics : characteristics = toolMongoDB.characteristics
                updatedCuttingTool.code !== '' ? code = updatedCuttingTool.code : code = toolMongoDB.code
                updatedCuttingTool.model !== '' ? model = updatedCuttingTool.model : model = toolMongoDB.model
                updatedCuttingTool.type !== '' ? type = updatedCuttingTool.type : code = toolMongoDB.type
                
                if(toolMongoDB) {
                    var updatedFinalCuttingTool = await Herramientas.updateOne(
                        { _id: toolMongoDB._id  },
                        {
                            $set: {
                                designation: designation,
                                code: code,
                                model: model,
                                type: type,
                                characteristics: characteristics,
                                imageCuttingTool: imageUrl,
                                status: updatedCuttingTool.status,
                                modificator: userModificator,
                                modifiedOn: formatDate()
                            }
                        },
                        { new: true }
                    )

                    return updatedFinalCuttingTool.acknowledged ?
                        await Herramientas.findById({ _id: id }) 
                        :
                        new Error(`No se actualizó el item: ${itemUpdated._id}`);

                } else {
                    return new Error(`No existe el item Herramienta con este id: ${itemUpdated._id} `)
                }

            } catch (error) {
                console.error("Error MongoDB updateCuttingTool: ", error)
                return new Error (`No se pudo actualizar la maquina!`)
            }

        } else {
            console.info('La Herramienta, los datos o el modificador no existen! ', updatedCuttingTool)
            return new Error (`No se pudo actualizar la Herramienta!`)
        }
    }
    //FIXME:
    async deleteCuttingToolById(id, userModificator) {
        if(id){
            try {
                const toolMongoDB = await Herramientas.findById({_id: id })
            
                if(toolMongoDB) {
                    let inactive = Boolean(false)
                    var toolDeleted = await Herramientas.updateOne(
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

                    return toolDeleted.acknowledged 
                    ? await Herramientas.findById({ _id: id }) 
                    : new Error(`No se eliminó el item: ${userMongoDB._id}`);

                    
                } else {
                    return new Error (`La Herramienta no existe con ese Id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB deleteCuttingTool: ",error)
            }

        } else {
            return new Error (`La Herramienta no existe con ese ID${id}!`)
        }    
    }

    async disconnet() {
        await this.disconnection
        console.log('Disconnected from MongoDB Server')
    }
}

module.exports = HerramientasDaoMongoDB 