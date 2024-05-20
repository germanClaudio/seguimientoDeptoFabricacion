const MessagesService = require("../services/messages.service.js")
const UserService = require("../services/users.service.js")

function formatDate(date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    
    return day + "-" + month + "-" + year + "_" + hours + "." + min + "." + sec
}

class MessagesController {  
    constructor(){
        this.users = new UserService()
        this.messages = new MessagesService()
    }

    getAllMessages = async (req, res) => {
        const mensajes = await this.messages.getAllMessages()
        
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const usuarios = await this.users.getUserByUsername(username)
        const userId = usuarios._id // User Id

        try {
            if(mensajes.error) return res.status(400).json({msg: 'No hay mensajes cargados'}) 
            
            res.render('addNewMessage', {
                mensajes,
                username,
                userInfo,
                expires
            })
        } catch (error) {
            const errorInfo = {
                errorNumber: 21,
                status: false,
                msg: 'controllerError - getAllMessages'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
            // res.status(500).json({
            //     status: false,
            //     msg: 'controllerError - getAllMessages',
            //     error: error
            // })
        }
    }

    getMessageById = async (req, res) => {
        const { id } = req.params
        const mensaje = await this.messages.getMessageById(id)
        
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const usuarios = await this.users.getUserByUsername(username)
        const userId = usuarios._id // User Id

        try {
            if(!mensaje) return res.status(404).json({msg: 'Mensaje no encontrado'})
            
            res.render('addNewMessage', {
                mensaje,
                username,
                userInfo,
                expires
            })
        } catch (error) {
            const errorInfo = {
                errorNumber: 61,
                status: false,
                msg: 'controllerError - getMessageById'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
            // res.status(500).json({
            //     status: false,
            //     msg: 'controllerError - getMessageById',
            //     error: error
            // })
        }
    }

    createNewMessage = async (req, res) => {
        
        const messageStructure = {
            author: {
                email: req.body.email,
                name: req.body.name,
                lastName: req.body.lastName,
                alias: req.body.alias,
                avatar: req.body.avatar,
            },
            text: req.body.text,
            date: formatDate(new Date()),
            status: true,
        }  
        console.log('messageStructure', messageStructure)
        const mensaje = await this.messages.createNewMessage(messageStructure)
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const usuarios = await this.users.getUserByUsername(username)
        const userId = usuarios._id // User Id

        try {
            if(!mensaje) return res.status(404).json({Msg: 'Mensaje no guardado'})
            res.render('addNewMessage', {
                mensaje,
                username,
                userInfo,
                expires
            })
        } catch (error) {
            const errorInfo = {
                errorNumber: 102,
                status: false,
                msg: 'controllerError - createNewMessage'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
            // res.status(500).json({
            //     status: false,
            //     msg: 'controllerError - createNewMessage',
            //     error: error
            // })
        }
    }

    deleteMessageById = async (req, res) => {
        const { id } = req.params
        
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const usuarios = await this.users.getUserByUsername(username)
        const userId = usuarios._id // User Id

        try {
            const messageDeleted = await this.messages.deleteMessageById(req.params.id)
            res.render('addNewMessage', {
                messageDeleted,
                username,
                userInfo,
                expires
            })
        } catch (error) {
            const errorInfo = {
                errorNumber: 154,
                status: false,
                msg: 'controllerError - deleteMessageById'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })
        }
    }

    deleteAllMessages = async (req, res) => {
        let username = res.locals.username
        let userInfo = res.locals.userInfo

        const cookie = req.session.cookie
        const time = cookie.expires
        const expires = new Date(time)

        const usuarios = await this.users.getUserByUsername(username)
        const userId = usuarios._id // User Id
        
        try {
            const messageDeleted = await this.messages.deleteAllMessages()
            res.render('addNewMessage', {
                messageDeleted,
                username,
                userInfo,
                expires
            })

        } catch (error) {
            const errorInfo = {
                errorNumber: 188,
                status: false,
                msg: 'controllerError - deleteAllMessages'
            }
            res.render('errorPages', {
                error,
                errorInfo
            })   
        }
    }
}

module.exports = { MessagesController }