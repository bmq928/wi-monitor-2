const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express()

const start = () => new Promise((resolve, reject) => {
    
    app.use(helmet())
    app.use(cors())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(bodyParser.json({type: 'application/vnd.api+json'}))

    resolve(app)
})


module.exports = {start}