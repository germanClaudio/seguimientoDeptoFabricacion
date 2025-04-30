const { Schema, model } = require('mongoose')

const creatorModels = require('./creator.models.js')
const modificatorModels = require('./modificator.models.js')

const lineasSchema = new Schema({
    funcion: {
        type: String,
        maxlength: 100
    },
    especifica: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    creator: {
        type: Array,
        default: [creatorModels], 
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    modificator: {
        type: Array,
        default: [modificatorModels]
    },
    modifiedOn: {
        type: Date,
        default: null
    },
    visible: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Lineas', lineasSchema)