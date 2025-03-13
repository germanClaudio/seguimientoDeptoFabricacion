const { Schema, model, mongoose } = require('mongoose')
const now = require('../utils/formatDate.js')

let ItemSchema = new Schema({
    consumibleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Consumibles",
    },
    designation: {
        type: String,
        maxlength: 50,
        trim: true,
    },
    code: {
        type: String,
        maxlength: 100
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
        maxlength: 50000
    },
    characteristics: { 
        type: String,
        maxlength: 350,
        default: '',
        trim: true,
    },
    tipoTalle: {
        type: String,
        default: 'unico'
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity can not be less than 0.']
    },
    creator: {
        type: Array,
        default: []
    },
    timestamp: {
        type: String,
        default: now,
    },
    favorito: {
        type: Number,
        default: 1,
        min: 0,
        max: 5
    },
    limMaxUser: {
        type: Number,
        default: 1,
        min: 0,
        max: 30
    }
})

const cartSchema = new Schema({
    items: [ItemSchema],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios"
    },
    active: {
        type: Boolean,
        default: true
    },
    modifiedOn: {
        type: String,
        default: now,
    },
    creator: {
        type: Array,
        default: []
    },
})

module.exports = model('Carts', cartSchema)