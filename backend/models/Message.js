var mongoose = require('mongoose')

module.exports = mongoose.model('Messages', {
    content: String,
    authorEmail: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateCreated: Date
})