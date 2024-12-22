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
                    return null
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
        const buildQuery = (queryText) => {
            const conditions = [
                queryText ? { designation: { $regex: queryText, $options: 'i' } } : null,
                queryText ? { code: { $regex: queryText, $options: 'i' } } : null,
            ];
            return conditions.filter(Boolean);
        };
    
        try {
            const searchQuery = {};
            if (query.queryCuttingTool) {
                const orConditions = buildQuery(query.queryCuttingTool);
                if (orConditions.length > 0) {
                    searchQuery.$or = orConditions;
                }
            }

            // Manejar campo statusCuttingTool
            if (query.statusCuttingTool !== 'todas') {
                if (query.statusCuttingTool === true || query.statusCuttingTool === false) {
                    searchQuery.status = query.statusCuttingTool === true;
                } else {
                    throw new Error(`Valor inválido para statusCuttingTool: ${query.statusCuttingTool}`);
                }
            }

            // Manejar otros campos
            if (query.typeCuttingTool !== 'todas') {
                searchQuery.type = query.typeCuttingTool;
            }
            if (query.diamCuttingTool !== 'todas') {
                const parsedDiam = parseInt(query.diamCuttingTool);
                if (!isNaN(parsedDiam)) searchQuery.diam = parsedDiam;
            }
            if (query.largoCuttingTool !== 'todas') {
                const parsedLargo = parseInt(query.largoCuttingTool);
                if (!isNaN(parsedLargo)) searchQuery.largo = parsedLargo;
            }
            
            // Ejecutar consulta
            const resultados = await switchFilterCuttingTools(Herramientas, searchQuery);
            return resultados.length ? resultados : false;
    
        } catch (error) {
            console.error("Error MongoDB getCuttingToolsBySearching: ", error);
            return false;
        }
    }
    
    async getExistingCuttingTool(newCuttingTool) {
        const codeIdNum = newCuttingTool.code
        
        if (newCuttingTool) {
            const cuttingCuttingTool = await Herramientas.findOne(
                { $or: [ {designation: `${newCuttingTool.designation}`},
                        {code: codeIdNum}
                    ] });

            if (cuttingCuttingTool) {
                return cuttingCuttingTool
            } else {
                return false
            }

        } else {
            return new Error (`No se pudo encontrar la Herramienta!`)
        }
    }
    
    async createNewCuttingTool(newCuttingTool) {
        if (newCuttingTool) {
            let designation = newCuttingTool.designation || "Sin designación",
                code = newCuttingTool.code,
                type = newCuttingTool.type,
                diam = newCuttingTool.diam || 2,
                largo = newCuttingTool.largo || 15,
                radio = newCuttingTool.radio || " ",
                cono = newCuttingTool.cono || " ",
                reduccion = newCuttingTool.reduccion || " ",
                prolongacion = newCuttingTool.prolongacion || " ",
                arrastre = newCuttingTool.arrastre || " ",
                terminacion = newCuttingTool.terminacion || " "

            if (!designation || !code || !type || !diam || !largo) {
                process.exit(1)
            
            } else {
                try {
                    const nuevaHerramienta = {
                        designation: designation,
                        code: code,
                        type: type,
                        diam: diam,
                        largo: largo,
                        radio: radio,
                        cono: cono,
                        reduccion: reduccion,
                        prolongacion: prolongacion,
                        arrastre: arrastre,
                        terminacion: terminacion,
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

    async updateCuttingTool(id, updatedCuttingTool, userModificator) {    
        if (id && updatedCuttingTool && userModificator) {
            try {
                const toolMongoDB = await Herramientas.findById( { _id: id } )
                let imageUrl = '', designation = '', characteristics = '', code = '', type = '', stock = 0,
                    diam = 0, largo = 0, radio = '', cono = '', reduccion = '', prolongacion = '',
                    arrastre = '', terminacion = ''
                
                updatedCuttingTool.imageCuttingTool !== '' ? imageUrl = updatedCuttingTool.imageCuttingTool : imageUrl = toolMongoDB.imageCuttingTool
                updatedCuttingTool.designation !== '' ? designation = updatedCuttingTool.designation : designation = toolMongoDB.designation
                updatedCuttingTool.characteristics !== '' ? characteristics = updatedCuttingTool.characteristics : characteristics = toolMongoDB.characteristics
                updatedCuttingTool.code !== '' ? code = updatedCuttingTool.code : code = toolMongoDB.code
                updatedCuttingTool.type !== '' ? type = updatedCuttingTool.type : type = toolMongoDB.type
                updatedCuttingTool.stock !== '' ? stock = updatedCuttingTool.stock : stock = toolMongoDB.stock
                updatedCuttingTool.diam !== 0 ? diam = updatedCuttingTool.diam : diam = toolMongoDB.diam
                updatedCuttingTool.largo !== 0 ? largo = updatedCuttingTool.largo : largo = toolMongoDB.largo
                updatedCuttingTool.radio !== 0 ? radio = updatedCuttingTool.radio : radio = toolMongoDB.radio
                updatedCuttingTool.cono !== 0 ? cono = updatedCuttingTool.cono : cono = toolMongoDB.cono
                updatedCuttingTool.reduccion !== 0 ? reduccion = updatedCuttingTool.reduccion : reduccion = toolMongoDB.reduccion
                updatedCuttingTool.prolongacion !== 0 ? prolongacion = updatedCuttingTool.prolongacion : prolongacion = toolMongoDB.prolongacion
                updatedCuttingTool.arrastre !== 0 ? arrastre = updatedCuttingTool.arrastre : arrastre = toolMongoDB.arrastre
                updatedCuttingTool.terminacion !== 0 ? terminacion = updatedCuttingTool.terminacion : terminacion = toolMongoDB.terminacion

                if(toolMongoDB) {
                    var updatedFinalCuttingTool = await Herramientas.updateOne(
                        { _id: toolMongoDB._id  },
                        {
                            $set: {
                                designation: designation,
                                code: code,
                                type: type,
                                stock: parseInt(stock),
                                diam: parseInt(diam),
                                largo: parseInt(largo),
                                radio: radio,
                                cono: cono,
                                reduccion: reduccion,
                                prolongacion: prolongacion,
                                arrastre: arrastre,
                                terminacion: terminacion,
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
        // console.log('Disconnected from MongoDB Server')
    }
}

module.exports = HerramientasDaoMongoDB 