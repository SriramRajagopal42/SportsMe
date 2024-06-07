const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const user_schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        immutable: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        immutable: true
    },
    password: {
        type: String,
        required: true,
        immutable: true
    },
    friends: {
        type: [String],
        required: true,
    },
    friend_requests: {
        type: [String],
        required: true
    },
    gender: {
        type: String,
    },
    pronouns: {
        type: String,
    },
    fav_sport: {
        type: String,
    },
    year: {
        type: String,
    },
    major: {
        type: String,
    },
    height: {
        type: String,
    },
    skill_level: {
        type: String,
    }
})

// static signup method
user_schema.statics.signup = async function(username, email, password) {
    
    //validation
    if (!email || !password || !username) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password must be at least eight characters long and contain at least one capital letter, one lowercase letter, one number, and one sybmol')
    }
    
    const email_exists = await this.findOne({email})
    const username_exists = await this.findOne({username})

    if (email_exists) {
        throw Error('Email already in use')
    }

    if (username_exists) {
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = this.create({email, password: hash, username, friends: [], friend_requests: []})

    return user
}

//static login method
user_schema.statics.login = async function(email_or_username, password) {
    //validation
    if (!email_or_username || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({$or: [{email: email_or_username}, {username: email_or_username}]})

    if (!user) {
        throw Error('Incorrect email/username')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model("User", user_schema)