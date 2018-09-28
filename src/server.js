const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express()

const start = () => new Promise((resolve, reject) => {
    
    app.use(helmet())
    app.use(cors())

    resolve(app)
})


module.exports = {start}