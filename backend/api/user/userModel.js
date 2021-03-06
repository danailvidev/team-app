var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
    email:  {
        type: String,
        index: true,
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
    isVisible: {
        type : Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    stripeCustomerId: {
        type: String,
        default: null
    }
})

userSchema.pre('save', function (next) {
    var user = this

    // strategies without password
    // if (!user.password) {
    //     return next()
    // }

    if (!user.isModified('password')) {
        return next()
    }

    bcrypt.hash(user.password, null, null, (err, hash) => {
        if (err) {
            return next(err)
        }
        user.password = hash
        next()
    })
})

module.exports = mongoose.model('User', userSchema)