var mongoose = require('mongoose')

var taskSchema = mongoose.Schema({
    content:  {
        type: String,
        required: true
    },
    type: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model('Task', taskSchema)