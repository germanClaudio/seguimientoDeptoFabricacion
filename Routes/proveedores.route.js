const { Router } = require('express')
const routerSuppliers = Router()

const { checkAuthentication } = require('../middlewares/chekAuthentication.js')
const { authUserMiddleware } = require('../middlewares/authUser.middleware.js')

const GetSuppliers = require('../controllers/proveedores.controller.js')
const getSuppliers = GetSuppliers.SuppliersController
const suppliers = new getSuppliers()

//---------------- Get All Suppliers in DB ------------------
routerSuppliers.get('/', checkAuthentication, suppliers.getAllSuppliers)

//---------------- Get All Suppliers in DB ------------------
routerSuppliers.get('/searchSuppliersAll', checkAuthentication, suppliers.searchSuppliers)

//---------------- Get Supplier by Id  ----------------------
routerSuppliers.get('/:id', checkAuthentication, suppliers.getSupplierById)

//---------------- Create a New Supplier  -------------------
routerSuppliers.post('/newSupplier', checkAuthentication, suppliers.createNewSupplier)

//---------------- Update a Supplier  -----------------------
routerSuppliers.post('/update/:id', checkAuthentication, suppliers.updateSupplier)

//---------------- Delete a Supplier  -----------------------
routerSuppliers.get('/delete/:id', checkAuthentication, suppliers.deleteSupplierById)

//---------------- Search a Supplier sort by designation -----------------------
routerSuppliers.get('/searchSuppliers/all', checkAuthentication, suppliers.searchSuppliers)

module.exports = routerSuppliers