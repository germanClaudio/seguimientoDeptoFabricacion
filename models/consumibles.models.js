const { Schema, model } = require('mongoose')
const now = require('../utils/formatDate.js')

const consumiblesSchema = new Schema({
    designation: {
        type: String,
        maxlength: 50,
        trim: true,
    },
    code: {
        type: String,
        maxlength: 50
    },
    type: {
        type: String,
        maxlength: 50
    },
    imageConsumible: { 
        type: String,
        maxlength: 1000
    },
    qrCode: { 
        type: String,
        maxlength: 1000
    },
    characteristics: { 
        type: String,
        maxlength: 350,
        default: '',
        trim: true,
    },
    creator: {
        type: Array,
        default: []
    },
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
        default: []
    },
    modifiedOn: {
        type: String,
        default: now,
    },
    visible: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        default: 0,
        min: 0,
        max: 8000,
        validate: {
            validator: Number.isInteger,
            message: `La canitdad debe ser un número entero.`
        }
    }
})

module.exports = model('Consumibles', consumiblesSchema)