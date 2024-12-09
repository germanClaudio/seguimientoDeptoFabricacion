const { Schema, model } = require('mongoose')
const now = require('../utils/formatDate.js')

const maquinasSchema = new Schema({
    designation: {
        type: String,
        maxlength: 50
    },
    code: {
        type: String,
        maxlength: 50
    },
    type: {
        type: String,
        maxlength: 50
    },
    model: {
        type: String,
        maxlength: 50
    },
    imageTool: { 
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
        maxlength: 250,
        default: ''
    },
    creator: {
        type: Array,
    },
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
    },
    modifiedOn: {
        type: String,
        default: now,
    },
    visible: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Maquinas', maquinasSchema)