const { Router } = require('express')
const authRouter = Router()

const { countVisits } = require('../middlewares/countVisits/countVisits.middleware.js')
const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
const { authUserMiddleware } = require('../middlewares/authUser.middleware.js')
const { sessionPostLogin } = require('../controllers/session.controllers.js')

const { ensureAuthenticated } = require('../middlewares/authUserResetPass.middleware.js')

// const { generateToken } = require('../utils/generateToken')

const GetUsers = require('../controllers/usuarios.controller.js')
const getUsers = GetUsers.UsersController
const users = new getUsers()

// const serverMongoDB = require('../usuarios/userMongoDB')
// const constructor = serverMongoDB.ServerMongoDB
// const server = new constructor()


//_______________________________ login _____________________________________ //
authRouter.get('/login', (req, res) => { // lleva la vista del formulario de login
    const flag = false
    const fail = false
    res.render('login', { flag, fail })
})


authRouter.post('/login', sessionPostLogin, countVisits, users.login)

//_____________________________ forgot password _______________________ //
authRouter.get('/forgot-password', (req, res) => {
    const flag = false
    const fail = false
    res.render('forgot-password', { flag, fail })
})

authRouter.post('/forgot-password', authUserMiddleware, users.login)

//------------------------ Clientes ----------------------------------
authRouter.get('/clientes', checkAuthentication, users.clientes)


authRouter.get('/index', checkAuthentication, users.index)


authRouter.post('/resetUserPassword', users.resetUserPassword)

authRouter.get('/reset-password', ensureAuthenticated, (req, res) => {
    // console.log('req.user: ', req.user)
    const userInformation = req.user

    res.render('resetNewUserPassword', { userInformation: userInformation })
  });

//____________________________ logout __________________________________ //
authRouter.post('/logout', checkAuthentication, users.userLogout) //authUserMiddleware,

module.exports = { 
    authRouter 
}