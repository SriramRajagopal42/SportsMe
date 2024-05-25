const express = require('express')
const {
    get_all_groups,
    get_filtered_groups,
    //get_workout,
    create_group,
    delete_group,
    update_group,
    join_group
} = require("../controllers/group_controller")
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// GET all groups
router.get('/', get_all_groups)

// GET certain groups
router.get('/filtered', get_filtered_groups)

//require auth for all group routes
router.use(requireAuth)

// GET a single workout
//router.get('/:id', get_workout)

// CREATE a group
router.post('/', create_group)

// DELETE a group
router.delete('/:id', delete_group)

// JOIN a group
router.patch('/join/:id', join_group)

// UPDATE a group
router.patch('/update/:id', update_group)

module.exports = router