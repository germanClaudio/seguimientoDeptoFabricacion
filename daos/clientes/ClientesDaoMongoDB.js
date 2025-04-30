const ContenedorMongoDB = require('../../contenedores/containerMongoDB.js')
const mongoose = require('mongoose')
const Clientes = require('../../models/clientes.models.js')

const advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000 }

const { switchFilterClients } = require('../../utils/switchFilterClients.js')

//const formatDate = require('../../utils/formatDate.js')

class ClientesDaoMongoDB extends ContenedorMongoDB {
    constructor(cnxStr) {
        super(cnxStr)   
    }

    async init() {
        // await this.connection
        mongoose.connect(this.cnxStr, advancedOptions)
        console.log('Connected to MongoDB Server 1-2-3 - ClientesDaoFactory.js')
    }
    
    async getAllClients() {
        try {
            const clients = await Clientes.find({
                visible: true
            }).sort({ 
                timestamp: -1, // Luego ordena por "timestamp" de más reciente a más antiguo
                modifiedOn: -1 // Luego ordena por "timestamp" de más reciente a más antiguo
            });
            
            if (!clients) {
                return new Error ('No hay clientes en la DB!')
            
            } else {
                // console.info('Clientes encontrados...>')
                // await Clientes.updateMany(
                //     {}, // Filtro vacío para seleccionar todos los documentos
                //     {
                //         $set: {
                //             "projectLineas": 0 // Establece el valor por defecto
                //         }
                //     }
                // );
                // const clients = await Clientes.find()

                // await Clientes.updateMany(
                //     {}, // Filtro para todos los documentos (ajústalo si es necesario)
                //     [
                //       {
                //         $set: {
                //           // Convertir "timestamp" a Date (formato "dd-mm-yyyy HH.mm.ss")
                //           timestamp: {
                //             $dateFromString: {
                //               dateString: {
                //                 $concat: [
                //                   { $substr: ["$timestamp", 6, 4] }, // Año
                //                   "-",
                //                   { $substr: ["$timestamp", 3, 2] }, // Mes
                //                   "-",
                //                   { $substr: ["$timestamp", 0, 2] }, // Día
                //                   "T",
                //                   { $substr: ["$timestamp", 11, 2] }, // Hora
                //                   ":",
                //                   { $substr: ["$timestamp", 14, 2] }, // Minutos
                //                   ":",
                //                   { $substr: ["$timestamp", 17, 2] }, // Segundos
                //                   ".000Z" // Milisegundos y Zona horaria (UTC)
                //                 ]
                //               },
                //               format: "%Y-%m-%dT%H:%M:%S.%LZ" // Formato ISO
                //             }
                //           },
                //           // Convertir "modifiedOn" a Date, o usar "timestamp" si es ""
                //           modifiedOn: {
                //             $cond: {
                //               if: { $eq: ["$modifiedOn", ""] }, // Si modifiedOn es ""
                //               then: {
                //                 $dateFromString: {
                //                   dateString: {
                //                     $concat: [
                //                       { $substr: ["$timestamp", 6, 4] }, // Año
                //                       "-",
                //                       { $substr: ["$timestamp", 3, 2] }, // Mes
                //                       "-",
                //                       { $substr: ["$timestamp", 0, 2] }, // Día
                //                       "T",
                //                       { $substr: ["$timestamp", 11, 2] }, // Hora
                //                       ":",
                //                       { $substr: ["$timestamp", 14, 2] }, // Minutos
                //                       ":",
                //                       { $substr: ["$timestamp", 17, 2] }, // Segundos
                //                       ".000Z" // Milisegundos y Zona horaria (UTC)
                //                     ]
                //                   },
                //                   format: "%Y-%m-%dT%H:%M:%S.%LZ"
                //                 }
                //               },
                //               else: {
                //                 $dateFromString: {
                //                   dateString: {
                //                     $concat: [
                //                       { $substr: ["$modifiedOn", 6, 4] }, // Año
                //                       "-",
                //                       { $substr: ["$modifiedOn", 3, 2] }, // Mes
                //                       "-",
                //                       { $substr: ["$modifiedOn", 0, 2] }, // Día
                //                       "T",
                //                       { $substr: ["$modifiedOn", 11, 2] }, // Hora
                //                       ":",
                //                       { $substr: ["$modifiedOn", 14, 2] }, // Minutos
                //                       ":",
                //                       { $substr: ["$modifiedOn", 17, 2] }, // Segundos
                //                       ".000Z" // Milisegundos y Zona horaria (UTC)
                //                     ]
                //                   },
                //                   format: "%Y-%m-%dT%H:%M:%S.%LZ"
                //                 }
                //               }
                //             }
                //           }
                //         }
                //       }
                //     ]
                //   );

                // const clients = await Clientes.find()
                return clients
            }
            
        } catch (error) {
            console.error("Error MongoDB getClients: ",error)
            return new Error ('No hay clientes en la DB!')
        }
    }

