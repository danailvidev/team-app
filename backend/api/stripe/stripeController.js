const config = require('../../config/config')
var stripe = require('stripe')(config.stripeSecret);

const createOrder = async(req, res, next) => {
    stripe.customers.create({
        email: req.userEmail
      }).then(function(customer){
        res.status(200).send({
            result: true,
            info: customer
        })
      })
}

let stripeController = {
    createOrder
}

module.exports = stripeController