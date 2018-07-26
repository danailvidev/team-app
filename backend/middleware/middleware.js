var cors = require('cors')
var bodyParser = require('body-parser')
const config = require('../config/config')

module.exports = function(app){
    app.use(cors({
        credentials: true,
        origin: config.cors == undefined ? 'http://localhost:4200' : config.cors.headers
    }));
    
    app.use(bodyParser.json())
}
