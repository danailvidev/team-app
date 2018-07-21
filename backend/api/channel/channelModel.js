var mongoose = require('mongoose')

module.exports = mongoose.model('Channel', {
    name: String,
    dateCreated: Date
})