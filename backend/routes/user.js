var User = require('../models/User.js')
var express = require('express')
var auth = require('./auth.js')
var router = express.Router()

router.get('/:id', async(req, res) => {
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

router.get('/', async(req, res) => {
    try {
        var users = await User.find({}, '-password -__v -hash -confirmPassword') // remove unwanted props
        res.send(users)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

var user = {
    router
}

module.exports = user