    async searchClientsAll(name) {
        const query = name.name
        try {
            const clients = await Clientes.find( {$or:[ { name: query }, { code: query } ] } ).exec()
            if (!clients) {
                return null
            } else {
                return clients
            }    
        } catch (error) {
            console.error("Error MongoDB searched Clientes: ", error)
            return new Error ('No hay clientes en la DB!')
        }
    }

    async getClientById(id) {
        // console.log('id: ', id)
        // console.log('id-typeOf: ', typeof id)

        if (!id) {
            try {
                const clients = await Clientes.find({
                    visible: true
                }).sort({ 
                    timestamp: -1, // Luego ordena por "timestamp" de más reciente a más antiguo
                    modifiedOn: -1 // Luego ordena por "modifiedOn" de más reciente a más antiguo
                });
                return clients

            } catch (error) {
                console.error("Error MongoDB getClientById-Dao1: ",error)
            }

        } else {
            try {
                const client = await Clientes.findById({_id: id })
                // console.info('Cliente encontrado: ',client)
                return client

            } catch (error) {
                console.error("Error MongoDB getClientById-Dao2: ", error)
            }
        }
    }

    async getClientByNameOrCode(name, code) {   
        if(name || code){
            try {
                const client = await Clientes.findOne({
                    $or: [
                        { name: name },
                        { code: code }
                    ]
                });
                // console.info('Cliente encontrado: ',client)
                return client

            } catch (error) {
                console.error("Error MongoDB getClientByName-Dao: ", error)
            }

        } else {
            return false
        }
    }

    async selectClientById(id) {
        if(id){
            try {
                const client = await Clientes.findById({_id: id })
                return client
                
            } catch (error) {
                console.error("Error MongoDB selectClientById-Dao: ",error)
            }
            
        } else {
            return false
        }
    }

    async getClientProjectsById(id) {
        if(id){
            try {
                const client = await Clientes.findById({_id: id})
                return client

            } catch (error) {
                console.error("Error MongoDB getClientProjectsById: ",error)
            }

        } else {
            try {
                const clients = await Clientes.find()
                return clients

            } catch (error) {
                console.error("Error MongoDB getClientProjectsById: ",error)
            }
        }
    }

    async getClientByProjectId(id) {
        if(id){
            try {
                const client = await Clientes.findById({_id: id })
                // console.info('Cliente encontrado: ',client)
                return client
            } catch (error) {
                console.error("Error MongoDB getClientByProjectId: ",error)
            }
        } else {
            try {
                const clients = await Clientes.find()
                return clients
            } catch (error) {
                console.error("Error MongoDB getClientByProjectId: ",error)
            }
        }
    }

    async getExistingClient(newClient) {
        if (newClient) {
            const client = await Clientes.findOne(
                { $or: [ {name: `${newClient.name}`},
                        {code: `${newClient.code}`}
                        ]
                }).sort({ 
                    timestamp: -1,
                    modifiedOn: -1
                });

            client ? client : false

        } else {
            return new Error (`No se pudo encontrar al Cliente!`)
        }
    }

    async createNewClient(client){
        if(client) {
            try {
                const itemMongoDB = await Clientes.findOne({name: `${client.name}`})
                if (itemMongoDB) {
                    // console.error("Cliente con Nombre existente!! ")
                    return new Error (`Cliente ya existe con este nombre: ${client.name}!`)

                } else {
                    const newClient = new Clientes(client)
                    await newClient.save()
                    // console.info('Client ', newClient, ' created')
                    return newClient
                }

            } catch (error) {
                console.error("Error MongoDB createClient: ",error)
            }
            
        } else {
            return new Error (`No se pudo crear el Cliente!`)
        }
    }

    async updateClient(id, client, userModificator) {
        if (id && client) {
            try {
                const itemMongoDB = await Clientes.findById({_id: id})
                let logoCliente = ''
                client.logo === '' ? logoCliente = itemMongoDB.logo : logoCliente = client.logo  
                
                if(itemMongoDB) {
                    let updatedClient = await Clientes.updateOne(
                        { _id: itemMongoDB._id },
                        {
                            $set: {
                                name: client.name,
                                status: client.status,
                                logo: logoCliente,
                                code: client.code,
                                modificator: userModificator,
                                modifiedOn: new Date(),
                            }
                        },
                        { new: true }
                    )

                    // console.log('updatedClient-Dao: ', updatedClient)
                    
                    if(updatedClient.acknowledged) {
                        const itemUpdated = await Clientes.findById({ _id: id })
                        // console.log('itemUpdated-Dao: ', itemUpdated)
                        return itemUpdated

                    } else {
                        return new Error(`No se actualizó el item: ${itemUpdated._id}`)
                    }

                } else {
                    return new Error(`Cliente no existe con este id: ${itemUpdated._id}`)
                }

            } catch (error) {
                console.error("Error MongoDB updateClient: ",error)
                return new Error (`No se pudo actualizar el Cliente!`)
            }

        } else {
            return new Error (`No se pudo actualizar el Cliente!`)
        }
    }

