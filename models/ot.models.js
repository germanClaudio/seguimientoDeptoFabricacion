const { Schema, model, mongoose } = require('mongoose')

const creatorModels = require('./creator.models.js')
const modificatorModels = require('./modificator.models.js')

const ingeneiriaMatricesModels = require('./ingenieriaMatrices.models.js')
const ingeneiriaLineasModels = require('./ingenieriaLineas.models.js')
const programacionModels = require('./programas.models.js')
const ajusteModels = require('./ajustes.models.js')

// ------- OT Project Schema -------------
let otProjectSchema = new Schema({
    otId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    otType: { 
        type: String,
        maxlength: 15,
        default: 'matrices'
    },
    otNumber: { 
        type: Number,
        maxlength: 5,
    },
    opNumber: {
        type: String,
        maxlength: 50,
    },
    opDescription: {
        type: String,
        maxlength: 150,
        default: 'No definida'
    },
    otStatus:{
        type: Boolean,
        default: true,
    },
    otPrio:{
        type: Number,
        maxlength: 3,
        defautl: 1
    },
    otDesign:{
        type: String,
        maxlength: 150,
        default: 'No definido'
    },
    otSimulation:{
        type: String,
        maxlength: 150,
        default: 'No definido'
    },
    otSupplier:{
        type: String,
        maxlength: 150,
        default: 'No definido'
    },
    otDibujado:{
        type: Number,
        maxlength: 5,
        default: 1
    },
    otSymetrico:{
        type: Number,
        maxlength: 5,
        default: 0
    },
    otUnidad:{
        type: Number,
        maxlength: 5,
        default: null
    },
    otFuncion:{
        type: String,
        maxlength: 150,
        default: 'No definida'
    },
    otLineaCelda:{
        type: String,
        maxlength: 150,
        default: 'No definida'
    },
    otInformation: [ingeneiriaMatricesModels.otInformationSchema],
    otInformationLineas: [ingeneiriaLineasModels.otInformationLineasSchema],
    otDetalles: [programacionModels.ProgramacionSchema],
    otAjuste: [ajusteModels.AjusteSchema],
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
    visible: {
        type: Boolean,
        default: true,
    }

})

module.exports = otProjectSchema // { otProjectSchema }

