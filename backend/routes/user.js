const express = require('express')

//controller functions
const {
    login_user, 
    signup_user,
    get_all_users,
    get_user,
    get_filtered_users,
    update_user,
    request_friend,
    add_friend
} = require('../controllers/user_controller')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// login route
router.post('/login', login_user)

// signup route
router.post('/signup', signup_user)

//require auth for some group routes
router.use(requireAuth)

// GET all users
router.get('/', get_all_users)

// GET a certain user
router.get('/:id', get_user)

// GET filtered users
router.get('/filtered', get_filtered_users)

// UPDATE user info
router.patch('/:id', update_user)

// UPDATE certain user's friend requests
router.patch('/friends/request/:id', request_friend)

// Accept a certain user's friend request
router.patch('/friends/accept/:id', add_friend)

module.exports = router