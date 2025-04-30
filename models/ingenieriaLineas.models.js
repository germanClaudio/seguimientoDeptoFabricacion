const { Schema, model, mongoose } = require('mongoose')
//let now = require('../utils/formatDate.js')

const creatorModels = require('./creator.models.js')
const modificatorModels = require('./modificator.models.js')

// ------- OT Information Simulacion Schema ---------
let otInformationSimulacioSchema = new Schema({
    factibilidadObj: { 
        type: Date,
        default: null,
    },
    factibilidad: { 
        type: Date,
        default: null,
    },
    revisionFactibilidad: { 
        type: Number,
        default: 0,
    },
    secuenciaObj: {
        type: Date,
        default: null,
    },
    secuencia: {
        type: Date,
        default: null,
    },
    revisionSecuencia: { 
        type: Number,
        default: 0,
    },
    simulacionCienObj: {
        type: Date,
        default: null,
    },
    simulacionCien: {
        type: Date,
        default: null,
    },
    revisionSimulacionCien: { 
        type: Number,
        default: 0,
    },
    olpObj: {
        type: Date,
        default: null,
    },
    olp: {
        type: Date,
        default: null,
    },
    revisionOlp: { 
        type: Number,
        default: 0,
    },
    creator: [creatorModels],
    timestamp: {
        type: Date,
        default: Date.now
    },
    modificator: [modificatorModels],
    modifiedOn: {
        type: Date,
        default: null,
    },
})

// ------- OT Information Ing Mecanica Schema ---------
let otInformationIngenieriaMecanicaSchema = new Schema({
    procesoObj: { 
        type: Date,
        default: null,
    },
    proceso: { 
        type: Date,
        default: null,
    },
    revisionProceso: { 
        type: Number,
        default: 0,
    },
    layout: {
        type: Date,
        default: null,
    },
    revisionLayout: { 
        type: Number,
        default: 0,
    },
    final3dObj: {
        type: Date,
        default: null,
    },
    final3d: {
        type: Date,
        default: null,
    },
    revisionFinal3d: { 
        type: Number,
        default: 0,
    },
    final2dObj: {
        type: Date,
        default: null,
    },
    final2d: {
        type: Date,
        default: null,
    },
    revisionFinal2d: { 
        type: Number,
        default: 0,
    },
    bajadaComprasObj: {
        type: Date,
        default: null,
    },
    bajadaCompras: {
        type: Date,
        default: null,
    },
    revisionBajadaCompras: { 
        type: Number,
        default: 0,
    }, 
    creator: [creatorModels],
    timestamp: {
        type: Date,
        default: Date.now,
    },
    modificator: [modificatorModels],
    modifiedOn: {
        type: Date,
        default: null,
    },
})

// ------- OT Information Ing Automatismo Schema ---------
let otInformationIngenieriaAutomatismoSchema = new Schema({
    ldmaObj: {
        type: Date,
        default: null,
    },
    ldma: {
        type: Date,
        default: null,
    },
    revisionLdma: { 
        type: Number,
        default: 0,
    },
    EplanObj: {
        type: Date,
        default: null,
    },
    Eplan: {
        type: Date,
        default: null,
    },
    revisionEplan: { 
        type: Number,
        default: 0,
    },
    ldmrObj: {
        type: Date,
        default: null,
    },
    ldmr: {
        type: Date,
        default: null,
    },
    revisionLdmr: { 
        type: Number,
        default: 0,
    },
    offlineObj: {
        type: Date,
        default: null,
    },
    offline: {
        type: Date,
        default: null,
    },
    revisionOffline: {
        type: Number,
        default: 0,
    },
    creator: [creatorModels],
    timestamp: {
        type: Date,
        default: Date.now,
    },
    modificator: [modificatorModels],
    modifiedOn: {
        type: Date,
        default: null,
    },
})

// ------- OT Information Compras Mecanicas Schema ---------
let otInformationComprasMecSchema = new Schema({
    compraEfectivaObj: { 
        type: Date,
        default: null,
    },
    compraEfectiva: { 
        type: Date,
        default: null,
    },
    revisionCompraEfectiva: {
        type: Number,
        default: 0,
    },
    cantSemanasObj: {
        type: Number,
        default: 0,
    },
    cantSemanas: {
        type: Number,
        default: 0,
    },
    revisionCantSemanas: {
        type: Number,
        default: 0,
    },
    fechaArriboObj: {
        type: Date,
        default: null,
    },
    fechaArribo: {
        type: Date,
        default: null,
    },
    revisionFechaArribo: {
        type: Number,
        default: 0,
    },
    creator: [creatorModels],
    timestamp: {
        type: Date,
        default: Date.now,
    },
    modificator: [modificatorModels],
    modifiedOn: {
        type: Date,
        default: null,
    },
})

