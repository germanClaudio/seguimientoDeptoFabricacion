const { Schema, model } = require('mongoose');
// const now = require('../utils/formatDate.js');

const consumiblesSchema = new Schema({
    designation: {
        type: String,
        maxlength: 50,
        trim: true,
    },
    code: {
        type: String,
        maxlength: 100
    },
    type: {
        type: String,
        maxlength: 50
    },
    imageConsumible: { 
        type: String,
        maxlength: 1000
    },
    qrCode: { 
        type: String,
        maxlength: 50000
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
        type: Date, //String,
    },
    modificator: {
        type: Array,
        default: []
    },
    modifiedOn: {
        type: Date, //String,
    },
    visible: {
        type: Boolean,
        default: true
    },
    tipoTalle: {
        type: String,
        default: 'unico'
    },
    stock: {
        type: Map,
        of: {
            type: Number,
            min: 0,
            max: 100000,
            validate: {
                validator: Number.isInteger,
                message: `La cantidad debe ser un número entero.`
            }
        },
        default: {}
    },
    status: {
        type: Boolean,
        default: true
    },
    favorito: {
        type: Number,
        default: 1,
        min: 0,
        max: 5
    },
    limMaxUser: {
        type: Number,
        default: 1,
        min: 0,
        max: 30
    }
});

// Campo virtual para calcular el stock total
consumiblesSchema.virtual('totalStock').get(function() {
    console.log( 'model-consu: ', Array.from(this.stock.values()).reduce((total, stock) => total + stock, 0) )
    return Array.from(this.stock.values()).reduce((total, stock) => total + stock, 0);
});

// Campo virtual para obtener los sizes disponibles
consumiblesSchema.virtual('sizes').get(function() {
    return Array.from(this.stock.keys());
});

module.exports = model('Consumibles', consumiblesSchema);

//---------- Esquema viejo --------------------------
// const { Schema, model } = require('mongoose'),
//     now = require('../utils/formatDate.js')

// const consumiblesSchema = new Schema({
//     designation: {
//         type: String,
//         maxlength: 50,
//         trim: true,
//     },
//     code: {
//         type: String,
//         maxlength: 100
//     },
//     type: {
//         type: String,
//         maxlength: 50
//     },
//     imageConsumible: { 
//         type: String,
//         maxlength: 1000
//     },
//     qrCode: { 
//         type: String,
//         maxlength: 50000
//     },
//     characteristics: { 
//         type: String,
//         maxlength: 350,
//         default: '',
//         trim: true,
//     },
//     creator: {
//         type: Array,
//         default: []
//     },
//     timestamp: {
//         type: String,
//         default: now,
//     },
//     modificator: {
//         type: Array,
//         default: []
//     },
//     modifiedOn: {
//         type: String,
//         default: now,
//     },
//     visible: {
//         type: Boolean,
//         default: true
//     },
//     stock: {
//         type: Number,
//         default: 1,
//         min: 0,
//         max: 100000,
//         validate: {
//             validator: Number.isInteger,
//             message: `La canitdad debe ser un número entero.`
//         }
//     },
//     status: {
//         type: Boolean,
//         default: true
//     },
//     talle: {
//         type: String,
//         maxlength: 10,
//     },
//     size: {
//         type: Number,
//         default: 40,
//         min: 30,
//         max: 50,
//         validate: {
//             validator: Number.isInteger,
//             message: `La canitdad debe ser un número entero.`
//         }
//     }
// })

// module.exports = model('Consumibles', consumiblesSchema)