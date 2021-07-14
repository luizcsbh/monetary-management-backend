/**Configure port */
const port = 3003

/* Import body-parser module */
const bodyParser = require('body-parser')

/* Import express framework module */
const express = require('express')

/**Start express object */
const server = express()

/** Import middleware cors*/
const allowCors = require('./cors')

/**Import express-query-int */
const queryParser = require('express-query-int')

/* Configure middlewares */
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

/* Parameterize the listening port */
server.listen(port, function(){
    console.log(`BACKEND is running on port ${port}.`)
})

/**Export var server */
module.exports = server