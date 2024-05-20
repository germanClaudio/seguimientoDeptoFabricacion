// const console = require('../utils/winston')

const ContainerMessages = require("../daos/mensajes/MensajesDaoFactory.js")
const containerMsg = ContainerMessages.getDaoMsg()

const ContainerClients = require("../daos/clientes/ClientesDaoFactory.js")
const containerClient = ContainerClients.getDao()

const ContainerProjects = require("../daos/proyectos/ProyectosDaoFactory.js")
const containerProject = ContainerProjects.getDao()

const ContainerUsers = require("../daos/usuarios/UsuariosDaoFactory.js")
const containerUser = ContainerUsers.getDaoUsers()

const { schema } = require("normalizr")

const initSocket = (io) => {
    io.on("connection", async (socket) => {
        console.log("Nuevo usuario conectado!")
        
        // --------------------------  Clientes --------------------------------
        socket.emit('clientsAll',
            await containerClient.getAllClients(),
            await containerUser.getAllUsers()
        )

        socket.on('newCliente', async (cliente) => {
            await containerClient.createNewClient(cliente)
            io.sockets.emit('clientsAll', await containerClient.getAllClients())
        })

        socket.on('updateCliente', async (id, cliente) => {
            await containerClient.updateClient(id, cliente)
            io.sockets.emit('clientsAll', await containerClient.getAllClients())
        })
        
        socket.on('deleteCliente', async (cliente) => {
            await containerClient.deleteClientById(cliente)
            io.sockets.emit('clientsAll', await containerClient.getAllClients())
        })

        // socket.on('searchClienteAll', async (name) => {
        //   io.sockets.emit('searchClientsAll', await containerClient.searchClientsAll(name))
        // })

        socket.on('searchClienteAll', async (query) => {
            io.sockets.emit('searchClientsAll', await containerClient.getClientBySearching(query))
        })

        // --------------------------  Projects --------------------------------
        socket.emit('projectsAll',
            await containerProject.getAllProjects(),
            await containerUser.getAllUsers()            
        )
        
        // socket.on('newProducto', async (producto) => {
        //     await containerProduct.createNewProduct(producto)
        //     io.sockets.emit('productsAll', await containerProduct.getAllProducts())
        // })
        
        // socket.on('updateProducto', async (id, producto) => {
        //     await containerProduct.updateProduct(id, producto)
        //     io.sockets.emit('productsAll', await containerProduct.getAllProducts())
        // })
        
        // socket.on('deleteProducto', async (producto) => {
        //     await containerProduct.deleteProductById(producto)
        //     io.sockets.emit('productsAll', await containerProduct.getAllProducts())
        // })

        // socket.on('searchProductoAll', async (name) => {
        //   io.sockets.emit('searchProductsAll', await containerProduct.searchProductsAll(name))
        // })
        
        // --------------------------  Products --------------------------------
        // socket.emit('productsAll',
        //     await containerProduct.getAllProducts(),
        //     await containerUser.getAllUsers()
        // ) 
        
        // socket.on('newProducto', async (producto) => {
        //     await containerProduct.createNewProduct(producto)
        //     io.sockets.emit('productsAll', await containerProduct.getAllProducts()) //getCotizacionEnDolares())
        // })
        
        // socket.on('updateProducto', async (id, producto) => {
        //     await containerProduct.updateProduct(id, producto)
        //     io.sockets.emit('productsAll', await containerProduct.getAllProducts()) //.getCotizacionEnDolares())
        // })
        
        // socket.on('deleteProducto', async (producto) => {
        //     await containerProduct.deleteProductById(producto)
        //     io.sockets.emit('productsAll', await containerProduct.getAllProducts())//getCotizacionEnDolares())
        // })

        // socket.on('searchProductoAll', async (name) => {
        //   io.sockets.emit('searchProductsAll', await containerProduct.searchProductsAll(name))
        // })
        
        //-------------------------------- Users  ----------------------------------
        socket.on('newUsuario', async (usuario) => {
            await containerUser.createNewUser(usuario)
            io.sockets.emit('usersAll', await containerUser.getAllUsers())
        })
        
        // --------------------------------  Orders  -------------------------------
        //   socket.emit('ordersAll', await containerCarts.getAllOrders())

        // -----------------------------  Messages ---------------------------------
            // const normalizarMensajes = (mensajesConId) =>
            // normalize(mensajesConId, schemaMensajes)

        async function listarMensajesNormalizados() {
            const mensajes = await containerMsg.getAllMessages()
            // const normalizados = normalizarMensajes({ mensajes }); //id: "mensajes",
            
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
            console.log('message: ', message)
            await containerMsg.createNewMessage(message)
            io.sockets.emit("mensajesAll",
                await listarMensajesNormalizados(),
                await containerUser.getAllUsers())
        })
    
        //-------------------- usuarios ----------------------
        socket.emit('usersAll', await containerUser.getAllUsers())

        socket.on('newUsuario', async (usuario) => {
            await containerUser.createNewUser(usuario)
            io.sockets.emit('usersAll', await containerUser.getAllUsers())
        })

        socket.on('disconnect', () => {
            console.log(`User desconectado`)
        })
    })
}

module.exports = initSocket