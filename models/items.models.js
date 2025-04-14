const { Schema, model, mongoose } = require('mongoose')

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

module.exports = { ItemSchema }