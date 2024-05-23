const express = require('express')

//controller functions
const {login_user, signup_user} = require('../controllers/user_controller')

const router = express.Router()

// login route

router.post('/login', login_user)

// signup route

router.post('/signup', signup_user)

module.exports = router