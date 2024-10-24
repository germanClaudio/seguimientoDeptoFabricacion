const ContainerMongoDB = require('../../contenedores/containerMongoDB.js')
const mongoose = require('mongoose')
const Mensajes = require('../../models/mensajes.models.js')
const formatDate = require('../../utils/formatDate.js')

class MensajesDaoMongoDB extends ContainerMongoDB {
    constructor(cnxStr) {
        super(cnxStr) 
    }

    async init() {
        mongoose.connect(this.cnxStr, { //createConnection or connect
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
   }
    
    async getAllMessages(){
        try {
            const messages = await Mensajes.find()
            if(messages.length > 0){
                return messages

            } else {
                // logger.info('No messages found')
                return false
            }

        } catch (error) {
            return false
        }
    }

    async getMessageById(id) {
        if(id) {
            try {
                const message = await Mensajes.findById({_id: id })
                return message

            } catch (error) {
                return false
            }

        } else {
            try {
                const messages = await Mensajes.find()
                return messages

            } catch (error) {
               return false
            }
        }
    }

    async createNewMessage(mensaje){  
        if(mensaje) {
            try {
                const newMessage = new Mensajes(mensaje)
                await newMessage.save()
                return newMessage

            } catch (error) {
                return false
            }

        } else {
            return false
        }
    }

    async deleteMessageById(id) {
        const itemMongoDB = await Mensajes.findById({_id: `${id}`})
        if(itemMongoDB) {
            try {
                const newValues = {
                    author: itemMongoDB.author,
                    text: itemMongoDB.text,
                    date: formatDate(),
                    status: false
                }
                const mensaje = await Mensajes.findOneAndUpdate(
                    { _id: id }, newValues , { new: true })
                    return mensaje

            } catch (error) {
                return false
            }

        } else {
            return false
        }
    }

    async deleteAllMessages() {
        const itemMongoDB = await Mensajes.find()
        if(itemMongoDB) {
            try {
                const mensaje = await Mensajes.updateMany({}, { $set: { status: false } }, { new: true })
                return mensaje
                
            } catch (error) {
                return false
            }
            
        } else {
            return false
        }
    }

    async disconnet() {
        await this.disconnection
    }

}

module.exports = MensajesDaoMongoDB 