// ------- OT Information Fabricacion 1° Parte Schema ---------
let otInformationFabricacionPrimeraSchema = new Schema({
    fabObj: { 
        type: Date,
        default: null,
    },
    avanceFab: {
        type: Number,
        default: 0,
    },
    revisionFab: {
        type: Number,
        default: 0,
    },
    mtgObj: { 
        type: Date,
        default: null,
    },
    avanceMtg: {
        type: Number,
        default: 0,
    },
    revisionMtg: {
        type: Number,
        default: 0,
    },
    vestidoObj: { 
        type: Date,
        default: null,
    },
    avanceVestido: {
        type: Number,
        default: 0,
    },
    revisionVestido: {
        type: Number,
        default: 0,
    },
    certificacionObj: { 
        type: Date,
        default: null,
    },
    avanceCertificacion: {
        type: Number,
        default: 0,
    },
    revisionCertificacion: {
        type: Number,
        default: 0,
    },
    avanceHyg: {
        type: Number,
        default: 0,
    },
    revisionHyg: {
        type: Number,
        default: 0,
    },
    avanceRyr: {
        type: Number,
        default: 0,
    },
    revisionRyr: {
        type: Number,
        default: 0,
    },
    avanceConexionCelda: {
        type: Number,
        default: 0,
    },
    revisionConexionCelda: {
        type: Number,
        default: 0,
    },
    creator: [creatorModels],
    timestamp: {
        type: Date,
        default: Date.now,
    },
    modificator: [modificatorModels],
    modifiedOn: {
        type: Date,
        default: null,
    },
})

// ------- OT Information Fabricacion 2° Parte Schema ---------
let otInformationFabricacionSegundaSchema = new Schema({
    puestaTensionObj: { 
        type: Date,
        default: null,
    },
    puestaTension: { 
        type: Date,
        default: null,
    },
    avancePuestaTension: {
        type: Number,
        default: 0,
    },
    revisionPuestaTension: {
        type: Number,
        default: 0,
    },
    avanceTrayectoria: {
        type: Number,
        default: 0,
    },
    revisionTrayectoria: {
        type: Number,
        default: 0,
    },
    avanceMovManuales: {
        type: Number,
        default: 0,
    },
    revisionMovManuales: {
        type: Number,
        default: 0,
    },
    ptaAutomaticoObj: { 
        type: Date,
        default: null,
    },
    ptaAutomatico: { 
        type: Date,
        default: null,
    },
    avancePtaAutomatico: {
        type: Number,
        default: 0,
    },
    revisionPtaAutomatico: {
        type: Number,
        default: 0,
    },
    avanceCalidadSoldadura: {
        type: Number,
        default: 0,
    },
    revisionCalidadSoldadura: {
        type: Number,
        default: 0,
    },
    creator: [creatorModels],
    timestamp: {
        type: Date,
        default: Date.now,
    },
    modificator: [modificatorModels],
    modifiedOn: {
        type: Date,
        default: null,
    },
})

// ------- OT Information Fabricacion 3° Parte Schema ---------
let otInformationFabricacionTerceraSchema = new Schema({
    boInterno: { 
        type: Date,
        default: null,
    },
    avanceBoInterno: {
        type: Number,
        default: 0,
    },
    revisionBoInterno: {
        type: Number,
        default: 0,
    },
    levRemarcas: {
        type: Number,
        default: 0,
    },
    revisionlevRemarcas: {
        type: Number,
        default: 0,
    },
    proveedor: {
        type: String,
        default: '',
    },
    creator: [creatorModels],
    timestamp: {
        type: Date,
        default: Date.now,
    },
    modificator: [modificatorModels],
    modifiedOn: {
        type: Date,
        default: null,
    },
})

// ------- OT Information Lineas Schema ---------
let otInformationLineasSchema = new Schema({
    otInfoSimulacion: [otInformationSimulacioSchema],
    otInfoIngenieriaMecanica: [otInformationIngenieriaMecanicaSchema],
    otInfoIngenieriaAutomatismo: [otInformationIngenieriaAutomatismoSchema],
    otInfoComprasMecanicas: [otInformationComprasMecSchema],
    otInfoFabricacionPrimera: [otInformationFabricacionPrimeraSchema],
    otInfoFabricacionSegunda: [otInformationFabricacionSegundaSchema],
    otInfoFabricacionTercera: [otInformationFabricacionTerceraSchema],
})

module.exports = { otInformationLineasSchema }