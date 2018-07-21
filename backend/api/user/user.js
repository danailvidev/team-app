var User = require('./userModel.js')
var express = require('express')
var auth = require('../auth/auth.js')
var userRouter = express.Router()

userRouter.get('/:id', async(req, res) => {
    try {
        var user = await User.findById({
            _id: req.params.id
        }, '-password -__v') // remove unwanted props
        res.send(user)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

userRouter.get('/', async(req, res) => {
    try {
        var users = await User.find({}, '-password -__v -hash -confirmPassword') // remove unwanted props
        res.send(users)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

var user = {
    userRouter
}

module.exports = user