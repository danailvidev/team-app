var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    description: String,
    activeChannel: String
})

userSchema.pre('save', function(next) {
    var user = this
    
    if(!user.isModified('password')) {
        return next
    }

    bcrypt.hash(user.password, null, null, (err, hash) => {
        if(err) {
            return next(err)
        }
        user.password = hash
        next()
    })
})

module.exports = mongoose.model('User', userSchema)
