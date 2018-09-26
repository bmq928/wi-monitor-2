const memoryMonitor = require('./monitorMemory')

const createApi = (app, db) => new Promise((resolve, reject) => {
    app.get('/memory-monitor', (req, res) => {

    })

    resolve()
})

module.exports = {createApi}