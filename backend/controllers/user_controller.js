const User = require('../models/user_model')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//login user
const login_user = async (req, res) => {
    const {email_or_username, password} = req.body

    try {
        const user = await User.login(email_or_username, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({username: user.username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup user
const signup_user = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const user = await User.signup(username, email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({username: user.username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {login_user, signup_user}