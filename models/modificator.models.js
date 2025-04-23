const { Schema, model, mongoose } = require('mongoose')

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

module.exports = modificatorSchema //{ modificatorSchema }