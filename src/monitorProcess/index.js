const monitorProcess = require('./monitorProcess')

const createApi = (app, db) => new Promise((resolve, reject) => {
    app.get('monitor-process', (req, res) => {

    })

    resolve()
})

const createMiddleware = () => {
    
}

module.exports = {createApi}