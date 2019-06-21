var _ = require('lodash')

var config = {
    dev: 'develpment',
    test: 'testing',
    prod: 'production',
    port: process.env.PORT || 3000,
    bcryptSecret: process.env.CRYPT_SECRET,
    stripeSecret: process.env.STRIPE_SECRET_KEY,
    whitelist: ['http://localhost:4200', 'https://teamapp.phyre.dev', 'htts://phyre.dev'],
    smtp: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        user: 'geopioltd@gmail.com',
        pass: 'geop13geop13'
    },
    paypal: {
        host: 'api.sandbox.paypal.com',
        port: '',
        client_id: 'AdcDxdhnbkhmGjbYqR1y75uc8QxB4iaUPbqLtfXhjcAiXKR2kIVbr35d_Lq1g2RueXwOKv9v_b0PaVLR',
        client_secret: 'EDQR8zoKPj13qwF9u7eZfCqoq8PBvhfi_lECdk3FakNiGayhJ6_g4XCaABo1JeIyyEJgiUucWxBOJYX0'
    },
    mlabCom: process.env.MONGOLAB_URL,
    cloudMongodbCom: process.env.CLOUDMONGOCOM_URL || 'mongodb://teamapp:team13app13@cluster0-shard-00-00-ihpdd.mongodb.net:27017,cluster0-shard-00-01-ihpdd.mongodb.net:27017,cluster0-shard-00-02-ihpdd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
}

// check to see if the NODE_ENV was set, if not, set it to dev
process.env.NODE_ENV = process.env.NODE_ENV || config.dev
// set config.env to whatever the NODE_ENV is
config.env = process.env.NODE_ENV

var envConfig

try {
    envConfig = require('./' + config.env)
    envConfig = envConfig || {}
} catch (e) {
    envConfig = {}
}

module.exports = _.merge(config, envConfig)
