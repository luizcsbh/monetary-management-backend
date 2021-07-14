/**Reference server*/
const server = require('./config/server')

/**Reference database*/
require('./config/database')

/**Reference routes*/
require('./config/routes')(server)