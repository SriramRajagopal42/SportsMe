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

        res.status(200).json({username: user.username, id: user._id, token})
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

        res.status(200).json({username: user.username, id: user._id, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get all users
const get_all_users = async(req, res) => {
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

// get a certain user
const get_user = async(req, res) => {}

// get filtered users
const get_filtered_users = async(req, res) => {}

// update a certain user
const update_user = async(req, res) => {}

// make certain user request a friend
const request_friend = async(req, res) => {}

// make a certain user accept a friend request
const add_friend = async(req, res) => {}

module.exports = {
    login_user, 
    signup_user,
    get_all_users,
    get_user,
    get_filtered_users,
    update_user,
    request_friend,
    add_friend
}