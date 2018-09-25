const monitorApi = require('./monitorApi')

const createApi = (app, db) => new Promise((resolve, reject) => {
    app.get('/monitor-api', async (req, res) => {
        
    })


    resolve()
})



module.exports = { createApi }