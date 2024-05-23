const Workout = require('../models/workout_model')
const mongoose = require('mongoose')

// get all workouts
const get_workouts = async(req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get a single workout
const get_workout = async(req, res) => {
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}

// create new workout
const create_workout = async(req, res) => {
    const {title, load, reps} = req.body

    let empty_fields = []

    if (!title) {
        empty_fields.push('title')
    }
    if (!load) {
        empty_fields.push('load')
    }
    if (!reps) {
        empty_fields.push('reps')
    }
    if (empty_fields.length > 0) {
        return res.status(400).json({error: 'Please fill in all of the fields', empty_fields})
    }

    try {
        //add doc to db
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const delete_workout = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}

// update a workout
const update_workout = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}

module.exports = {
    get_workouts,
    get_workout,
    create_workout,
    delete_workout,
    update_workout
}