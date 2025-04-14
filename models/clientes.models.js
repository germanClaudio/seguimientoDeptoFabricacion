const { Schema, model } = require('mongoose')
//const now = require('../utils/formatDate.js')

const creatorModels = require('./creator.models.js')
const modificatorModels = require('./modificator.models.js')

const ClientsSchema = new Schema({
    name: {
        type: String,
        maxlength: 100,
        unique: true
    },
    code: {
        type: String,
        maxlength: 8
    },
    logo: { 
        type: String,
        maxlength: 1000
    },
    status:{
        type: Boolean,
        default: true
    },
    project: {
        type: Number,
        default: 0,
        maxlength: 100,
        min: [0, 'Proyectos can not be less than 0.']
    },
    projectLineas: {
        type: Number,
        default: 0,
        maxlength: 100,
        min: [0, 'Proyectos can not be less than 0.']
    },
    creator: { 
        type: Array,
        default: [creatorModels],
    },
    timestamp: {
        type: Date,
    },
    modificator: {
        type: Array,
        default: [modificatorModels],
    },
    modifiedOn: {
        type: Date,
    },
    visible: {
        type: Boolean,
        default: true
    },
},{
    versionKey: false
})

module.exports = model('Clientes', ClientsSchema)