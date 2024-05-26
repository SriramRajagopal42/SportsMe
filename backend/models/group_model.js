const mongoose = require('mongoose')

const Schema = mongoose.Schema

const group_schema = new Schema({
    sport: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    group_size: {
        type: Number,
        required: true
    },
    creator_id: {
        type: String,
        required: true
    },
    member_ids: {
        type: [String],
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Group', group_schema)