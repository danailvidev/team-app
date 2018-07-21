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
    isVisible: {
        type : Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
})

userSchema.pre('save', function (next) {
    var user = this

    if (!user.isModified('password')) {
        return next
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