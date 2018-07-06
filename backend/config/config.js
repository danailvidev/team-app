var _ = require('lodash')

var config = {
    dev: 'develpment',
    test: 'testing',
    prod: 'production',
    port: process.env.PORT || 3000,
    smtp: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        user: '<user>',
        pass: '<pass>'
    },
    mlabCom: 'mongodb://<user>:<pass>@ds159845.mlab.com:59845/restaurant',
    cloudMongodbCom: 'mongodb://<user>:<pass>@cluster0-shard-00-00-ihpdd.mongodb.net:27017,cluster0-shard-00-01-ihpdd.mongodb.net:27017,cluster0-shard-00-02-ihpdd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
    defaultConnection: mlabCom
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