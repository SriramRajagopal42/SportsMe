require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workout_routes = require('./routes/workouts')
const user_routes = require('./routes/user')
const cors = require('cors')

// express app
const app = express()

//middleware (stuff that processes requests and responses)
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next() //need this so that the next piece of middleware (routes) can be called
})

//routes
app.use('/api/workouts', workout_routes)
app.use('/api/user', user_routes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })