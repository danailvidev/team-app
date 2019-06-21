var cors = require('cors')
var bodyParser = require('body-parser')
const config = require('../config/config')

module.exports = function (app) {
    app.use(cors({
        credentials: true,
        origin: function (origin, callback) {
            if (config.whitelist.indexOf(origin) !== -1) {
              callback(null, true)
            } else {
              callback(new Error('Not allowed by CORS'))
            }
          }
    }));

    app.use(bodyParser.json())
}
