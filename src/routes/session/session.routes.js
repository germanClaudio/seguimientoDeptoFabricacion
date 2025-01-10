const { Router } = require('express'),
    { sessionGet, sessionLogout, sessionPostLogin } = require('../../controllers/session.controllers.js'),
    { authMiddleware } = require('../../middleware/auth.middleware'),
    routerSession = Router()

routerSession.get('/', authMiddleware, sessionGet)
routerSession.get('/logout', sessionLogout)
routerSession.get('/login', sessionGet )
routerSession.post('/login', sessionPostLogin )

module.exports = routerSession