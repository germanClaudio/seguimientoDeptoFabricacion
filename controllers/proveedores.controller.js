const UserService = require("../services/users.service.js"),
    SupplierService = require("../services/suppliers.service.js"),
    CartsService = require("../services/carts.service.js"),
    OrdersService = require("../services/orders.service.js"),

    csrf = require('csrf'),
    csrfTokens = csrf(),
    
    supplierPictureNotFound = "https://storage.googleapis.com/imagenesproyectosingenieria/upload/SuppliersImages/noImageFound.png",
    cookie = require('../utils/cookie.js'),
    
    data = require('../utils/variablesInicializator.js'),
    
    { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty } = require('../utils/generateUsers.js'),
    { uploadToGCS } = require("../utils/uploadFilesToGSC.js"),
    { uploadMulterSingleImageSupplier } = require("../utils/uploadMulter.js");

const {catchError400_3,
    catchError400_5,
    catchError400_6,
    catchError401_3,
    catchError500
} = require('../utils/catchErrors.js')

let formatDate = require('../utils/formatDate.js')

class SuppliersController {  
    constructor(){
        this.users = new UserService()
        this.suppliers = new SupplierService()
        this.carts = new CartsService()
        this.orders = new OrdersService()
    }

    getAllSuppliers = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null
            
