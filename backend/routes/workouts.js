const express = require('express')
const {
    get_workouts,
    get_workout,
    create_workout,
    delete_workout,
    update_workout
} = require("../controllers/workout_controller")

const router = express.Router()

// GET all workouts
router.get('/', get_workouts)

// GET a single workout
router.get('/:id', get_workout)

router.post('/', create_workout)

// DELETE a workout
router.delete('/:id', delete_workout)

// UPDATE a workout
router.patch('/:id', update_workout)

module.exports = router