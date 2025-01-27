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
    quantity: {
        type: Number,
    }
})

let ShippingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
    },
    name: { 
        type: String,
    },
    lastName: {
        type: String,
    },
    username:{
        type: String,
    },
    email: {
        type: String,
    },
    legajoId: {
        type: Number,
        required: true,
        default: 0,
        maxlength: 4,
        unique: true
    },
    avatar: { 
        type: String,
        maxlength: 1000
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    area: { 
        type: String,
        default: 'ingenieria'
    },
    permiso: { 
        type: String,
        default: 'disenoSimulacion'
    },
})

const orderSchema = new Schema({
    shipping: [ShippingSchema],
    items: [ItemSchema],
    subTotal: {
        type: Number
    },
    active: {
        type: Boolean,
        default: true
    },
    modifiedOn: {
        type: String,
        default: now,
    },
    invoice_nr: {
        type: String,
    }
}, {
    timestamp: true
}  
)

module.exports = model('Orders', orderSchema)