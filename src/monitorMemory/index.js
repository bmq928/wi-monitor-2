const { FieldType } = require('influx')
const memoryMonitor = require('./monitorMemory')

const measurementName = 'memory'

const schema = {
    measurement: measurementName,
    tags: ['domain', 'serverName'],
    fields: {
        total: FieldType.FLOAT,
        used: FieldType.FLOAT,
        free: FieldType.FLOAT,
        shared: FieldType.FLOAT,
        buff: FieldType.FLOAT,
        available: FieldType.FLOAT
    }
}

const createApi = (app, db) => new Promise(async (resolve, reject) => {

    const repository = await memoryMonitor.createRepository(db, measurementName)

    app.get('/monitor-memory/all', async (req, res) => {
        
    })

    app.get('/monitor-memory/mean/all', async (req, res) => {

    })

    app.post('/monitor-memory/insert-data', async (req, res) => {
        try {
            await repository.insertData(req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).send(e.message)
        }
    })

    resolve()
})

module.exports = {
    schema,
    createApi
}