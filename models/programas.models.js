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

// ------- OT Programacion Primera Schema ---------
let otProgramacionPrimeraSchema = new Schema({
    rt: { 
        type: String,
        default: 'sinDato',
    },
    estadoRt: { 
        type: String,
        default: 'enProceso',
    },
    revisionRt: { 
        type: Number,
        default: 0,
    },
    preparacionGeo: { 
        type: String,
        default: 'sinDato',
    },
    estadoPreparacionGeo: { 
        type: String,
        default: 'enProceso',
    },
    revisionPreparacionGeo: { 
        type: Number,
        default: 0,
    },
    programa2d: {
        type: String,
        default: 'sinDato',
    },
    estadoPrograma2d: { 
        type: String,
        default: 'enProceso',
    },
    revisionPrograma2d: { 
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

// ------- OT Programacion Primera Schema ---------
let otProgramacionSegundaSchema = new Schema({
    programa3d2F: {
        type: String,
        default: 'sinDato',
    },
    estadoPrograma3d2F: { 
        type: String,
        default: 'enProceso',
    },
    revisionPrograma3d2F: { 
        type: Number,
        default: 0,
    },
    programa3d4F: {
        type: String,
        default: 'sinDato',
    },
    estadoPrograma3d4F: { 
        type: String,
        default: 'enProceso',
    },
    revisionPrograma3d4F: { 
        type: Number,
        default: 0,
    },
    notasProgramacion: {
        type: String,
        default: '',
    },
    revisionObservacionesProgramacion: {
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

// ------- OT Distribucion Schema ---------
let otMecanizadoSchema = new Schema({
    fCero: { 
        type: String,
        default: 'sinDato',
    },
    revisionFCero: { 
        type: Number,
        default: 0,
    },
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
    detalleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Detalles'
    },
    numeroDetalle: { 
        type: String,
        default: '',
    },
    descripcionDetalle: {
        type: String,
        default: "",
    },
    otDistribucion: [otDistribucionSchema],
    otProgramacionPrimera: [otProgramacionPrimeraSchema],
    otProgramacionSegunda: [otProgramacionSegundaSchema],
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
    visible:{
        type: Boolean,
        default: true,
    },
    statusDetalle: {
        type: Boolean, default: true
    },
})

// let ProgramacionSchema = new Schema({
//     otDetalles: [otDetallesSchema]
// })

module.exports = { ProgramacionSchema } //model('Programacion', ProgramacionSchema)