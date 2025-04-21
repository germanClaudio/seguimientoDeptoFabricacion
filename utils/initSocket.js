const ContainerMessages = require("../daos/mensajes/MensajesDaoFactory.js"),
    containerMsg = ContainerMessages.getDaoMsg(),

    ContainerClients = require("../daos/clientes/ClientesDaoFactory.js"),
    containerClient = ContainerClients.getDao(),

    ContainerProjects = require("../daos/proyectos/ProyectosDaoFactory.js"),
    containerProject = ContainerProjects.getDao(),

    ContainerProgramms = require('../daos/programacion/ProgramasDaoFactory.js'),
    containerProgramm = ContainerProgramms.getDaoProgramms(),

    ContainerUsers = require("../daos/usuarios/UsuariosDaoFactory.js"),
    containerUser = ContainerUsers.getDaoUsers(),

    ContainerTools = require("../daos/maquinas/MaquinasDaoFactory.js"),
    containerTool = ContainerTools.getDaoTools(),

    ContainerCuttingTools = require("../daos/herramientas/HerramientasDaoFactory.js"),
    containerCuttingTool = ContainerCuttingTools.getDaoCuttingTools(),

    ContainerConsumibles = require("../daos/consumibles/ConsumiblesDaoFactory.js"),
    containerConsumibles = ContainerConsumibles.getDaoConsumibles(),

    ContainerSuppliers = require("../daos/proveedores/ProveedoresDaoFactory.js"),
    containerSupplier = ContainerSuppliers.getDaoSuppliers(),

    ContainerOrders = require("../daos/ordenes/OrdenesDaoFactory.js"),
    containerOrders = ContainerOrders.getDaoOrders(),

    { schema } = require("normalizr"),

    initSocket = (io) => {
        io.on("connection", async (socket) => {
            console.log("Nuevo usuario conectado!")

            // --------------------------  Clientes --------------------------------
            socket.emit('clientsAll',
                await containerClient.getAllClients(),
                await containerUser.getAllUsers()
            )

            socket.on('newCliente', async (cliente) => {
                await containerClient.createNewClient(cliente)
                io.sockets.emit('clientsAll', 
                    await containerClient.getAllClients()
                )
            })

            socket.on('updateCliente', async (id, cliente) => {
                await containerClient.updateClient(id, cliente)
                io.sockets.emit('clientsAll', 
                    await containerClient.getAllClients()
                )
            })
            
            socket.on('deleteCliente', async (cliente) => {
                await containerClient.deleteClientById(cliente)
                io.sockets.emit('clientsAll', 
                    await containerClient.getAllClients()
                )
            })

            socket.on('searchClienteAll', async (query) => {
                io.sockets.emit('searchClientsAll', 
                    await containerClient.getClientBySearching(query)
                )
            })

            socket.on('searchClienteNew', async (query) => {
                io.sockets.emit('searchClientsNew', 
                    await containerClient.getClientBySearching(query)
                )
            })

            // --------------------------  Projects --------------------------------
            socket.on('searchProyectoAll', async (query) => {
                io.sockets.emit('searchProjects', 
                    await containerProject.getProjectBySearching(query)
                )
            })

            socket.emit('projectsAll',
                await containerProject.getAllProjects(),
                await containerUser.getAllUsers()            
            )

            socket.emit('projectsAllWon',
                await containerProgramm.getAllProjectsWon(),
                await containerUser.getAllUsers()
            )
            
            //-------------------------------- Users  ----------------------------------
            socket.on('newUsuario', async (usuario) => {
                await containerUser.createNewUser(usuario)
                io.sockets.emit('usersAll', 
                    await containerUser.getAllUsers()
                )
            })
            
            socket.on('searchUsuarioAll', async (query) => {
                io.sockets.emit('searchUsersAll', 
                    await containerUser.getUsersBySearching(query)
                )
            })

            //-------------------------------- Tools  ----------------------------------
            socket.on('newMaquina', async (maquina) => {
                await containerTool.createNewTool(maquina)
                io.sockets.emit('toolsAll', 
                    await containerTool.getAllTools()
                )
            })
            
            socket.on('searchMaquinaAll', async (query) => {
                io.sockets.emit('searchToolsAll', 
                    await containerTool.getToolsBySearching(query)
                )
            })

            //-------------------------------- CuttingTools  ----------------------------------
            socket.on('newHerramienta', async (herramienta) => {
                await containerCuttingTool.createNewCuttingTool(herramienta)
                io.sockets.emit('cuttingToolsAll', 
                    await containerCuttingTool.getAllCuttingTools()
                )
            })
            
            socket.on('searchHerramientaAll', async (query) => {
                io.sockets.emit('searchCuttingToolsAll', 
                    await containerCuttingTool.getCuttingToolsBySearching(query)
                )
            })

            //-------------------------------- Consumibles  ----------------------------------
            socket.on('newConsumibles', async (consumibles) => {
                await containerConsumibles.createNewConsumibles(consumibles)
                io.sockets.emit('ConsumiblesAll', 
                    await containerConsumibles.getAllConsumibles()
                )
            })
            
            socket.on('searchConsumiblesAll', async (query) => {
                io.sockets.emit('searchConsumiblesAll', 
                    await containerConsumibles.getConsumiblesBySearching(query)
                )
            })

            //-------------------------------- Suppliers  ----------------------------------
            socket.on('newProveedor', async (proveedor) => {
                await containerSupplier.createNewSupplier(proveedor)
                io.sockets.emit('suppliersAll', 
                    await containerSupplier.getAllSuppliers()
                )
            })
            
            socket.on('searchProveedorAll', async (query) => {
                io.sockets.emit('searchSuppliersAll', 
                    await containerSupplier.getSuppliersBySearching(query)
                )
            })

            // -----------------------------  Messages ---------------------------------
            async function listarMensajesNormalizados() {
                const mensajes = await containerMsg.getAllMessages()
                return mensajes//normalizados;
            }

            // NORMALIZACIÓN DE MENSAJES
            // Definimos un esquema de autor
            const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" } );
            // Definimos un esquema de mensaje
            const schemaMensaje = new schema.Entity("post", { author: schemaAuthor }, { idAttribute: "id" });
            // Definimos un esquema de posts
            const schemaMensajes = new schema.Entity("posts", { mensajes: [schemaMensaje] }, { idAttribute: "id" });

            socket.emit("mensajesAll",
                await listarMensajesNormalizados(),
                await containerUser.getAllUsers()
            )

            socket.on("newMensaje", async (message) => {
                await containerMsg.createNewMessage(message)
                io.sockets.emit("mensajesAll",
                    await listarMensajesNormalizados(),
                    await containerUser.getAllUsers())
            })
        
            //-------------------- usuarios ----------------------
            socket.emit('usersAll', 
                await containerUser.getAllUsers()
            )

            socket.on('newUsuario', async (usuario) => {
                await containerUser.createNewUser(usuario)
                io.sockets.emit('usersAll', 
                    await containerUser.getAllUsers()
                )
            })

            //-------------------- maquinas ----------------------
            socket.emit('toolsAll', 
                await containerTool.getAllTools(),
                await containerUser.getAllUsers()
            )

            socket.on('newMaquina', async (maquina) => {
                await containerTool.createNewTool(maquina)
                io.sockets.emit('toolsAll', 
                    await containerTool.getAllTools()
                )
            })

            socket.on('searchToolAll', async (query) => {
                io.sockets.emit('searchToolsAll', 
                    await containerTool.getToolsBySearching(query)
                )
            })

            socket.on('searchToolNew', async (query) => {
                io.sockets.emit('searchToolsNew', 
                    await containerTool.getToolsBySearching(query)
                )
            })

            //-------------------- herramientas ----------------------
            socket.emit('cuttingToolsAll', 
                await containerCuttingTool.getAllCuttingTools(),
                await containerUser.getAllUsers()
            )

            socket.on('newHerramienta', async (herramienta) => {
                await containerCuttingTool.createNewTool(herramienta)
                io.sockets.emit('cuttingToolsAll', 
                    await containerCuttingTool.getAllCuttingTools()
                )
            })

            socket.on('searchCuttingToolAll', async (query) => {
                io.sockets.emit('searchCuttingToolsAll', 
                    await containerCuttingTool.getCuttingToolsBySearching(query)
                )
            })

            socket.on('searchCuttingToolNew', async (query) => {
                io.sockets.emit('searchCuttingToolsNew', 
                    await containerCuttingTool.getCuttingToolsBySearching(query)
                )
            })

            //-------------------- consumibles ----------------------
            socket.emit('consumiblesAll', 
                await containerConsumibles.getAllConsumibles(),
                await containerUser.getAllUsers()
            )

            socket.on('newConsumible', async (consumible) => {
                await containerConsumibles.createNewConsumible(consumible)
                io.sockets.emit('consumiblesAll', 
                    await containerConsumibles.getAllConsumibles()
                )
            })

            socket.on('searchConsumibleAll', async (query) => {
                io.sockets.emit('searchConsumiblesAll', 
                    await containerConsumibles.getConsumiblesBySearching(query)
                )
            })

            socket.on('searchConsumibleNew', async (query) => {
                io.sockets.emit('searchConsumiblesNew', 
                    await containerConsumibles.getConsumiblesBySearching(query)
                )
            })

            //-------------------- proveedores ----------------------
            socket.emit('suppliersAll', 
                await containerSupplier.getAllSuppliers(),
                await containerUser.getAllUsers()
            )

            socket.on('newProveedor', async (proveedor) => {
                await containerSupplier.createNewSupplier(proveedor)
                io.sockets.emit('suppliersAll', 
                    await containerSupplier.getAllSuppliers()
                )
            })

            socket.on('searchSupplierAll', async (query) => {
                io.sockets.emit('searchSuppliersAll', 
                    await containerSupplier.getSuppliersBySearching(query)
                )
            })

            socket.on('searchSupplierNew', async (query) => {
                io.sockets.emit('searchSuppliersNew', 
                    await containerSupplier.getSuppliersBySearching(query)
                )
            })

            //-------------------- ordenes ----------------------
            socket.emit('ordersUsers',
                await containerUser.getAllUsers()
            )

            // Escuchar el evento 'sendUser' desde el cliente
            socket.on('sendUser', async (user, userAdmin) => {
                try {
                    // Obtener los datos usando el user
                    const allOrders = await containerOrders.getAllOrders(),
                        ordersByUser = await containerOrders.getAllOrdersByUserId(user),
                        allUsers = await containerUser.getAllUsers();

                    // Emitir los datos de vuelta al cliente
                    socket.emit('ordersAllByUserId', {
                        allOrders,
                        ordersByUser,
                        allUsers,
                        userAdmin
                    });

                } catch (error) {
                    console.error("Error al obtener los datos:", error);
                    socket.emit('error', { message: "Error al obtener los datos" });
                }
            });

            // Escuchar el evento 'sendUser' desde el cliente
            socket.on('sendUserActive', async (user, userAdmin) => {
                //console.log('user: ', user, ' userAdmin: ', userAdmin)
                try {
                    // Obtener los datos usando el user
                    const allOrders = await containerOrders.getActiveOrders(),
                        ordersByUser = await containerOrders.getActiveOrdersByUserId(user),
                        allUsers = await containerUser.getAllUsers();

                    // Emitir los datos de vuelta al cliente
                    socket.emit('ordersActive', {
                        allOrders,
                        ordersByUser,
                        allUsers,
                        userAdmin
                    });

                } catch (error) {
                    console.error("Error al obtener los datos:", error);
                    socket.emit('error', { message: "Error al obtener los datos" });
                }
            });

            // Escuchar el evento 'sendUser' desde el cliente
            socket.on('sendUserNonActive', async (user, userAdmin) => {
                try {
                    // Obtener los datos usando el user
                    const allOrders = await containerOrders.getNonActiveOrders(),
                        ordersByUser = await containerOrders.getNonActiveOrdersByUserId(user),
                        allUsers = await containerUser.getAllUsers();

                    // Emitir los datos de vuelta al cliente
                    socket.emit('ordersNonActive', {
                        allOrders,
                        ordersByUser,
                        allUsers,
                        userAdmin
                    });

                } catch (error) {
                    console.error("Error al obtener los datos:", error);
                    socket.emit('error', { message: "Error al obtener los datos" });
                }
            });

            socket.on('searchOrdenAllUser', async (query) => {
                io.sockets.emit('searchOrdenesAllUser', 
                    await containerOrders.getOrdenesBySearchingUser(query)
                )
            });

            //----------- Items consumidos por User/s between dates -------------
            socket.on('searchConsumoItemsAllDates', async (query) => {
                io.sockets.emit('searchConsumoItemsDates',
                    await containerOrders.getItemsConsumidosBySearchingUser(query)
                )
            });

        });

        io.on('disconnect', () => {
            console.log(`User desconectado`)
        })
    }

module.exports = initSocket