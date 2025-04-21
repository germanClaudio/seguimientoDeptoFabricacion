const { Schema, model, mongoose } = require('mongoose')
let now = require('../utils/formatDate.js')

const creatorModels = require('./creator.models.js')
const modificatorModels = require('./modificator.models.js')

const otModels = require('./ot.models.js')

// ------- Dueño de OCI/OT Schema -------------
let duenoOciSchema = new Schema({
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
    },
    avatar: {
        type: String,
        maxlength: 2000
    }
})

// ------- OCI Project Schema -------------
let ociProjectSchema = new Schema({
    ociId: {
        type: mongoose.Schema.Types.ObjectId
    },
    ociNumber: {
        type: Number, maxlength: 4
    },
    ociDescription: {
        type: String, maxlength: 100
    },
    ociAlias: {
        type: String, maxlength: 50,
        default: "Sin Apodo"
    },
    ociStatus: {
        type: Boolean, default: true
    },
    ociPrio: {
        type: Number, maxlength: 3, defautl: 1
    },
    ociImage: { 
        type: String,
        maxlength: 2000,
        default: '../../../src/images/upload/LogoClientImages/noImageFound.png'
    },
    ociOwner: [duenoOciSchema],
    creator: [creatorModels],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorModels],
    modifiedOn: {
        type: String,
        default: ""
    },
    visible:{
        type: Boolean,
        default: true,
    },
    otProject: [otModels]
    
})

module.exports = { ociProjectSchema }