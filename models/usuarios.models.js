const { Schema, model } = require('mongoose')
const now = require('../utils/formatDate.js')

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

module.exports = model('Usuarios', userSchema)