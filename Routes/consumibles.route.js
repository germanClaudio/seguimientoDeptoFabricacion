const { Router } = require('express')
const routerConsumibles = Router()

const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
// const { authUserMiddleware } = require('../middlewares/authUser.middleware.js')

const GetConsumibles = require('../controllers/consumibles.controller.js')
const getConsumibles = GetConsumibles.ConsumiblesController
const consumibles = new getConsumibles()

//---------------- Get All Consumibles in DB ------------------
routerConsumibles.get('/', checkAuthentication, consumibles.getAllConsumibles)

//---------------- Get Consumible by Id  ----------------------
routerConsumibles.get('/:id', checkAuthentication, consumibles.getConsumibleById)

//---------------- Create a New Consumible  -------------------
routerConsumibles.post('/newConsumibles', checkAuthentication, consumibles.createNewConsumible)

//---------------- Update a Consumible  -----------------------
routerConsumibles.post('/update/:id', checkAuthentication, consumibles.updateConsumible)

//---------------- Delete a Consumible  -----------------------
routerConsumibles.get('/delete/:id', checkAuthentication, consumibles.deleteConsumibleById)

//---------------- Search a Consumible sort by designation -----------------------
routerConsumibles.get('/searchConsumibles/all', checkAuthentication, consumibles.searchConsumibles)

//---------------- Modify stock items selected by id -----------------------
routerConsumibles.post('/modificarStock', checkAuthentication, consumibles.modificarStockConsumibles)

module.exports = routerConsumibles