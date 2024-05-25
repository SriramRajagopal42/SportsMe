const Group = require('../models/group_model')
const mongoose = require('mongoose')

// get all groups
const get_all_groups = async(req, res) => {
    const groups = await Group.find({}).sort({createdAt: -1})

    res.status(200).json(groups)
}

// get filtered groups
const get_filtered_groups = async(req, res) => {
    const groups = await Group.find({...req.body}).sort({createdAt: -1})

    res.status(200).json(groups)
}

/*
// get a single group
const get_group = async(req, res) => {
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such group"})
    }

    const group = await Group.findById(id)

    if (!group) {
        return res.status(404).json({error: "No such group"})
    }

    res.status(200).json(group)
}
*/

// create new group
const create_group = async(req, res) => {
    const {sport, time, place, group_size} = req.body

    let empty_fields = []

    if (!sport) {
        empty_fields.push('sport')
    }
    if (!time) {
        empty_fields.push('time')
    }
    if (!place) {
        empty_fields.push('place')
    }
    if (!group_size) {
        empty_fields.push('group size')
    }
    if (empty_fields.length > 0) {
        return res.status(400).json({error: 'Please fill in all of the fields', empty_fields})
    }

    try {
        //add doc to db
        const user_id = req.user._id
        const group = await Group.create({sport, time, place, group_size, creator_id: user_id, member_ids: [creator_id]})
        res.status(200).json(group)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a group
const delete_group = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such group"})
    }

    const group = await Group.findOneAndDelete({_id: id})

    if (!group) {
        return res.status(404).json({error: "No such group"})
    }

    res.status(200).json(group)
}

// join a group
const join_group = async(req, res) => {
    const {id} = req.params
    const {member_id} = req.user._id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such group"})
    }

    const group_size = await Group.findOne({_id: id}).select('group_size')

    const group = await Group.findOneAndUpdate({_id: id}, {
        $push: {
            member_ids: {
                $each: member._id,
                $slice: group_size
            }
        }
    })

    if (!group) {
        return res.status(404).json({error: "No such group"})
    }

    res.status(200).json(group)

}

// update a workout
const update_group = async(req, res) => {
    const {id} = req.params
    const {creator_id} = req.user._id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such group"})
    }

    const group = await Group.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (group.creator_id !== creator_id) {
        return res.status(401).json({error: "Not the user who created the group"})
    }

    if (!group) {
        return res.status(404).json({error: "No such group"})
    }

    res.status(200).json(group)
}

module.exports = {
    get_all_groups,
    get_filtered_groups,
    //get_workout,
    create_group,
    delete_group,
    update_group,
    join_group
}