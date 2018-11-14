const config = require('../../config/config')
var stripe = require('stripe')(config.stripeSecret);
var User = require('./../user/userModel');

const createOrder = async (req, res, next) => {
    let id = req.userId
    let user = await User.findById(id)

    const amount = req.body.amount
    const token = req.body.token.id

    if (user && amount && token) {
        try {
            let customer = await stripe.customers.create({ email: user.email })
            let source = await stripe.customers.createSource(customer.id, { source: token })
            let charge = await stripe.charges.create({ amount: amount, currency: 'eur', customer: source.customer })
            if (charge) {
                return res.status(200).send({ result: true, info: charge })
            }
        } catch (err) {
            return res.status(500).send({ message: err })
        }
    }
}

let stripeController = {
    createOrder
}

module.exports = stripeController