const { Schema, model, mongoose } = require('mongoose')
const now = require('../utils/formatDate.js')

const creatorModels = require('./creator.models.js')
const modificatorModels = require('./modificator.models.js')

const ingeneiriaMatricesModels = require('./ingenieriaMatrices.models.js')
const programacionModels = require('./programas.models.js')
const ajusteModels = require('./ajustes.models.js')

// ------- OT Project Schema -------------
let otProjectSchema = new Schema({
    otId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    otNumber: { 
        type: Number,
        maxlength: 4,
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
    otInformation: [ingeneiriaMatricesModels.otInformationSchema],
    otDetalles: [programacionModels.ProgramacionSchema],
    otAjuste: [ajusteModels.AjusteSchema],
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
    visible: {
        type: Boolean,
        default: true,
    }

})

module.exports = { otProjectSchema }

