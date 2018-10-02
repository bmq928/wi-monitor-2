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

const createApi = (app, db) => new Promise(async (resolve, reject) => {

    const repository = await memoryMonitor.createRepository(db)

    app.get('/monitor-memory/all', async (req, res) => {

    })

    app.get('/monitor-memory/mean/all', async (req, res) => {

    })

    app.post('monitor-memory/insert-data', async (req, res) => {
        
    })

    resolve()
})

module.exports = {
    schema,
    createApi
}