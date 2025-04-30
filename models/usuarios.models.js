const { Schema, model } = require('mongoose')
// const now = require('../utils/formatDate.js')

const creatorModels = require('./creator.models.js')
const modificatorModels = require('./modificator.models.js')

const userSchema = new Schema({
    name: {
        type: String,
        maxlength: 100
    },
    lastName: {
        type: String,
        maxlength: 100
    },
    email: { 
        type: String,
        required: true,
        maxlength: 100,
        unique: true,
    },
    username: { 
        type: String,
        required: true,
        maxlength: 100,
        unique: true
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
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: false,
        default: false
    },
    superAdmin: {
        type: Boolean,
        required: false,
        default: false
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
    uNegocio: {
        type: String,
        default: 'matrices'
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
        default: [modificatorModels]
    },
    modifiedOn: {
        type: Date,
    },
    visible: {
        type: Boolean,
        default: true
    },
    visits: {
        type: Number,
        default: 0
    }
})

module.exports = model('Usuarios', userSchema)