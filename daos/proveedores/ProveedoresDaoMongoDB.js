const ContainerMongoDB = require('../../contenedores/containerMongoDB.js')
const mongoose = require('mongoose')
const Proveedores = require('../../models/proveedores.models.js')

const advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000 }

const formatDate = require('../../utils/formatDate.js')
const util = require('util')
const { switchFilterSuppliers } = require('../../utils/switchFilterSuppliers.js')


class ProveedoresDaoMongoDB extends ContainerMongoDB {
    constructor(cnxStr) {
        super(cnxStr)
    }

    async init() {
        mongoose.connect(this.cnxStr, advancedOptions)
    }

    async getAllSuppliers() {
        try {
            const supplier = await Proveedores.find()
            if(!supplier) {
                return new Error ('No hay proveedores en la DB!')
            } else {
                return supplier
            }

        } catch (error) {
            console.error("Error MongoDB getSuppliers: ", error)
            return new Error ('No hay proveedores en la DB!')
        }
    }

    async getSupplierById(id) {
        if(id){
            try {
                const supplier = await Proveedores.findOne( {_id: `${id}`} )
                if (supplier === undefined || supplier === null) {
                    new Error (`El Proveedor no existe con ese ID${id}!`)
                } else {
                    return supplier
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`El Proveedor no existe con ese ID${id}!`)
        }
    }

    async getSupplierByCode(code) {
        if(code){
            try {
                const supplier = await Proveedores.findOne( {code: `${code}`} )
                if (supplier) {
                    return null
                } else {
                    return supplier
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`Error en codigo ${code}!`)
        }
    }

    async getSupplierByType(type) {
        if(type){
            try {
                const supplier = await Proveedores.findOne( {type: `${type}`} )
                if (supplier) {
                    return null
                } else {
                    return supplier
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            return new Error (`Error en tipo ${type}!`)
        }
    }
    
    async getSupplierByDesignation(designation) { 
        if(designation) {
            try {        
                const supplier = await Proveedores.findOne( {designation: `${designation}`} );
                if (supplier) {
                    return false
                } else {
                    return supplier
                }

            } catch (error) {
                console.error('Aca esta el error vieja: ', error)
            }
        } else {
            return console.error('Aca esta el error(designation invalid)')
        }
    }

    async getSuppliersBySearching(query) {
        let filter
        var designationAndCodeQuery = [{ 'designation': { $regex: `${query.querySupplier}`, $options: 'i' } }, 
                                        { 'code': { $regex: `${query.querySupplier}`, $options: 'i' } },
                                    ]

        if (query.querySupplier === '') {
            if (query.statusSupplier === 'todas') {
                if (query.typeSupplier === 'todas') {
                    filter = 'nullAllAll'
                } else if (query.typeSupplier === 'diseno') {
                    filter = 'nullAllDiseno'
                } else if (query.typeSupplier === 'simulacion') {
                    filter = 'nullAllSimulacion'
                } else {
                    filter = 'nullAllOther'
                }
            } else if (query.statusSupplier) {
                if (query.typeSupplier === 'todas') {
                    filter = 'nullActiveAll'
                } else if (query.typeSupplier === 'diseno') {
                    filter = 'nullActiveDiseno'
                } else if (query.typeSupplier === 'simulacion') {
                    filter = 'nullActiveSimulacion'
                } else {
                    filter = 'nullActiveOther'
                }
            } else if (!query.statusSupplier) {
                if (query.typeSupplier === 'todas') {
                    filter = 'nullInactiveAll'
                } else if (query.typeSupplier === 'diseno') {
                    filter = 'nullInactiveDiseno'
                } else if (query.typeSupplier === 'simulacion') {
                    filter = 'nullInactiveSimulacion'
                } else {
                    filter = 'nullInactiveOther'
                }
            }

        } else {
            if (query.statusSupplier === 'todas') {
                if (query.typeSupplier === 'todas') {
                    filter = 'notNullAllAll'
                } else if (query.typeSupplier === 'diseno') {
                    filter = 'notNullAllDiseno'
                } else if (query.typeSupplier === 'simulacion') {
                    filter = 'notNullAllSimulacion'
                } else {
                    filter = 'notNullAllOther'
                }
            } else if (query.statusSupplier) {
                if (query.typeSupplier === 'todas') {
                    filter = 'notNullActiveAll'
                } else if (query.typeSupplier === 'diseno') {
                    filter = 'notNullActiveDiseno'
                } else if (query.typeSupplier === 'simulacion') {
                    filter = 'notNullActiveSimulacion'
                } else {
                    filter = 'notNullActiveOther'
                }
            } else if (!query.statusSupplier) {
                if (query.typeSupplier === 'todas') {
                    filter = 'notNullInactiveAll'
                } else if (query.typeSupplier === 'diseno') {
                    filter = 'notNullInactiveDiseno'
                } else if (query.typeSupplier === 'simulacion') {
                    filter = 'notNullInactiveSimulacion'
                } else {
                    filter = 'notNullInactiveOther'
                }
            }
        }

        try {
            const resultados = await switchFilterSuppliers(filter, Proveedores, designationAndCodeQuery)
            if (resultados) {
                return resultados
            } else {
                return false
            }

        } catch (error) {
            console.error("Error MongoDB getSuppliersBySearching: ",error)
        }
    }

    async getExistingSupplier(newSupplier) {
        const codeIdNum = newSupplier.code
        
        if (newSupplier) {
            const supplier = await Proveedores.findOne(
                { $or: [ {designation: `${newSupplier.designation}`}, {code: codeIdNum} ] });
            if (supplier) {
                return supplier
            } else {
                return false
            }

        } else {
            return new Error (`No se pudo encontrar el proveedor!`)
        }
    }
    
    async createNewSupplier(newSupplier) {
        if (newSupplier) {
            let designation = newSupplier.designation || "";
            let code = newSupplier.code || "";    

            if (!designation || !code ) {
                process.exit(1)
            } else {
                try {
                    const nuevaProveedor = {
                        designation: newSupplier.designation,
                        code: newSupplier.code,
                        type: newSupplier.type,
                        characteristics: newSupplier.characteristics,
                        imageSupplier: newSupplier.imageSupplier,
                        status: newSupplier.status,
                        creator: newSupplier.creator,
                        timestamp: newSupplier.timestamp,
                        modificator: newSupplier.modificator,
                        modifiedOn: '',
                        visible: newSupplier.visible
                    }             

                    const newSupplierCreated = new Proveedores(nuevaProveedor)
                    await newSupplierCreated.save()
                    return true

                } catch (error) {
                    console.error(error)
                    return new Error (`No se pudo crear el Proveedor! Error Try-catch`)
                }
            }

        } else {
            return new Error (`No se pudo crear el Proveedor! Error else/if`)
        }
    }

    async updateSupplier(id, updatedSupplier, userModificator) {    
        if (id && updatedSupplier && userModificator) {
            try {
                const supplierMongoDB = await Proveedores.findById( { _id: id } )
                let imageUrl = '', designation = '', characteristics = '', code = '', type = ''
                // console.log('updatedSupplier: ', updatedSupplier)
                // console.log('supplierMongoDB: ', supplierMongoDB)
                updatedSupplier.imageSupplier !== '' ? imageUrl = updatedSupplier.imageSupplier : imageUrl = supplierMongoDB.imageSupplier
                updatedSupplier.designation !== '' ? designation = updatedSupplier.designation : designation = supplierMongoDB.designation
                updatedSupplier.characteristics !== '' ? characteristics = updatedSupplier.characteristics : characteristics = supplierMongoDB.characteristics
                updatedSupplier.code !== '' ? code = updatedSupplier.code : code = supplierMongoDB.code
                updatedSupplier.type !== '' ? type = updatedSupplier.type : code = supplierMongoDB.type
                
                if(supplierMongoDB) {
                    var updatedFinalSupplier = await Proveedores.updateOne(
                        { _id: supplierMongoDB._id  },
                        {
                            $set: {
                                designation: designation,
                                code: code,
                                type: type,
                                characteristics: characteristics,
                                imageSupplier: imageUrl,
                                status: updatedSupplier.status,
                                modificator: userModificator,
                                modifiedOn: formatDate()
                            }
                        },
                        { new: true }
                    )

                    return updatedFinalSupplier.acknowledged ?
                        await Proveedores.findById({ _id: id }) 
                        :
                        new Error(`No se actualizó el item: ${itemUpdated._id}`);

                } else {
                    return new Error(`No existe el item Proveedor con este id: ${itemUpdated._id} `)
                }

            } catch (error) {
                console.error("Error MongoDB updateSupplier: ", error)
                return new Error (`No se pudo actualizar el proveedor!`)
            }

        } else {
            console.info('El Proveedor, los datos o el modificador no existen! ', updatedSupplier)
            return new Error (`No se pudo actualizar el Proveedor!`)
        }
    }

    async deleteSupplierById(id, userModificator) {
        if(id){
            try {
                const supplierMongoDB = await Proveedores.findById({_id: id })
            
                if(supplierMongoDB) {
                    let inactive = Boolean(false)
                    var supplierDeleted = await Proveedores.updateOne(
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

                    return supplierDeleted.acknowledged 
                    ? await Proveedores.findById({ _id: id }) 
                    : new Error(`No se eliminó el item: ${userMongoDB._id}`);

                    
                } else {
                    return new Error (`El Proveedor no existe con ese Id: ${id}!`)
                }

            } catch (error) {
                console.error("Error MongoDB deleteSupplier: ",error)
            }

        } else {
            return new Error (`El Proveedor no existe con ese ID${id}!`)
        }    
    }

    async disconnet() {
        await this.disconnection
        console.log('Disconnected from MongoDB Server')
    }
}

module.exports = ProveedoresDaoMongoDB 