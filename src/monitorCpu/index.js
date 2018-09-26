const monitorCpu = require('./monitorCpu')

const createApi = (app, db) => new Promise((resolve, reject) => {
    app.get('/monitor-cpu', (req, res) => {

    })

    resolve()
})

module.exports = {createApi}