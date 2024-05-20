const { Schema, model, mongoose } = require('mongoose')
const now = require('../utils/formatDate.js')


let CreatorSchema = new Schema({
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
    }
})

let ClientSchema = new Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients",
    },
    clientName: {
        type: String,
    }
})

let ProjectSchema = new Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projects",
    },
    projectName: {
        type: String,
    },
    codeProject: {
        type: String,
    }
})

const PartsSchema = new Schema({
    creator: [CreatorSchema],
    client: [ClientSchema],
    project: [ProjectSchema],
    partName: {
        type: String,
        maxlength: 100
    },
    prioPart: {
        type: Number,
        value: 1,
        maxlength: 10,
        min: [1, 'Prio can not be less than 1']
    },
    imagePart: { 
        type: String,
        maxlength: 500,
        value: 'Picture not found'
    },
    numberPart:{
        type: String,
        maxlength: 12,
        unique: true,
        value: 'XXX'
    },
    aliasPart:{
        type: String,
        maxlength: 50,
    },
    statusPart:{
        type: String,
        default: 'Activa',
    },
    timestamp: {
        type: String,
        default: now,
    }    
},{
    versionKey: false
})

module.exports = model('Parts', PartsSchema)