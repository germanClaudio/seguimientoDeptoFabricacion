const { Schema, model, mongoose } = require('mongoose')

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
    },
    legajoId: {
        type: Number,
    }
})
module.exports = { creatorSchema }