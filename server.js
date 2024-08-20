const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const csrf = require('csrf');
const path = require('path');

require('dotenv').config({
    path: process.env.MODO === 'dev'
        ? path.resolve(__dirname, '.env')
        : path.resolve(__dirname, '.env')
})

const cors = require('cors')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const routerUsers = require('./Routes/usuarios.route.js')
const routerClientes = require('./Routes/clientes.route.js')
const routerProyectos = require('./Routes/proyectos.route.js')
// const routerProgramas = require('./Routes/programas.route.js')
const routerMensajes = require('./Routes/mensajes.route.js')

const { infoRouter } = require('./Routes/info.routes.js')
const { authRouter } = require('./Routes/auth.routes.js')

const initSocket = require('./utils/initSocket.js')

//______________________________ mongo para session ______________________________ //
const MongoStore = require('connect-mongo')
const advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000}

//________________________________________________________________________________ //
const passport = require('passport')
//________________________________________________________________________________ //

const options = require('./options/config.js');
const catchErrors = require('./middlewares/errors.middleware.js');

const initServer = () => {

    const app = express()
    const httpServer = new HttpServer(app)
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
        saveUninitialized: false,
    }))

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
    // app.use('/api/programas', routerProgramas)
    app.use('/api/auth', authRouter)
    app.use('/api/usuarios', routerUsers)
    app.use('/info', infoRouter)
    app.use('/api/webchat', routerMensajes)
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