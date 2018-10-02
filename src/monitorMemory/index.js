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
        try {

            const data = {
                hours: req.query.hours,
                domain: req.query.domain
            }

            const result = await repository.allDataInTime(data)
            res.status(200).json(result)

        } catch (e) {
            res.status(400).send(e.message)
        }
    })

    app.get('/monitor-memory/min-max-used', async (req, res) => {
        try {

            const data = {
                days: req.query.days,
                domain: req.query.domain
            }

            const result = await repository.minMaxUsage(data)
            res.status(200).json(result)

        } catch (e) {
            res.status(400).send(e.message)
        }
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

const createContinousQuery = (dbName, retentionPolicyFrom, retentionPolicyTo) => `

    CREATE CONTINUOUS QUERY max_1h_memory ON ${dbName} 
    BEGIN
        SELECT max(used) AS "maxUsed" INTO ${dbName}.${retentionPolicyTo}.max_memory_usage 
        FROM ${dbName}.${retentionPolicyFrom}.${measurementName} 
        GROUP BY time(1h), domain, serverName
    END ;


    CREATE CONTINUOUS QUERY min_1h_memory ON ${dbName} 
    BEGIN
        SELECT min(used) AS "minUsed" INTO ${dbName}.${retentionPolicyTo}.min_memory_usage 
        FROM ${dbName}.${retentionPolicyFrom}.${measurementName} 
        GROUP BY time(1h), domain, serverName
    END ;

`

module.exports = {
    schema,
    createApi,
    createContinousQuery
}