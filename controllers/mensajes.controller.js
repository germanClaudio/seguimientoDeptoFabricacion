const MessagesService = require("../services/messages.service.js")
const UserService = require("../services/users.service.js")

// const { uploadToGCS } = require("../utils/uploadFilesToGSC.js")
// const { uploadMulterSingleAvatarUser } = require("../utils/uploadMulter.js")

// let userPictureNotFound = "../../../src/images/upload/AvatarUsersImages/incognito.jpg"
const cookie = require('../utils/cookie.js')
let formatDate = require('../utils/formatDate.js')

const csrf = require('csrf');
const csrfTokens = csrf();

const data = require('../utils/variablesInicializator.js')
// const { dataUserCreator, dataUserModificatorEmpty, dataUserModificatorNotEmpty } = require('../utils/generateUsers.js')

const {catchError400_3,
        catchError401_3,
        catchError403,
        catchError500
} = require('../utils/catchErrors.js')


class MessagesController {  
    constructor(){
        this.users = new UserService()
        this.messages = new MessagesService()
    }

    getAllMessages = async (req, res) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const userLogged = await this.users.getUserByUsername(username)
            if(!userLogged) {
                catchError401_3(req, res, next)
            }
        
            const mensajes = await this.messages.getAllMessages()
            if(!mensajes) {
                catchError400_3(req, res, next)
            } 
            
            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewMessage', {
                mensajes,
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

    getMessageById = async (req, res) => {
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const userLogged = await this.users.getUserByUsername(username)
            if(!userLogged) {
                catchError401_3(req, res, next)
            }
            
            const mensaje = await this.messages.getMessageById(id)
            if(!mensaje) {
                catchError400_3(req, res, next)
            } 

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewMessage', {
                username,
                userInfo,
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
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

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
            if(!userLogged) {
                catchError401_3(req, res, next)
            }
        
            const mensaje = await this.messages.createNewMessage(messageStructure)
            if(!mensaje) {
                catchError400_3(req, res, next)
            } 

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewMessage', {
                username,
                userInfo,
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
        const { id } = req.params
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)

        try {
            const userLogged = await this.users.getUserByUsername(username)
            if(!userLogged) {
                catchError401_3(req, res, next)
            }

            const messageDeleted = await this.messages.deleteMessageById(id)
            if(!messageDeleted) {
                catchError400_3(req, res, next)
            }

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewMessage', {
                messageDeleted,
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

    deleteAllMessages = async (req, res) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo
        const expires = cookie(req)
        
        try {
            const userLogged = await this.users.getUserByUsername(username)
            if(!userLogged) {
                catchError401_3(req, res, next)
            }
        
            let messagesDeleted = await this.messages.deleteAllMessages()
            if(!messagesDeleted) {
                catchError400_3(req, res, next)
            }

            const csrfToken = csrfTokens.create(req.csrfSecret);
            res.render('addNewMessage', {
                messageDeleted,
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
}

module.exports = { MessagesController }