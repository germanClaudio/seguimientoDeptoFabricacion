const { Schema, mongoose } = require('mongoose')
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

// ------- Authorizator Schema -------------
let authorizatorSchema = new Schema({
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

// ------- OT Armado Schema ---------
let otArmadoSchema = new Schema({
    armadoMaquina: { 
        type: String,
        default: 'sinDato',
    },
    revisionArmadoMaquina: {
        type: Number,
        default: 0,
    },
    patronizado: { 
        type: String,
        default: 'sinDato',
    },
    revisionPatronizado: {
        type: Number,
        default: 0,
    },
    lthArmado: {
        type: String,
        default: 'sinDato',
    },
    revisionLthArmado: {
        type: Number,
        default: 0,
    },
    armadoPrensa: {
        type: String,
        default: 'sinDato',
    },
    revisionArmadoPrensa: { 
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
    authorizator: [authorizatorSchema],
    authorizatedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Etapa Primera Schema ---------
let otEtapaPrimeraSchema = new Schema({
    guiados: { 
        type: String,
        default: 'sinDato',
    },
    revisionGuiados: { 
        type: Number,
        default: 0,
    },
    centradoLuzCorte: { 
        type: String,
        default: 'sinDato',
    },
    revisionCentradoLuzCorte: { 
        type: Number,
        default: 0,
    },
    centradoLevas: {
        type: String,
        default: 'sinDato',
    },
    revisionCentradoLevas: { 
        type: Number,
        default: 0,
    },
    lthEtapaPrimera: {
        type: String,
        default: 'sinDato',
    },
    revisionLthEtapaPrimera: {
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
    authorizator: [authorizatorSchema],
    authorizatedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Etapa Segunda Schema ---------
let otEtapaSegundaPrimeraSchema = new Schema({
    azulados: {
        type: String,
        default: 'sinDato',
    },
    revisionAzulados: { 
        type: Number,
        default: 0,
    },
    tachoAjuste: {
        type: String,
        default: 'sinDato',
    },
    revisionTachoAjuste: { 
        type: Number,
        default: 0,
    },
    ajusteFondo: {
        type: String,
        default: 'sinDato',
    },
    revisionAjusteFondo: { 
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
    authorizator: [authorizatorSchema],
    authorizatedOn: {
        type: String,
        default: ""
    },
})

// ------- OT Etapa Segunda Schema ---------
let otEtapaSegundaSegundaSchema = new Schema({
    azuladoAceros: {
        type: String,
        default: 'sinDato',
    },
    revisionAzuladoAceros: { 
        type: Number,
        default: 0,
    },
    lthEtapaSegunda: {
        type: String,
        default: 'sinDato',
    },
    revisionLthEtapaSegunda: {
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
    authorizator: [authorizatorSchema],
    authorizatedOn: {
        type: String,
        default: ""
    },
})

// ------- Analisis Critico Schema ---------
let otAnalisisCriticoSchema = new Schema({
    estatico: {
        type: String,
        default: 'sinDato',
    },
    revisionEstatico: { 
        type: Number,
        default: 0,
    },
    dinamico: {
        type: String,
        default: 'sinDato',
    },
    revisionDinamico: { 
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
    authorizator: [authorizatorSchema],
    authorizatedOn: {
        type: String,
        default: ""
    },
})

// ------- Estapa Tercera Primera Schema ---------
let otEtapaTerceraPrimeraSchema = new Schema({
    localizacionFuncional: {
        type: String,
        default: 'sinDato',
    },
    revisionLocalizacionFuncional: { 
        type: Number,
        default: 0,
    },
    obtencionPieza: {
        type: String,
        default: 'sinDato',
    },
    revisionObtencionPieza: { 
        type: Number,
        default: 0,
    },
    azuladoFuncional: {
        type: String,
        default: 'sinDato',
    },
    revisionAzuladoFuncional: { 
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
    authorizator: [authorizatorSchema],
    authorizatedOn: {
        type: String,
        default: ""
    },
})

// ------- Estapa Tercera Segunda Schema ---------
let otEtapaTerceraSegundaSchema = new Schema({
    funcionalCompleta: {
        type: String,
        default: 'sinDato',
    },
    revisionFuncionalCompleta: { 
        type: Number,
        default: 0,
    },
    lthEtapaTercera: {
        type: String,
        default: 'sinDato',
    },
    revisionLthEtapaTercera: {
        type: Number,
        default: 0,
    },
    liberarPiezaMetrologia: {
        type: String,
        default: 'sinDato',
    },
    revisionLiberarPiezaMetrologia: { 
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
    authorizator: [authorizatorSchema],
    authorizatedOn: {
        type: String,
        default: ""
    },
})

// ------- Ciclo Correccion Primera Schema ---------
let otCicloCorreccionPrimeraSchema = new Schema({
    piezaMedidaReunionPrimera: {
        type: String,
        default: 'sinDato',
    },
    revisionPiezaMedidaReunionPrimera: { 
        type: Number,
        default: 0,
    },
    maquinaPrimera: {
        type: String,
        default: 'sinDato',
    },
    revisionMaquinaPrimera: { 
        type: Number,
        default: 0,
    },
    ajustePrimera: {
        type: String,
        default: 'sinDato',
    },
    revisionAjustePrimera: { 
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
    authorizator: [authorizatorSchema],
    authorizatedOn: {
        type: String,
        default: ""
    },
})

// ------- Ciclo Correccion Segunda Schema ---------
let otCicloCorreccionSegundaSchema = new Schema({
    piezaMedidaReunionSegunda: {
        type: String,
        default: 'sinDato',
    },
    revisionPiezaMedidaReunionSegunda: { 
        type: Number,
        default: 0,
    },
    maquinaSegunda: {
        type: String,
        default: 'sinDato',
    },
    revisionMaquinaSegunda: { 
        type: Number,
        default: 0,
    },
    ajusteSegunda: {
        type: String,
        default: 'sinDato',
    },
    revisionAjusteSegunda: { 
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
    authorizator: [authorizatorSchema],
    authorizatedOn: {
        type: String,
        default: ""
    },
})

// ------- Ciclo Correccion Tercera Schema ---------
let otCicloCorreccionTerceraSchema = new Schema({
    piezaMedidaReunionTercera: {
        type: String,
        default: 'sinDato',
    },
    revisionPiezaMedidaReunionTercera: { 
        type: Number,
        default: 0,
    },
    maquinaTercera: {
        type: String,
        default: 'sinDato',
    },
    revisionMaquinaTercera: { 
        type: Number,
        default: 0,
    },
    ajusteTercera: {
        type: String,
        default: 'sinDato',
    },
    revisionAjusteTercera: { 
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
    authorizator: [authorizatorSchema],
    authorizatedOn: {
        type: String,
        default: ""
    },
})

// ------- Liberacion BuyOff Primera Schema ---------
let otLiberacionBuyOffPrimeraSchema = new Schema({
    azuladosFondoPieza: {
        type: String,
        default: 'sinDato',
    },
    revisionAzuladosFondoPieza: { 
        type: Number,
        default: 0,
    },
    roces: {
        type: String,
        default: 'sinDato',
    },
    revisionRoces: { 
        type: Number,
        default: 0,
    },
    azuladoGuias: {
        type: String,
        default: 'sinDato',
    },
    revisionAzuladoGuias: { 
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
    authorizator: [authorizatorSchema],
    authorizatedOn: {
        type: String,
        default: ""
    },
})

// ------- Liberacion BuyOff Segunda Schema ---------
let otLiberacionBuyOffSegundaSchema = new Schema({
    rebabas: {
        type: String,
        default: 'sinDato',
    },
    revisionRebabas: { 
        type: Number,
        default: 0,
    },
    caidasScrap: {
        type: String,
        default: 'sinDato',
    },
    revisionCaidasScrap: { 
        type: Number,
        default: 0,
    },
    aspecto: {
        type: String,
        default: 'sinDato',
    },
    revisionAspecto: { 
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
    authorizator: [authorizatorSchema],
    authorizatedOn: {
        type: String,
        default: ""
    },
})

// ------- Buy Off Schema ---------
let otBuyOffSchema = new Schema({
    buyOffEstatico: {
        type: String,
        default: 'sinDato',
    },
    revisionBuyOffEstatico: { 
        type: Number,
        default: 0,
    },
    buyOffDinamico: {
        type: String,
        default: 'sinDato',
    },
    revisionBuyOffDinamico: { 
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
    authorizator: [authorizatorSchema],
    authorizatedOn: {
        type: String,
        default: ""
    },
})

// ------- Pendientes Finales Cliente Schema ---------
let otPendientesFinalesSchema = new Schema({
    pendientesMaquina: { 
        type: String,
        default: 'sinDato',
    },
    revisionPendientesMaquina: { 
        type: Number,
        default: 0,
    },
    pendientesAjuste: { 
        type: String,
        default: 'sinDato',
    },
    revisionPendientesAjuste: { 
        type: Number,
        default: 0,
    },
    notasAjuste: {
        type: String,
        default: '',
    },
    revisionNotasAjuste: { 
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

// ------- Ajuste de herramentales ---------
let AjusteSchema = new Schema({
    otAjusteId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    otArmado: [otArmadoSchema],
    otEtapaPrimera: [otEtapaPrimeraSchema],
    otEtapaSegundaPrimera: [otEtapaSegundaPrimeraSchema],
    otEtapaSegundaSegunda: [otEtapaSegundaSegundaSchema],
    otAnalisisCritico: [otAnalisisCriticoSchema],
    otEtapaTerceraPrimera: [otEtapaTerceraPrimeraSchema],
    otEtapaTerceraSegunda: [otEtapaTerceraSegundaSchema],
    otCicloCorreccionPrimera: [otCicloCorreccionPrimeraSchema],
    otCicloCorreccionSegunda: [otCicloCorreccionSegundaSchema],
    otCicloCorreccionTercera: [otCicloCorreccionTerceraSchema],
    otLiberacionBuyOffPrimera: [otLiberacionBuyOffPrimeraSchema],
    otLiberacionBuyOffSegunda: [otLiberacionBuyOffSegundaSchema],
    otBuyOff: [otBuyOffSchema],
    otPendientesFinales: [otPendientesFinalesSchema],
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
    }
})

module.exports = { AjusteSchema }