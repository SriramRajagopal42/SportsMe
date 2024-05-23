const mongoose = require('mongoose')

const Schema = mongoose.Schema

const user_schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("User", user_schema)