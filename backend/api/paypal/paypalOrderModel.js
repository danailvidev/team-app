var mongoose = require('mongoose')

var paypalOrderSchema = mongoose.Schema({
    name:  {
        type: String,
    },
    price: {
        type: Number,
    },
    orderId: {
        type: String,
    },
    transactions: {
        type: String,
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

module.exports = mongoose.model('PaypalOrders', paypalOrderSchema)