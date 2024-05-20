const { Schema, model } = require('mongoose')

const sessionSchema = new Schema({
    // _id: {
    //     type: String,
    //     maxlength: 100
    // },
    expires: {
        type: Date
    },
    session: {
        type: String,
        maxlength: 500
    }
})

module.exports = model('Sessions', sessionSchema)

// const userSchema = new Schema({ name: String, email: String });

// // The alternative to the export model pattern is the export schema pattern.
// module.exports = userSchema;