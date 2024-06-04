const User = require('../models/user_model')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAILPASS
  }
});

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login user
const login_user = async (req, res) => {
    const {email_or_username, password} = req.body

    try {
        const user = await User.login(email_or_username, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({username: user.username, id: user._id, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signup_user = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const user = await User.signup(username, email, password)

        // create a token
        const token = createToken(user._id)
        
        var mailOptions = {
            from: process.env.GMAIL,
            to: email,
            subject: `Thank you for signing up, ${username}!`,
            text: 'I hope you enjoy making groups using our website!'
        }
  
        transporter.sendMail(mailOptions)

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
        res.status(200).json(groups)
    }
    catch (error) {
        res.status(400).json({error: error.message})
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
        res.status(200).json(new_user);

    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

// make certain user request a friend
const request_friend = async(req, res) => {
    const id = req.params.id;
    const req_id = req.body._id.friend_id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such user"})
    }
    try {
        //addToSet will ensure all friend requests are unique, i.e no duplicates.
        const new_user = await User.findByIdAndUpdate(req_id, {$addToSet: {friend_requests: id}}, {new : true, runValidators: true});
        const requester = await User.findById(id);

        var mailOptions = {
            from: process.env.GMAIL,
            to: new_user.email,
            subject: 'You have a new friend request!',
            text: `Hello ${new_user.username}, you have a new friend request from ${requester.username}, check it out!`
        }
  
        transporter.sendMail(mailOptions)

        res.status(200).json(new_user);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

// make a certain user accept a friend request
const add_friend = async(req, res) => {
    const id = req.params.id;
    const friend_to_add = req.body.friend.friend_id;
    console.log(friend_to_add);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such user"})
    }
    try {
        const requester = await User.findById(friend_to_add)
        //remove friend from list of friend_requests
        const new_user = await User.findByIdAndUpdate(id, {$pull: {friend_requests: friend_to_add}}, {new : true, runValidators: true});
        var mailOptions = {
            from: process.env.GMAIL,
            to: requester.email,
            subject: 'Your friend request got accepted!',
            text: `Hello ${requester.username}, ${new_user.username} just accepted your friend request!`
        }
  
        transporter.sendMail(mailOptions)
        
        await User.findByIdAndUpdate(id, {$addToSet: {friends: friend_to_add}}, {new : true, runValidators: true});
        

        //the friend who originally issues the friend request
        await User.findByIdAndUpdate(friend_to_add, {$addToSet: {friends: id}}, {new : true, runValidators: true});
        await User.findByIdAndUpdate(friend_to_add, {$pull: {friend_requests: id}}, {new : true, runValidators: true});
        res.status(200).json(new_user);
    }
    catch (error) {
        res.status(400).json({error: error.message});
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