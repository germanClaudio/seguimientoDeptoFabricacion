const MessagesService = require("../services/messages.service.js"),
    UserService = require("../services/users.service.js"),
    CartsService = require("../services/carts.service.js"),

    csrf = require('csrf'),
    csrfTokens = csrf(),

    cookie = require('../utils/cookie.js')

// const { uploadToGCS } = require("../utils/uploadFilesToGSC.js")
// const { uploadMulterSingleAvatarUser } = require("../utils/uploadMulter.js")
// const { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty } = require('../utils/generateUsers.js')

let data = require('../utils/variablesInicializator.js'),
    formatDate = require('../utils/formatDate.js')

const {catchError400_3,
        catchError401_3,
        catchError403,
        catchError500
} = require('../utils/catchErrors.js')


class MessagesController {  
    constructor(){
        this.users = new UserService()
        this.messages = new MessagesService()
        this.carts = new CartsService()
    }

    getAllMessages = async (req, res) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const userLogged = await this.users.getUserByUsername(username)
            !userLogged ? catchError401_3(req, res, next) : null
        
            const mensajes = await this.messages.getAllMessages()
            !mensajes ? catchError400_3(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userLogged._id)
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewMessage', {
                mensajes,
                username,
                userInfo,
                userCart,
                expires,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    getMessageById = async (req, res) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const userLogged = await this.users.getUserByUsername(username)
            !userLogged ? catchError401_3(req, res, next) : null
            
            const mensaje = await this.messages.getMessageById(id)
            !mensaje ? catchError400_3(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(usuario._id)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewMessage', {
                username,
                userInfo,
                userCart,
                expires,
                mensaje,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    createNewMessage = async (req, res) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        const messageStructure = {
            author: {
                email: req.body.email,
                name: req.body.name,
                lastName: req.body.lastName,
                alias: req.body.alias,
                avatar: req.body.avatar,
            },
            text: req.body.text,
            date: formatDate(),
            status: true,
        }  
        
        try {
            const userLogged = await this.users.getUserByUsername(username)
            !userLogged ? catchError401_3(req, res, next) : null
        
            const mensaje = await this.messages.createNewMessage(messageStructure)
            !mensaje ? catchError400_3(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userLogged._id)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewMessage', {
                username,
                userInfo,
                userCart,
                expires,
                mensaje,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    deleteMessageById = async (req, res) => {
        const { id } = req.params,
            expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo

        try {
            const userLogged = await this.users.getUserByUsername(username)
            !userLogged ? catchError401_3(req, res, next) : null

            const messageDeleted = await this.messages.deleteMessageById(id)
            !messageDeleted ? catchError400_3(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userLogged._id)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewMessage', {
                messageDeleted,
                username,
                userInfo,
                userCart,
                expires,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }

    deleteAllMessages = async (req, res) => {
        const expires = cookie(req)
        let username = res.locals.username,
            userInfo = res.locals.userInfo
        
        try {
            const userLogged = await this.users.getUserByUsername(username)
            !userLogged ? catchError401_3(req, res, next) : null
        
            let messagesDeleted = await this.messages.deleteAllMessages()
            !messagesDeleted ? catchError400_3(req, res, next) : null

            const userCart = await this.carts.getCartByUserId(userLogged._id)

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewMessage', {
                messageDeleted,
                username,
                userInfo,
                userCart,
                expires,
                data,
                csrfToken
            })

        } catch (err) {
            catchError500(err, req, res, next)
        }
    }
}

module.exports = { MessagesController }