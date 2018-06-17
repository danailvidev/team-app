var cors = require('cors')
var bodyParser = require('body-parser')
const config = require('../config.json')

module.exports = function(app){
    app.use(cors({
        credentials: true,
        origin: config.cors.headers
    }));
    
    app.use(bodyParser.json())
}
