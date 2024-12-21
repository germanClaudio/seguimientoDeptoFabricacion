const { Schema, model } = require('mongoose')
const now = require('../utils/formatDate.js')

const herramientasSchema = new Schema({
    designation: {
        type: String,
        maxlength: 50,
        trim: true,
    },
    code: {
        type: String,
        maxlength: 50
    },
    type: {
        type: String,
        maxlength: 50
    },
    diam: {
        type: Number,
        default: 16,
        min: 1,
        max: 300,
        validate: {
            validator: Number.isInteger,
            message: `El diámetro debe ser un número entero.`
        }
    },
    largo: {
        type: Number,
        default: 15,
        min: 1,
        max: 500,
        validate: {
            validator: Number.isInteger,
            message: `El largo debe ser un número entero.`
        }
    },
    radio: {
        type: String,
        maxlength: 2,
        validate: {
            validator: function (v) {
                // Expresión regular: acepta letras mayúsculas (A-Z), números (0-9) y espacios
                return /^[A-Z0-9\s]+$/.test(v);
            },
            message: props => `${props.value} no es válido. Solo se permiten letras mayúsculas, números enteros y espacios en blanco.`
        }
    },
    cono: {
        type: String,
        maxlength: 3,
        validate: {
            validator: function (v) {
                // Expresión regular: acepta letras mayúsculas (A-Z), números (0-9) y espacios
                return /^[A-Z0-9\s]+$/.test(v);
            },
            message: props => `${props.value} no es válido. Solo se permiten letras mayúsculas, números enteros y espacios en blanco.`
        }
    },
    reduccion: {
        type: String,
        maxlength: 4,
        validate: {
            validator: function (v) {
                 // Expresión regular: acepta letras mayúsculas (A-Z), números (0-9) y espacios
                return /^[A-Z0-9\s]+$/.test(v);
            },
            message: props => `${props.value} no es válido. Solo se permiten letras mayúsculas, números enteros y espacios en blanco.`
        }
    },
    prolongacion: {
        type: String,
        maxlength: 3,
        validate: {
            validator: function (v) {
                // Expresión regular: acepta letras mayúsculas (A-Z), números (0-9) y espacios
                return /^[A-Z0-9\s]+$/.test(v);
            },
            message: props => `${props.value} no es válido. Solo se permiten letras mayúsculas, números enteros y espacios en blanco.`
        }
    },
    arrastre: {
        type: String,
        maxlength: 2,
        validate: {
            validator: function (v) {
                // Expresión regular: acepta letras mayúsculas (A-Z), números (0-9) y espacios
                return /^[A-Z0-9\s]+$/.test(v);
            },
            message: props => `${props.value} no es válido. Solo se permiten letras mayúsculas, números enteros y espacios en blanco.`
        }
    },
    terminacion: {
        type: String,
        maxlength: 2,
        validate: {
            validator: function (v) {
                // Expresión regular: acepta letras mayúsculas (A-Z), números (0-9) y espacios
                return /^[A-Z0-9\s]+$/.test(v);
            },
            message: props => `${props.value} no es válido. Solo se permiten letras mayúsculas, números enteros y espacios en blanco.`
        }
    },
    imageCuttingTool: { 
        type: String,
        maxlength: 1000
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    characteristics: { 
        type: String,
        maxlength: 350,
        default: '',
        trim: true,
    },
    creator: {
        type: Array,
        default: []
    },
    timestamp: {
        type: String,
        default: now,
    },
    modificator: {
        type: Array,
        default: []
    },
    modifiedOn: {
        type: String,
        default: now,
    },
    visible: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        default: 0,
        min: 0,
        max: 1000,
        validate: {
            validator: Number.isInteger,
            message: `La cantidad debe ser un número entero.`
        }
    },
    onUse: {
        type: Boolean,
        default: false
    },
    usingBy: {
        type: Array,
        default: []
    },
    usingByTool: {
        type: Array,
        default: []
    },
    usingStart: {
        type: Date,
    },
    usingEnd: {
        type: Date,
    },
})

module.exports = model('Herramientas', herramientasSchema)