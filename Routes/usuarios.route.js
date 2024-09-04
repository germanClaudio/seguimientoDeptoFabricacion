const { Router } = require('express')
const routerUsers = Router()

const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
const { authUserMiddleware } = require('../middlewares/authUser.middleware.js')

const GetUsers = require('../controllers/usuarios.controller.js')
const getUsers = GetUsers.UsersController
const users = new getUsers()

//---------------- Get All Users in DB ------------------
routerUsers.get('/', checkAuthentication, authUserMiddleware, users.getAllUsers)

//---------------- Get User by Id  ----------------------
routerUsers.get('/:id', checkAuthentication, authUserMiddleware, users.getUserById)

//---------------- Create a New User  -------------------
routerUsers.post('/newUser', checkAuthentication, authUserMiddleware, users.createNewUser)

//---------------- Update a User  -----------------------
routerUsers.post('/update/:id', checkAuthentication, authUserMiddleware, users.updateUser)

//---------------- Update Password User  -----------------------
routerUsers.post('/resetNewUserPassword/:id', users.updatePasswordByUser)

//---------------- Delete a User  -----------------------
routerUsers.get('/delete/:id', checkAuthentication, authUserMiddleware, users.deleteUserById)

//---------------- Search a User sort by permission -----------------------
routerUsers.get('/searchUsers/:userName', checkAuthentication, authUserMiddleware, users.searchUsers)

//---------------- Get User Preferences Page -----------------------
routerUsers.get('/getUserSettings/:id', checkAuthentication, users.getUserSettings)

//---------------- Update User Preferences  -----------------------
routerUsers.post('/updateUserSettings/:id', checkAuthentication, authUserMiddleware, users.updateUserPreferences)

//---------------- Not authorizate session --------------
routerUsers.get("/auth-bloq", checkAuthentication, users.authBloq)

//---------------- Authorizate session --------------
routerUsers.get("/auth-nobloq", checkAuthentication, users.authNoBloq)

module.exports = routerUsers