    async updateClientProjectsQty(id, clienteSelected, userModificator, uNegocio) {
        let updatedClientProjectsQty
        if (id && clienteSelected && uNegocio) {
            try {
                const itemMongoDB = await Clientes.findById({_id: id})
            
                if (itemMongoDB) {
                    if (uNegocio === 'matrices') {
                        updatedClientProjectsQty = await Clientes.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: {
                                    project: parseInt(itemMongoDB.project + 1),
                                    modificator: userModificator,
                                    modifiedOn: new Date(),
                                }
                            },
                            { new: true }
                        )

                    } else {
                        updatedClientProjectsQty = await Clientes.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: {
                                    projectLineas: parseInt(itemMongoDB.projectLineas + 1),
                                    modificator: userModificator,
                                    modifiedOn: new Date(),
                                }
                            },
                            { new: true }
                        )
                    }
                    
                    if(updatedClientProjectsQty.acknowledged) {
                        const itemUpdated = await Clientes.findById({ _id: id })
                        return itemUpdated
                    }
                    
                } else {
                    // console.info('El Cliente no existe! ', itemMongoDB)
                    return new Error (`No se pudo actualizar el Cliente!`)
                }

            } catch (error) {
                console.error("Error MongoDB updateClient: ",error)
                return new Error (`No se pudo actualizar el Cliente!`)
            }    
        }
    }

    async reduceClientProjectQty(id, clienteSelected, user, uNegocio) {
        let updatedClientProjectsQty
        if (id && clienteSelected && uNegocio) {
            try {
                const itemMongoDB = await Clientes.findById({_id: id})
                
                if(itemMongoDB) {
                    if (uNegocio === 'matrices') {
                        updatedClientProjectsQty = await Clientes.updateOne(
                            { _id: itemMongoDB._id }, 
                            {
                                $set: {
                                    project: parseInt(itemMongoDB.project - 1),
                                    modificator: user,
                                    modifiedOn: new Date(),
                                }
                            },
                            { new: true })

                    } else {
                        updatedClientProjectsQty = await Clientes.updateOne(
                            { _id: itemMongoDB._id },
                            {
                                $set: {
                                    projectLineas: parseInt(itemMongoDB.projectLineas - 1),
                                    modificator: userModificator,
                                    modifiedOn: new Date(),
                                }
                            },
                            { new: true }
                        )
                    }

                    if(updatedClientProjectsQty.acknowledged) {
                        const itemUpdated = await Clientes.findById({ _id: id })
                        return itemUpdated
                    }

                } else {
                    // console.info('Qty. proyectos de Cliente no actualizado ')
                    return new Error (`No se pudo actualizar el Cliente!`)
                }
                
            } catch (error) {
                console.error("Error MongoDB reducing client project qty.: ",error)
                return new Error (`No se pudo actualizar la cantidad de proyectos del Cliente!`)
            }

        } else {
            // console.info('El Cliente no existe!')
            return new Error (`No se pudo actualizar la cantidad de proyectos del Cliente!`)
        }
    }

    async deleteClientById(id, modificator) {
        if(id) {
            try {
                const itemMongoDB = await Clientes.findById({_id: `${id}`})
                
                if(itemMongoDB) {
                    let inactive = Boolean(false)
                    let clientDeleted = await Clientes.updateOne(
                        { _id: id }, 
                        {
                            $set: {
                                visible: inactive,
                                status: inactive,
                                modificator: modificator,
                                modifiedOn: new Date()
                            }
                        },
                        { new: true }
                    )

                    if(clientDeleted.acknowledged) {
                        const itemUpdated = await Clientes.findById({ _id: id })
                        return itemUpdated

                    } else {
                        return new Error(`No se eliminó el item: ${userMongoDB._id}`)
                    }

                } else {
                    console.info('El Cliente no existe! ', id)
                }
            } catch (error) {
                console.error("Error MongoDB deleteClient: ",error)
            }

        }
    }

    async getClientBySearching(query) {
        let nameAndCodeQuery = [{ 'name': { $regex: `${query.query}`, $options: 'i' } }, 
                                { 'code': { $regex: `${query.query}`, $options: 'i' } }]

        const { query: searchQuery, status = 'todos', proyectos = 'all', uNegocio = 'todos' } = query;

        const prefix = searchQuery === '' ? 'null' : 'notNull';
        
        const statusPrefix = {
        todos: 'All',
        activos: 'Active',
        inactivos: 'Inactive'
        }[status];

        const projectSuffix = {
        all: 'All',
        with: 'With',
        without: 'Without'
        }[proyectos];

        const uNegocioSuffix = {
        todos: 'All',
        matrices: 'Matrices',
        lineas: 'Lineas'
        }[uNegocio];

        const filter = [`${prefix}`,`${statusPrefix}`,`${projectSuffix}`,`${uNegocioSuffix}`];

        try {
            const resultados = await switchFilterClients(filter, Clientes, nameAndCodeQuery)
            if (resultados) return resultados.length ? resultados : []

        } catch (error) {
            console.error("Error MongoDB getClientBySearching: ",error)
        }
    }

    async disconnet() {
        await this.disconnection
    }
    
}

module.exports = ClientesDaoMongoDB