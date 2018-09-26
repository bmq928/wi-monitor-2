const monitorProcess = require('./monitorProcess')

const createApi = (app, db) => new Promise((resolve, reject) => {
    app.get('monitor-process', (req, res) => {

    })

    resolve()
})

module.exports = {createApi}