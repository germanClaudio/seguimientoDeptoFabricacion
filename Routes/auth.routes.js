const { Router } = require('express'),
    authRouter = Router(),

    { countVisits } = require('../middlewares/countVisits/countVisits.middleware.js'),
    { checkAuthentication } = require('../middlewares/chekAuthentication.js'),
    { authUserMiddleware } = require('../middlewares/authUser.middleware.js'),
    { sessionPostLogin } = require('../controllers/session.controllers.js'),

    { ensureAuthenticated } = require('../middlewares/authUserResetPass.middleware.js'),

    csrf = require('csrf'),
    csrfTokens = csrf(),

    GetUsers = require('../controllers/usuarios.controller.js'),
    getUsers = GetUsers.UsersController,
    users = new getUsers(),

    GetConsumibles = require('../controllers/consumibles.controller.js'),
    getConsumibles = GetConsumibles.ConsumiblesController,
    consumibles = new getConsumibles()

//_______________________________ login _____________________________________ //
authRouter.get('/login', (req, res) => { // lleva la vista del formulario de login
    const flag = Boolean(false), fail = Boolean(false),
        csrfToken = csrfTokens.create(req.csrfSecret);
    res.render('login', {
        flag,
        fail,
        csrfToken
    })
})

authRouter.post('/login', sessionPostLogin, countVisits, users.login)

//_____________________________ forgot password _______________________ //
authRouter.get('/forgot-password', (req, res) => {
    const flag = Boolean(false), fail = Boolean(false),
        csrfToken = csrfTokens.create(req.csrfSecret);

    res.render('forgot-password', {
        flag,
        fail,
        csrfToken
    })
})

authRouter.post('/forgot-password', authUserMiddleware, users.login)

//------------------------ Clientes ----------------------------------
authRouter.get('/clientes', checkAuthentication, users.clientes)

//------------------------ index ----------------------------------
authRouter.get('/index', checkAuthentication, users.index)

authRouter.get('/indexToolShop', checkAuthentication, users.index)

//--------------------- Reset Password ------------------------------
authRouter.post('/resetUserPassword', users.resetUserPassword)

authRouter.get('/reset-password', ensureAuthenticated, (req, res) => {
    const csrfToken = csrfTokens.create(req.csrfSecret),
        userInformation = req.user

    res.render('resetNewUserPassword', {
        userInformation: userInformation,
        csrfToken
    })
});

//____________________________ logout _________________________________
authRouter.post('/logout', checkAuthentication, users.userLogout)

module.exports = { 
    authRouter 
}