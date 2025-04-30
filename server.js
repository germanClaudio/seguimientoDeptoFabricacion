const express = require('express'),
    logger = require('morgan'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    csrf = require('csrf'),
    path = require('path');

require('dotenv').config({
    path: process.env.MODO === 'dev'
        ? path.resolve(__dirname, '.env')
        : path.resolve(__dirname, '.env')
})

const cors = require('cors'),
    { Server: HttpServer } = require('http'),
    { Server: IOServer } = require('socket.io')

const routerUsers = require('./Routes/usuarios.route.js'),
    routerClientes = require('./Routes/clientes.route.js'),
    routerProyectos = require('./Routes/proyectos.route.js'),
    routerProgramas = require('./Routes/programas.route.js'),
    routerAjustes = require('./Routes/ajustes.route.js'),
    routerMensajes = require('./Routes/mensajes.route.js'),
    routerTools = require('./Routes/maquinas.route.js'),
    routerCuttingTools = require('./Routes/herramientas.route.js'),
    routerConsumibles = require('./Routes/consumibles.route.js'),
    routerSuppliers = require('./Routes/proveedores.route.js'),
    routerCarts = require('./Routes/carts.route.js'),
    routerOrders = require('./Routes/orders.route.js'),
    routerLineas = require('./Routes/lineas.route.js')


const { infoRouter } = require('./Routes/info.routes.js'),
    { authRouter } = require('./Routes/auth.routes.js')

const initSocket = require('./utils/initSocket.js')

//______________________________ mongo para session ______________________________ //
const MongoStore = require('connect-mongo'),
    advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000}

//________________________________________________________________________________ //
const passport = require('passport')
//________________________________________________________________________________ //

const options = require('./options/config.js'),
    catchErrors = require('./middlewares/errors.middleware.js');

const initServer = () => {

    const app = express(),
        httpServer = new HttpServer(app)
    // const io = new IOServer(httpServer)
    const io = new IOServer(httpServer, {
        cors: {
            origin: "*", // Permitir todas las solicitudes de origen cruzado (modificar según sea necesario)
            methods: ["GET", "POST"]
        }
    })

    /////////////////////// configuracion de EJS /////////////////////////
    app.set('view engine', 'ejs')
    app.set('views', __dirname + '/public/views/pages')

    //////////////  middleware  ///////////////////////
    app.set('trust proxy', 1) // trust first proxy ---- 16-1-2024
    app.use(session({
        secret: process.env.SECRET_KEY_SESSION,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL_CONNECT_PROD, //MONGO_URL_CONNECT_SESS
            mongoOptions: advancedOptions,
        }),
        httpOnly: true,
        cookie: {
            maxAge: options.sessionTime.expirateTime,
            sameSite: "lax",  // none, lax, strict 
            secure: false //true     
        },
        resave: false,
        saveUninitialized: false
    }))

    app.use('/api/config', (req, res) => {
        res.json({
            URL_GOOGLE_STORE_IMGPROJECTS: process.env.URL_GOOGLE_STORE_IMGPROJECTS,
            URL_GOOGLE_STORE_AVATARS: process.env.URL_GOOGLE_STORE_AVATARS,
            URL_GOOGLE_STORE_LOGOCLIENTS: process.env.URL_GOOGLE_STORE_LOGOCLIENTS,
            URL_GOOGLE_STORE_TOOLIMAGE: process.env.URL_GOOGLE_STORE_TOOLIMAGE,
            URL_GOOGLE_STORE_IMAGESCUTTINGTOOLS: process.env.URL_GOOGLE_STORE_IMAGESCUTTINGTOOLS,
            URL_GOOGLE_STORE_IMAGESCONSUMIBLES: process.env.URL_GOOGLE_STORE_IMAGESCONSUMIBLES,
            URL_GOOGLE_STORE_SUPPLIERIMAGE: process.env.URL_GOOGLE_STORE_SUPPLIERIMAGE
        });
    });

    app.use(passport.initialize())
    app.use(passport.session())

    app.use(express.static(__dirname + 'src/images'))
    app.use(express.static('public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser());
    app.use(cors())
    app.use(logger('dev'));

    const csrfTokens = csrf();
    app.use((req, res, next) => {
        const csrfSecret = req.cookies.csrfSecret || csrfTokens.secretSync();
        res.cookie('csrfSecret',
            csrfSecret,
            { httpOnly: true,
            sameSite: "lax",
            }
        );
        req.csrfSecret = csrfSecret;
        next();
    });


    ////////////////////// Rutas ///////////////////////
    app.use('/api/clientes', routerClientes)
    app.use('/api/proyectos', routerProyectos)
    app.use('/api/programas', routerProgramas)
    app.use('/api/ajustes', routerAjustes)
    app.use('/api/auth', authRouter)
    app.use('/api/usuarios', routerUsers)
    app.use('/info', infoRouter)
    app.use('/api/webchat', routerMensajes)
    app.use('/api/maquinas', routerTools)
    app.use('/api/herramientas', routerCuttingTools)
    app.use('/api/consumibles', routerConsumibles)
    app.use('/api/proveedores', routerSuppliers)
    app.use('/api/carts', routerCarts)
    app.use('/api/ordenes', routerOrders)
    app.use('/api/lineas', routerLineas)
    ///////////////////////////////////////////////////


    //********* Middleware errores *********/
    app.use(catchErrors);
    
    //_______________________________ socket.io __________________________________ //   
    initSocket(io)
    //_____________________________________________________________________________//

    return {
        listen: port => new Promise((res, rej) => {
            const server = httpServer.listen(port, () => {
                res(server)
            })
            server.on('error', err => rej(err))
        })
    }
}

module.exports = initServer