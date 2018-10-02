const { FieldType } = require('influx')
const monitorProcess = require('./monitorProcess')

const measurementName = 'process'

const schema = {
    measurement: measurementName,
    tags: ['command','serverName', 'domain'],
    fields: {
        cpu: FieldType.FLOAT,
        count: FieldType.INTEGER,
        memory: FieldType.STRING
    }
}

const createApi = (app, db) => new Promise( async (resolve, reject) => {

    const repository = await monitorProcess.createRepository(db, measurementName)

    app.get('/monitor-process/all', async (req, res) => {
        try {

            const data = {
                hours: req.query.hours,
                domain: req.query.domain
            }

            const result = await repository.allProcessInTime(data)
            res.status(200).json(result)

        } catch (e) {
            res.status(400).send(e.message)
        }
    })

    app.get('/monitor-process/count/min-max', async (req, res) => {
        try {
            const data = {
                days: req.query.days,
                domain: req.query.domain
            }

            const result = await repository.countMinMax(data)
            res.status(200).json(result)
        } catch (e) {
            res.status(400).send(e.message)
        }
    })

    app.get('/monitor-process/cpu/min-max', async (req, res) => {
        try {
            const data = {
                days: req.query.days,
                domain: req.query.domain
            }

            const result = await repository.cpuMinMax(data)
            res.status(200).json(result)
        } catch (e) {
            res.status(400).send(e.message)
        }
    })

    app.post('/monitor-process/insert-data', async (req, res) => {
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

    CREATE CONTINUOUS QUERY max_1h_process_count ON ${dbName} 
    BEGIN
        SELECT max(count) AS "maxCount" INTO ${dbName}.${retentionPolicyTo}.max_process_count 
        FROM ${dbName}.${retentionPolicyFrom}.${measurementName} 
        GROUP BY time(1h), domain, serverName, command
    END ;


    CREATE CONTINUOUS QUERY min_1h_process_count ON ${dbName} 
    BEGIN
        SELECT min(count) AS "minCount" INTO ${dbName}.${retentionPolicyTo}.min_process_count 
        FROM ${dbName}.${retentionPolicyFrom}.${measurementName} 
        GROUP BY time(1h), domain, serverName, command
    END ;

    CREATE CONTINUOUS QUERY max_1h_process_cpu ON ${dbName} 
    BEGIN
        SELECT max(cpu) AS "maxCpu" INTO ${dbName}.${retentionPolicyTo}.max_process_cpu 
        FROM ${dbName}.${retentionPolicyFrom}.${measurementName} 
        GROUP BY time(1h), domain, serverName, command
    END ;


    CREATE CONTINUOUS QUERY min_1h_process_cpu ON ${dbName} 
    BEGIN
        SELECT min(cpu) AS "minCpu" INTO ${dbName}.${retentionPolicyTo}.min_process_cpu 
        FROM ${dbName}.${retentionPolicyFrom}.${measurementName} 
        GROUP BY time(1h), domain, serverName
    END ;

`


module.exports = { 
    createApi,
    schema,
    createContinousQuery
}