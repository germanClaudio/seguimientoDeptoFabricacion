const UserService = require("../services/users.service.js")
const SupplierService = require("../services/suppliers.service.js")

const { uploadToGCS } = require("../utils/uploadFilesToGSC.js")
const { uploadMulterSingleImageSupplier } = require("../utils/uploadMulter.js")

let formatDate = require('../utils/formatDate.js')

const csrf = require('csrf');
const csrfTokens = csrf();

let supplierPictureNotFound = "../../../src/images/upload/SuppliersImages/noImageFound.png"
const cookie = require('../utils/cookie.js')

const data = require('../utils/variablesInicializator.js')

const { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty } = require('../utils/generateUsers.js')

const {catchError400_3,
        catchError400_5,
        catchError400_6,
        catchError401_3,
        catchError500
} = require('../utils/catchErrors.js')

class SuppliersController {  
    constructor(){
        this.users = new UserService()
        this.suppliers = new SupplierService()
    }

    getAllSuppliers = async (req, res, next) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const proveedores = await this.suppliers.getAllSuppliers()
            !proveedores ? catchError400_5(req, res, next) : null

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewSupplier', {
                username,
                userInfo,
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
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const proveedor = await this.suppliers.getSupplierById(id)           
            !proveedor ? catchError401_3(req, res, next) : null

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('supplierDetails', {
                username,
                userInfo,
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
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const proveedor = await this.suppliers.getSupplierBySuppliername(designation)
            !proveedor ? catchError401_3(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('supplierDetails', {
                proveedor,
                username,
                userInfo,
                expires,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    createNewSupplier = async (req, res, next) => {
        let username = res.locals.username;
        let userInfo = res.locals.userInfo;
        const expires = cookie(req)

        //------ Storage New Supplier Image in Google Store --------        
        uploadMulterSingleImageSupplier(req, res, async (err) => {
            try {
                console.log('req.file: ', req.file)
                if (req.file) {
                    await uploadToGCS(req, res, next)
                }

                let userManager = await this.users.getUserByUsername(username);
                const userId = userManager._id;
                const userCreator = await this.users.getUserById(userId);
                !userCreator ? catchError401_3(req, res, next) : null

                const designationInput = req.body.designation.replace(/[!@#$%^&*]/g, "");
                const codeInput = req.body.code;

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

                    const csrfToken = csrfTokens.create(req.csrfSecret);
                    return res.render('addNewSupplier', {
                        username,
                        userInfo,
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
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        uploadMulterSingleImageSupplier(req, res, async (err) => {
            try {
                // console.log('req.body: ', req.body)
                // console.log('req.file: ', req.file)
                if (req.file) {
                    await uploadToGCS(req, res, next)
                }

                const supplierId = id
                const supplierToModify = await this.suppliers.getSupplierById(supplierId)

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

                    const codeInput = req.body.code
                    const codesId = proveedoresRestantes.map(proveedor => proveedor.code);
                    
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
                // console.log('proveedor: ', proveedor)
                !proveedor ? catchError400_3(req, res, next) : null
                        
                const csrfToken = csrfTokens.create(req.csrfSecret);
                return res.render('addNewSupplier', {
                    username,
                    userInfo,
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
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const supplierToDelete = await this.suppliers.getSupplierById(id)
            !supplierToDelete ? catchError401_3(req, res, next) : null

            const userId = userInfo.id
            const userLogged = await this.users.getUserById(userId)
            !userLogged ? catchError401_3(req, res, next) : null

            const proveedor = await this.suppliers.deleteSupplierById(id, dataUserModificatorNotEmpty(userLogged))
            !proveedor ? catchError401_3(req, res, next) : null
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewSupplier', {
                username,
                userInfo,
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