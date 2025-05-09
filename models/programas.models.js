const { Schema, mongoose } = require('mongoose')
const now = require('../utils/formatDate.js')

const creatorModels = require('./creator.models.js')
const modificatorModels = require('./modificator.models.js')

// ------- Creator Schema -------------
// let creatorSchema = new Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Usuarios",
//     },
//     name: { 
//         type: String,
//     },
//     lastName: {
//         type: String,
//     },
//     username:{
//         type: String,
//     },
//     email: {
//         type: String,
//     }
// })

// ------- Modificator Schema -------------
// let modificatorSchema = new Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Usuarios",
//     },
//     name: { 
//         type: String,
//     },
//     lastName: {
//         type: String,
//     },
//     username:{
//         type: String,
//     },
//     email: {
//         type: String,
//     }
// })

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
})

// ------- OT Programacion Segunda Schema ---------
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
    revisionNotasProgramacion: {
        type: Number,
        default: 0,
    },
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
})

// ------- OT Mecanizado Primera Schema ---------
let otMecanizadoPrimeraSchema = new Schema({
    fCero: {
        type: String,
        default: 'sinDato',
    },
    estadoFCero: {
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
    estadoFUno: {
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
    estadoFDos: { 
        type: String,
        default: 'sinDato',
    },
    revisionFDos: { 
        type: Number,
        default: 0,
    },
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
})

// ------- OT Mecanizado Segunda Schema ---------
let otMecanizadoSegundaSchema = new Schema({
    fTres: { 
        type: String,
        default: 'sinDato',
    },
    estadoFTres: { 
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
    estadofCuatro: { 
        type: String,
        default: 'sinDato',
    },
    revisionFCuatro: { 
        type: Number,
        default: 0,
    },
    notasMecanizado: {
        type: String,
        default: '',
    },
    revisionNotasMecanizado: { 
        type: Number,
        default: 0,
    },
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
})

// ------- Programacion ---------
let ProgramacionSchema = new Schema({
    detailId: {
        type: mongoose.Schema.Types.ObjectId,
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
    otMecanizadoPrimera: [otMecanizadoPrimeraSchema],
    otMecanizadoSegunda: [otMecanizadoSegundaSchema],
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
    statusDetalle: {
        type: Boolean, default: true
    },
})

module.exports = { ProgramacionSchema }