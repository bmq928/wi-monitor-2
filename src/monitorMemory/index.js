const {FieldType} = require('influx')
const memoryMonitor = require('./monitorMemory')

const schema = {
    measurement: 'memory',
    tags: ['location', 'path'],
    fields: {
        total: FieldType.FLOAT,
        used: FieldType.FLOAT,
        free: FieldType.FLOAT,
        shared: FieldType.FLOAT,
        buff: FieldType.FLOAT,
        available:  FieldType.FLOAT
    }
}

const createApi = (app, db) => new Promise((resolve, reject) => {
    app.get('/memory-monitor', (req, res) => {

    })

    resolve()
})

module.exports = {
    schema,
    createApi
}