var paypal = require('paypal-rest-sdk')
var PaypalOrder = require('./paypalOrderModel.js')
const config = require('../../config/config')

const get = async (req, res, next) => {
    
}

const createOrder = async(req, res, next) => {
    let orderData = req.body
    orderData.authorId = req.userId
    let order = new PaypalOrder(orderData)
    order.save((err, result) => {
        if (err) {
            console.error('PaypalOrder error')
            return res.status(500).send({
                message: 'PaypalOrder error'
            })
        } else {
            res.status(200).send({
                result: true,
                info: result
            })
            console.log(result)

        }
    })
    
    // var paymentObj = {
    //     intent: 'sale',
    //     payer: {
    //         payment_method: 'paypal'
    //     },
    //     redirect_urls: {
    //         return_url: returnUrl + '/' + results.insertedIds[0],
    //         cancel_url: cancelUrl + '/' + results.insertedIds[0]
    //     },
    //     transactions: transactionsArray
    // }

    // paypal.payment.create(paymentObj, (err, resnponse) => {
    //     if (err){
    //         return cb(err)
    //     } else {

    //     }
    // })
}

let paypalController = {
    createOrder
}

module.exports = paypalController