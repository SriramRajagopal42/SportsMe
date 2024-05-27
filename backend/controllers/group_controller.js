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

// get a single group
const get_group = async(req, res) => {
    const {id} = req.params.id
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such group"})
    }

    const group = await Group.findById(id)

    if (!group) {
        return res.status(404).json({error: "No such group"})
    }

    res.status(200).json(group)
}

// create new group
const create_group = async(req, res) => {
    const {sport, date, time, place, group_size} = req.body

    let empty_fields = []

    if (!sport) {
        empty_fields.push('sport')
    }
    if (!date) {
        empty_fields.push('date')
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
        const group = await Group.create({sport, date, time, place, group_size, creator_id: user_id, member_ids: [user_id]})
        res.status(200).json(group)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a group
const delete_group = async(req, res) => {
    const id = req.params.id
    const creator_id = req.user._id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such group"})
    }

    const group = await Group.findOneAndDelete({_id: id, creator_id})

    if (!group) {
        return res.status(404).json({error: "Not the user who created the group"})
    }

    res.status(200).json(group)
}

// join a group
const join_group = async(req, res) => {
    const id = req.params.id
    const member_id = req.user._id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such group"})
    }

    const group_size = await Group.findOne({_id: id}).select('group_size')

    const group = await Group.findOneAndUpdate({_id: id}, {
        $push: {
            member_ids: {
                $each: [member_id],
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
    const id = req.params.id
    const creator_id = req.user._id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such group"})
    }

    const group = await Group.findOneAndUpdate({_id: id, creator_id}, {
        ...req.body
    })

    if (!group) {
        return res.status(404).json({error: "Not the user who created the group"})
    }

    res.status(200).json(group)
}

const update_comments = async(req, res) => {
    const id = req.params.id;
    const comment = {...req.body};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("No such group");
        return res.status(404).json({error: "No such group"});
    }
    try {
        const updated_group = await Group.findOneAndUpdate({_id: id}, {$push: comment}, {new : true, runValidators: true});
        res.status(200).json(updated_group);
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
}

module.exports = {
    get_all_groups,
    get_filtered_groups,
    get_group,
    create_group,
    delete_group,
    update_group,
    join_group,
    update_comments
}