var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
    email:  {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    description: String,
    activeChannel: String,
    isVisible: Boolean,
    registeredAt: Date
})

userSchema.pre('save', function (next) {
    var user = this

    if (!user.isModified('password')) {
        return next
    }

    setDefaultSettings(user)

    bcrypt.hash(user.password, null, null, (err, hash) => {
        if (err) {
            return next(err)
        }
        user.password = hash
        next()
    })
})

function setDefaultSettings(user) {
    user.isVisible = true
    user.activeChannel = null
    user.registeredAt = new Date()
    return user
}

module.exports = mongoose.model('User', userSchema)