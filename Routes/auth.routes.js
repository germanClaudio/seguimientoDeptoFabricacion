const { Router } = require('express')
const authRouter = Router()

const { countVisits } = require('../middlewares/countVisits/countVisits.middleware.js')
const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
const { authUserMiddleware } = require('../middlewares/authUser.middleware.js')
const { sessionPostLogin } = require('../controllers/session.controllers.js')

const { ensureAuthenticated } = require('../middlewares/authUserResetPass.middleware.js')

const csrf = require('csrf');
const csrfTokens = csrf();

const GetUsers = require('../controllers/usuarios.controller.js')
const getUsers = GetUsers.UsersController
const users = new getUsers()

//_______________________________ login _____________________________________ //
authRouter.get('/login', (req, res) => { // lleva la vista del formulario de login
    const flag = false
    const fail = false
    const csrfToken = csrfTokens.create(req.csrfSecret);
    res.render('login', {
        flag,
        fail,
        csrfToken
    })
})

authRouter.post('/login', sessionPostLogin, countVisits, users.login)

//_____________________________ forgot password _______________________ //
authRouter.get('/forgot-password', (req, res) => {
    const flag = false
    const fail = false
    const csrfToken = csrfTokens.create(req.csrfSecret);
    res.render('forgot-password', {
        flag,
        fail,
        csrfToken
    })
})

authRouter.post('/forgot-password', authUserMiddleware, users.login)

//------------------------ Clientes ----------------------------------
authRouter.get('/clientes', checkAuthentication, users.clientes)


authRouter.get('/index', checkAuthentication, users.index)


authRouter.post('/resetUserPassword', users.resetUserPassword)

authRouter.get('/reset-password', ensureAuthenticated, (req, res) => {
    const csrfToken = csrfTokens.create(req.csrfSecret);
    const userInformation = req.user

    res.render('resetNewUserPassword', {
        userInformation: userInformation,
        csrfToken
    })
});

//____________________________ logout __________________________________ //
authRouter.post('/logout', checkAuthentication, users.userLogout) //authUserMiddleware,

module.exports = { 
    authRouter 
}