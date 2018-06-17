var mongoose = require('mongoose')
var chalk = require('chalk')
const config = require('../config.json')

module.exports = function () {
    mongoose.Promise = Promise // use es6 promise  DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated

    mongoose.connect(config.mlabCom, {
        useMongoClient: true,
    }, (err) => {
        if (!err) {
            console.log(chalk.underline.green.bold('MongoDB connected'))
        } else {
            console.error(err);
            console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
            process.exit();
        }
    })
}