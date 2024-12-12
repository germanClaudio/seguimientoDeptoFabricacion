const { Schema, model } = require('mongoose')
const now = require('../utils/formatDate.js')

const herramientasSchema = new Schema({
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
    diam: {
        type: Number,
        default: 16,
        min: 1,
        max: 250,
        validate: {
            validator: Number.isInteger,
            message: `El diámetro debe ser un número entero.`
        }
    },
    imageCuttingTool: { 
        type: String,
        maxlength: 1000
    },
    status: {
        type: Boolean,
        required: true,
        default: true
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
        max: 1000,
        validate: {
            validator: Number.isInteger,
            message: `La cantidad debe ser un número entero.`
        }
    },
    onUse: {
        type: Boolean,
        default: false
    },
    usingBy: {
        type: Array,
        default: []
    },
    usingByTool: {
        type: Array,
        default: []
    },
    usingStart: {
        type: Date,
        default: null,
    },
    usingEnd: {
        type: Date,
        default: null,
    },
})

module.exports = model('Herramientas', herramientasSchema)