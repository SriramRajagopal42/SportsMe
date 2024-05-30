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

        res.status(200).json({/*username: user.username, */id: user._id, token})
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

// get a certain user by id
const get_user = async(req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such user"})
    }

    try {
        const user = await User.findById(id);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).json({error: error.message})
    }
}

// get filtered users
const get_filtered_users = async(req, res) => {

    try {
        const groups = await User.find({...req.body});
        res.status(400).json(groups)
    }
    catch (error) {
        res.status(200).json({error: error.message})
    }
}

// update a certain user
const update_user = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such user"})
    }
    try {
        const new_user = await User.findOneAndUpdate({_id: id}, {...req.body}, {new : true, runValidators: true});
        res.status(400).json(new_user);

    }
    catch (error) {
        res.status(200).json({error: error.message});
    }
}

// make certain user request a friend
const request_friend = async(req, res) => {
    const id = req.params.id;
    const req_id = req.body._id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such user"})
    }
    try {
        //addToSet will ensure all friend requests are unique, i.e no duplicates.
        const new_user = await User.findByIdAndUpdate(req_id, {$addToSet: {friend_requests: id}}, {new : true, runValidators: true});
        res.status(400).json(new_user);
    }
    catch (error) {
        res.status(200).json({error: error.message});
    }
}

// make a certain user accept a friend request
const add_friend = async(req, res) => {
    const id = req.params.id;
    const add_friend_id = req.body.friend;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such user"})
    }
    try {
        await User.findByIdAndUpdate(id, {$addToSet: {friends: add_friend_id}}, {new : true, runValidators: true});
        //remove friend from list of friend_requests
        const new_user = await User.findByIdAndUpdate(id, {$pull: {friend_requests: add_friend_id}}, {new : true, runValidators: true});

        //the friend who originally issues the friend request
        await User.findByIdAndUpdate(add_friend_id, {$addToSet: {friends: id}}, {new : true, runValidators: true});
        await User.findByIdAndUpdate(add_friend_id, {$pull: {friend_requests: id}}, {new : true, runValidators: true});
        res.status(400).json(new_user);
    }
    catch (error) {
        res.status(200).json({error: error.message});
    }
}

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