var User = require('./userModel.js')

const params = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user) {
            next(new Error('No user with that id'))
        } else {
            req.user = user;
            next()
        }
    } catch (err) {
        next(err)
        console.log(error)
        res.sendStatus(500)
    }
}

const get = async (req, res) => {
    try {
        var users = await User.find({}, '-password -__v -hash -confirmPassword') // remove unwanted props
        res.send(users)
    } catch (err) {
        console.log(error)
        res.sendStatus(500)
    }
}

const getOne = (req, res) => {
    var user = req.user
    res.send(user)
}

var userController = {
    params,
    get,
    getOne
}

module.exports = userController