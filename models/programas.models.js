const { Schema, model, mongoose } = require('mongoose')
const now = require('../utils/formatDate.js')

// ------- Creator Schema -------------
let creatorSchema = new Schema({
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
    }
})

// ------- Modificator Schema -------------
let modificatorSchema = new Schema({
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
    }
})
 
// ------- OT Distribucion Schema ---------
let otDistribucionSchema = new Schema({
    mecanizado2dCompleto: { 
        type: String,
        default: 'sinDato',
    },
    revisionMecanizado2dCompleto: {
        type: Number,
        default: 0,
    },
    mecanizado3dPrefinal: { 
        type: String,
        default: 'sinDato',
    },
    revisionMecanizado3dPrefinal: {
        type: Number,
        default: 0,
    },
    mecanizado3dFinal: {
        type: String,
        default: 'sinDato',
    },
    revisionMecanizado3dFinal: {
        type: Number,
        default: 0,
    },
    bancoArmado: {
        type: String,
        default: 'sinDato',
    },
    revisionBancoArmado: { 
        type: Number,
        default: 0,
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Programacion Schema ---------
let otProgramacionSchema = new Schema({
    rt: { 
        type: String,
        default: 'sinDato',
    },
    revisionRt: { 
        type: Number,
        default: 0,
    },
    preparacionGeo: { 
        type: Number,
        default: 0,
    },
    revisionPreparacionGeo: { 
        type: Number,
        default: 0,
    },
    programa2d: {
        type: String,
        default: 'sinDato',
    },
    revisionPrograma2d: { 
        type: Number,
        default: 0,
    },
    programa3dF2: {
        type: String,
        default: 'sinDato',
    },
    revisionPrograma3dF2: { 
        type: Number,
        default: 0,
    },
    programa3dF4: {
        type: String,
        default: 'sinDato',
    },
    revisionPrograma3dF4: { 
        type: Number,
        default: 0,
    },
    observacionesProgramacion: {
        type: String,
        default: '',
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Distribucion Schema ---------
let otMecanizadoSchema = new Schema({
    fUno: { 
        type: String,
        default: 'sinDato',
    },
    revisionFUno: { 
        type: Number,
        default: 0,
    },
    fDos: { 
        type: String,
        default: 'sinDato',
    },
    revisionFDos: { 
        type: Number,
        default: 0,
    },
    fTres: { 
        type: String,
        default: 'sinDato',
    },
    revisionFTres: { 
        type: Number,
        default: 0,
    },
    fCuatro: { 
        type: String,
        default: 'sinDato',
    },
    revisionFCuatro: { 
        type: Number,
        default: 0,
    },
    fCinco: { 
        type: String,
        default: 'sinDato',
    },
    revisionFCinco: { 
        type: Number,
        default: 0,
    },
    observacionesMecanizado: {
        type: String,
        default: '',
    },
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Detalles ---------
let ProgramacionSchema = new Schema({
    numeroDetalle: { 
        type: String,
        default: '',
    },
    descripcionDetalle: {
        type: String,
        default: "",
    },
    otDistribucion: [otDistribucionSchema],
    otProgramacion: [otProgramacionSchema],
    otMecanizado: [otMecanizadoSchema],
    creator: [creatorSchema],
    timestamp: {
        type: String,
        default: now,
    },
    modificator: [modificatorSchema],
    modifiedOn: {
        type: String,
        default: ""
    },
})

// let ProgramacionSchema = new Schema({
//     otDetalles: [otDetallesSchema]
// })

module.exports = { ProgramacionSchema } //model('Programacion', ProgramacionSchema)