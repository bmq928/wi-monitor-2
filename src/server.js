const express = require('express')
const cors = require('cors')
const app = express()

const start = () => new Promise((resolve, reject) => {
    

    app.use(cors())

    resolve(app)
})


module.exports = {start}