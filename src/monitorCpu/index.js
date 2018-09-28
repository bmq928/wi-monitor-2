const monitorCpu = require('./monitorCpu')
const { FieldType } = require('influx')


const schema = {
    measurement: 'cpu',
    tags: ['location', 'path'],
    fields: {
        cpuUsage: FieldType.FLOAT
    }
}

const createApi = (app, db) => new Promise((resolve, reject) => {
    app.get('/monitor-cpu', (req, res) => {

    })

    resolve()
})

const createMiddleware = () => {

}

module.exports = {
    createApi,
    schema
}