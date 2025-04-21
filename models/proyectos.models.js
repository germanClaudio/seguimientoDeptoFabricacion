const { Schema, model, mongoose } = require('mongoose')
// let now = require('../utils/formatDate.js')

const creatorModels = require('./creator.models.js')
const modificatorModels = require('./modificator.models.js')

const ociModels = require('./oci.models.js')

// ------- Client Schema -------------
let ClientSchema = new Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clientes",
    },
    name: { 
        type: String
    },
    logo: { 
        type: String
    },
})

// ------- Project Schema -------------
let projectSchema = new Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    projectName: {
        type: String,
        maxlength: 100
    },
    projectDescription: {
        type: String,
        maxlength: 250
    },
    prioProject: {
        type: Number,
        value: 0,
        maxlength: 10,
        min: [0, 'Prio can not be less than 0']
    },
    imageProject: { 
        type: String,
        maxlength: 1000,
        value: '../../../src/images/upload/LogoClientImages/noImageFound.png'
    },
    codeProject: {
        type: String,
        maxlength: 15,
    },
    statusProject:{
        type: Boolean,
        default: true,
    },
    levelProject: {
        type: String,
        default: 'paraCotizar',
    },
    uNegocioProject: {
        type: String,
        default: 'matrices',
    },
    creator: {
        type: Array,
        default: [creatorModels]
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
    visible:{
        type: Boolean,
        default: true,
    },
    oci: [ociModels],
})

// ------- Complete Project per Client Schema -------------
const ProyectoSchema = new Schema({
    creator: [creatorModels],
    client: [ClientSchema],
    project: [projectSchema],
    uNegocio: {
        type: String,
        default: 'matrices',
    },
    timestamp: {
        type: Date,
    },
    modificator: [modificatorModels],
    modifiedOn: {
        type: Date,
    },
    visible:{
        type: Boolean,
        default: true,
    },
},{
    versionKey: false
})

module.exports = model('Projects', ProyectoSchema)