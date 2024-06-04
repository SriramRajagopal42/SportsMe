const express = require('express')
const {
    get_all_groups,
    get_filtered_groups,
    get_group,
    create_group,
    delete_group,
    update_group,
    join_group,
    update_comments
} = require("../controllers/group_controller")
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// GET all groups
router.get('/', get_all_groups)

// GET certain groups (needs to be a POST request because GET requests can't have bodies)
router.post('/filtered', get_filtered_groups)

// require auth for some group routes
router.use(requireAuth)

// GET a single group
router.get('/:id', get_group)

// CREATE a group
router.post('/', create_group)

// DELETE a group
router.delete('/:id', delete_group)

// JOIN a group
router.patch('/join/:id', join_group)

// ADD A COMMENT
router.patch("/addComment/:id", update_comments)

// UPDATE a group
router.patch('/:id', update_group)



module.exports = router