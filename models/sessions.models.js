const { Schema, model, mongoose } = require('mongoose')
let now = require('../utils/formatDate.js')

const creatorModels = require('./creator.models.js')

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

// ------- Session Schema -------------
const sessionSchema = new Schema({
    expires: {
        type: Date
    },
    session: {
        type: String,
        maxlength: 600
    },
    creator: [creatorModels],
    timestamp: {
        type: String,
        default: now,
    }
})

module.exports = model('Sessions', sessionSchema)

// const userSchema = new Schema({ name: String, email: String });

// // The alternative to the export model pattern is the export schema pattern.
// module.exports = userSchema;