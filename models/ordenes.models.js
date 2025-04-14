const { Schema, model, mongoose } = require('mongoose')

const modificatorModels = require('./modificator.models.js')

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
    },
    tipoTalle: {
        type: String,
        default: 'unico'
    },
    letterOrNumber: {
        type: String,
        default: 'none',
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
    legajoIdUser: {
        type: Number,
        required: true,
        default: 0,
        maxlength: 4
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
        letterOrNumber: {
            type: Array
        },
        // active = true => no Entregada // false => Entregada
        active: {
            type: Boolean,
            default: true
        },
        // visible = true => activa // = false => eliminada
        visible : {
            type: Boolean,
            default: true
        },
        // prepared = true => preparada // = flase => no preparada
        prepared: {
            type: Boolean,
            default: false
        },
        quantity: {
            type: Number,
        },
        timestamp: {
            type: Date,
        },
        modificator: [modificatorModels],
        // modificator: {
        //     type: Array,
        //     default: []
        // },
        modifiedOn: {
            type: Date, //String,
        },
        invoice_nr: {
            type: String,
        },
        invoiceStorageUrl: {
            type: String,
        },
    },
    {
        timestamp: true
    }
)

module.exports = model('Orders', orderSchema)