            const proveedores = await this.suppliers.getAllSuppliers()
            !proveedores ? catchError400_5(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewSupplier', {
                username,
                userInfo,
                userCart,
                ordenes,
                expires,
                proveedores,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getSupplierById = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const proveedor = await this.suppliers.getSupplierById(id)           
            !proveedor ? catchError401_3(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('supplierDetails', {
                username,
                userInfo,
                userCart,
                ordenes,
                expires,
                proveedor,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getSupplierByDesignation = async (req, res, next) => {
        const { designation } = req.params
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const usuario = await this.users.getUserByUsername(username)
            !usuario ? catchError401_3(req, res, next) : null

            const proveedor = await this.suppliers.getSupplierBySuppliername(designation)
            !proveedor ? catchError401_3(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('supplierDetails', {
                proveedor,
                username,
                userInfo,
                userCart,
                ordenes,
                expires,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    createNewSupplier = async (req, res, next) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo;

        //------ Storage New Supplier Image in Google Store --------        
        uploadMulterSingleImageSupplier(req, res, async (err) => {
            try {
                //console.log('req.file: ', req.file)
                req.file ? await uploadToGCS(req, res, next) : null

                let userManager = await this.users.getUserByUsername(username);
                const userId = userManager._id;
                const userCreator = await this.users.getUserById(userId);
                !userCreator ? catchError401_3(req, res, next) : null

                const designationInput = req.body.designation.replace(/[!@#$%^&*]/g, ""),
                    codeInput = req.body.code;

                const newSupplierValid = {
                    designation: designationInput,
                    code: codeInput
                };

                const supplierExist = await this.suppliers.getExistingSupplier(newSupplierValid);
                if (supplierExist) {
                    catchError400_6(req, res, next)
                } else {
                        const newSupplier = {
                        designation: designationInput,
                        code: codeInput,
                        type: req.body.type,
                        characteristics: req.body.characteristics,
                        imageSupplier: req.body.imageTextImageSupplier || supplierPictureNotFound,
                        status: req.body.status === 'on' ? Boolean(true) : Boolean(false) || Boolean(true),
                        creator: dataUserCreator(userCreator),
                        timestamp: formatDate(),
                        modificator: dataUserModificatorEmpty(),
                        modifiedOn: '',
                        visible: true
                    };

                    const proveedor = await this.suppliers.addNewSupplier(newSupplier);
                    !proveedor ? catchError400_6(req, res, next) : null

                    const usuarioLog = await this.users.getUserByUsername(username);
                    !usuarioLog.visible ? catchError401_3(req, res, next) : null

                    const ordenes = await this.orders.getAllOrders()
                    !ordenes ? catchError400_5(req, res, next) : null

                    const userCart = await this.carts.getCartByUserId(userId)

                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    return res.render('addNewSupplier', {
                        username,
                        userInfo,
                        userCart,
                        ordenes,
                        expires,
                        data,
                        csrfToken,
                        proveedor
                    });
                }

            } catch (err) {
                catchError500(err, req, res, next)
            }
        })
    }
    
    updateSupplier = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        uploadMulterSingleImageSupplier(req, res, async (err) => {
            try {
                // console.log('req.body: ', req.body)
                // console.log('req.file: ', req.file)
                req.file ? await uploadToGCS(req, res, next) : null

                const supplierId = id,
                    supplierToModify = await this.suppliers.getSupplierById(supplierId)

                const supplierInput = req.body.designation.replace(/[!@#$%^&* ]/g, "")
                let proveedoresRestantes
                const designationValid = await this.suppliers.getSupplierByDesignation(supplierInput)
                const otherSuppliers = await this.suppliers.getAllSuppliers()
                
                // Función para eliminar un proveedor de la lista si coincide con el proveedor a comparar
                function eliminarProveedor(lista, proveedor) {
                    return lista.filter(h => {
                        return h._id.toString() !== proveedor._id.toString()
                    })
                }
                
                // Eliminar el proveedor de la lista
                if (designationValid) {
                    proveedoresRestantes = eliminarProveedor(otherSuppliers, designationValid)

                    const designations = proveedoresRestantes.map(proveedor => proveedor.designation)
                    if (designations.includes(supplierToModify.designation)) {
                        const err = new Error (`Ya existe un Proveedor con esta designación: ${supplierInput}!`)
                        err.statusCode = 400
                        return next(err);
                    }

                    const codeInput = req.body.code,
                        codesId = proveedoresRestantes.map(proveedor => proveedor.code);
                    
                    if (codesId.includes(supplierToModify.code)) {
                        const err = new Error (`Ya existe un Proveedor con este Código #${codeInput}!`)
                        err.statusCode = 400
                        return next(err);
                    }
                }    

                const userLogged = await this.users.getUserByUsername(username);
                !userLogged.visible ? catchError401_3(req, res, next) : null

                let updatedSupplier = {
                    designation: req.body.designation,
                    code: req.body.code,
                    type: req.body.typeHidden,
                    characteristics: req.body.characteristics,
                    imageSupplier: req.body.imageTextImageSupplier,
                    status: req.body.status === 'on' ? Boolean(true) : Boolean(false),
                    modificator: dataUserModificatorNotEmpty(userLogged),
                    modifiedOn: formatDate()
                }

                const proveedor = await this.suppliers.updateSupplier(supplierId, updatedSupplier, dataUserModificatorNotEmpty(userLogged))
                !proveedor ? catchError400_3(req, res, next) : null

                const ordenes = await this.orders.getAllOrders()
                !ordenes ? catchError400_5(req, res, next) : null

                const userCart = await this.carts.getCartByUserId(userLogged._id)
                        
                const csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('addNewSupplier', {
                    username,
                    userInfo,
                    userCart,
                    ordenes,
                    expires,
                    proveedor,
                    data,
                    csrfToken,
                })

            } catch (err) {
                catchError500(err, req, res, next)
            }
        })
    }

    searchSuppliers = async (req, res, next) => {
        try {
            const suppliers = await this.suppliers.getAllSuppliers()
            !suppliers ? catchError400_5(req, res, next) : null
            res.send(suppliers)

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    deleteSupplierById = async (req, res, next) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const supplierToDelete = await this.suppliers.getSupplierById(id)
            !supplierToDelete ? catchError401_3(req, res, next) : null

            const userId = userInfo.id
            const userLogged = await this.users.getUserById(userId)
            !userLogged ? catchError401_3(req, res, next) : null

            const proveedor = await this.suppliers.deleteSupplierById(id, dataUserModificatorNotEmpty(userLogged))
            !proveedor ? catchError401_3(req, res, next) : null

            const ordenes = await this.orders.getAllOrders()
            !ordenes ? catchError400_5(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userId)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewSupplier', {
                username,
                userInfo,
                userCart,
                ordenes,
                expires,
                proveedor,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }
}

module.exports = { SuppliersController }