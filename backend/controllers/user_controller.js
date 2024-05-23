const User = require('../models/user_model')

//login user
const login_user = async (req, res) => {
    res.json({mssg: "login user"})
}

//signup user
const signup_user = async (req, res) => {
    res.json({mssg: "signup user"})
}

module.exports = {login_user, signup_user}