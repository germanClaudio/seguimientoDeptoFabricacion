const ContainerMongoDB = require('../../contenedores/containerMongoDB.js')
const mongoose = require('mongoose')
const Maquinas = require('../../models/maquinas.models.js')

const advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000 }

const now = require('../../utils/formatDate.js')
const util = require('util')
const { switchFilterTools } = require('../../utils/switchFilterTools.js')


class MaquinasDaoMongoDB extends ContainerMongoDB {
    constructor(cnxStr) {
        super(cnxStr)
    }

    async init() {
        mongoose.connect(this.cnxStr, advancedOptions)
    }

    async getAllTools() {
        try {
            const tools = await Maquinas.find()
            if(!tools) {
                return new Error ('No hay maquinas en la DB!')
            } else {
                return tools
            }

        } catch (error) {
            console.error("Error MongoDB getTools: ", error)
            return new Error ('No hay maquinas en la DB!')
        }
    }

    async getToolById(id) {
        if(id){
            try {
                const tool = await Maquinas.findOne( {_id: `${id}`} )
                if (tool === undefined || tool === null) {
                    new Error (`La Maquina no existe con ese ID${id}!`)
                } else {
                    return tool
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`La Maquina no existe con ese ID${id}!`)
        }
    }

    async getToolByCode(code) {
        if(code){
            try {
                const tool = await Maquinas.findOne( {code: `${code}`} )
                if (tool) {
                    return null
                } else {
                    return tool
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`Error en codigo ${code}!`)
        }
    }
    
    async getToolByDesignation(designation) { 
        if(designation) {
            try {        
                const tool = await Maquinas.findOne( {designation: `${designation}`} );
                console.log('toolDao', tool)
                if (tool) {
                    return false
                } else {
                    return tool
                }

            } catch (error) {
                console.error('Aca esta el error vieja: ', error)
            }
        } else {
            return console.error('Aca esta el error(designation invalid)')
        }
    }

    async getToolsBySearching(query) {
        let filter
        var designationAndCodeQuery = [{ 'designation': { $regex: `${query.queryTool}`, $options: 'i' } }, 
                                        { 'code': { $regex: `${query.queryTool}`, $options: 'i' } }]

        if (query.queryTool === '') {
            if (query.statusTool === 'todas') {
                filter = 'nullAllAll'
            } else if (query.statusTool) {
                filter = 'nullActiveAll'
            } else if (!query.statusTool) {
                filter = 'nullInactiveAll'
            }

        } else {
            if (query.statusTool === 'todas') {
                filter = 'notNullAllAll'
            } else if (query.statusTool) {
                filter = 'notNullActiveAll'
            } else if (!query.statusTool) {
                filter = 'notNullInactiveAll'
            }
        }

        try {
            const resultados = await switchFilterTools(filter, Maquinas, designationAndCodeQuery)
            if (resultados) {
                return resultados
            } else {
                return false
            }

        } catch (error) {
            console.error("Error MongoDB getToolsBySearching: ",error)
        }
    }

    async getExistingTool(newTool) {
        const codeIdNum = newTool.code
        
        if (newTool) {
            const tool = await Maquinas.findOne(
                { $or: [ {designation: `${newTool.designation}`}, {code: codeIdNum} ] });
            if (tool) {
                return tool
            } else {
                return false
            }

        } else {
            return new Error (`No se pudo encontrar la maquina!`)
        }
    }
    
    async createNewTool(newTool) {
        if (newTool) {
            let designation = newTool.designation || "";
            let code = newTool.code || "";    

            if (!designation || !code ) {
                process.exit(1)
            } else {
                try {
                    const nuevaMaquina = {
                        designation: newTool.designation,
                        code: newTool.code,
                        characteristics: newTool.characteristics,
                        imageTool: newTool.imageTool,
                        status: newTool.status,
                        creator: newTool.creator,
                        timestamp: newTool.timestamp,
                        modificator: newTool.modificator,
                        modifiedOn: '',
                        visible: newTool.visible
                    }             

                    const newToolCreated = new Maquinas(nuevaMaquina)
                    await newToolCreated.save()
                    return true

                } catch (error) {
                    console.error(error)
                    return new Error (`No se pudo crear la Maquina! Error Try-catch`)
                }
            }

        } else {
            return new Error (`No se pudo crear la Maquina! Error else/if`)
        }
    }

    async updateTool(id, updatedTool, userModificator) {    
        if (id && updatedTool && userModificator) {
            try {
                const toolMongoDB = await Maquinas.findById( { _id: id } )
                let imageUrl = '', designation = '', characteristics = '', code = ''

                updatedTool.imageTool !== '' ? imageUrl = updatedTool.imageTool : imageUrl = toolMongoDB.imageTool
                updatedTool.designation !== '' ? designation = updatedTool.designation : designation = toolMongoDB.designation
                updatedTool.characteristics !== '' ? characteristics = updatedTool.characteristics : characteristics = toolMongoDB.characteristics
                updatedTool.code !== '' ? code = updatedTool.code : code = toolMongoDB.code
                
                if(toolMongoDB) {
                    var updatedFinalTool = await Maquinas.updateOne(
                        { _id: toolMongoDB._id  },
                        {
                            $set: {
                                designation: designation,
                                code: code,
                                characteristics: characteristics,
                                imageTool: imageUrl,
                                status: updatedTool.status,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )

                    return updatedFinalTool.acknowledged 
                    ? await Maquinas.findById({ _id: id }) 
                    : new Error(`No se actualizó el item: ${itemUpdated._id}`);

                } else {
                    return new Error(`No existe el item Maquina con este id: ${itemUpdated._id} `)
                }

            } catch (error) {
                console.error("Error MongoDB updateTool: ", error)
                return new Error (`No se pudo actualizar la maquina!`)
            }

        } else {
            console.info('La Maquina, los datos o el modificador no existen! ', updatedTool)
            return new Error (`No se pudo actualizar la Maquina!`)
        }
    }

    async deleteToolById(id, userModificator) {
        if(id){
            try {
                const toolMongoDB = await Maquinas.findById({_id: id })
            
                if(toolMongoDB) {
                    let inactive = Boolean(false)
                    var toolDeleted = await Maquinas.updateOne(
                        { _id: id }, 
                        {
                            $set: {
                                visible: inactive,
                                status: inactive,
                                modificator: userModificator,
                                modifiedOn: now
                            }
                        },
                        { new: true }
                    )

                    return toolDeleted.acknowledged 
                    ? await Maquinas.findById({ _id: id }) 
                    : new Error(`No se eliminó el item: ${userMongoDB._id}`);

                    
                } else {
                    return new Error (`La Maquina no existe con ese Id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB deleteTool: ",error)
            }

        } else {
            return new Error (`La Maquina no existe con ese ID${id}!`)
        }    
    }

    async disconnet() {
        await this.disconnection
        console.log('Disconnected from MongoDB Server')
    }
}

module.exports = MaquinasDaoMongoDB 