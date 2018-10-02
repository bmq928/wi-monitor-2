const monitorCpu = require('./monitorCpu')
const { FieldType } = require('influx')

const measurementName = 'cpu'

const schema = {
    measurement: measurementName,
    tags: ['domain', 'serverName'],
    fields: {
        cpuUsage: FieldType.FLOAT
    }
}

const createApi = (app, db) => new Promise(async (resolve, reject) => {

    const repository = await monitorCpu.createRepository(db, measurementName)

    app.get('/monitor-cpu/all', async (req, res) => {
        try {
            const data = {
                hours: req.query.hours,
                domain: req.query.domain
            }
            const result = await repository.allDataInTime(data)
            res.status(200).json(result)
        } catch(e) {
            res.status(400).send(e.message)
        }
    })

    app.get('/monitor-cpu/min-max', async (req, res) => {
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

    app.post('/monitor-cpu/insert-data', async (req, res) => {
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

    CREATE CONTINUOUS QUERY max_1h_cpu ON ${dbName} 
    BEGIN
        SELECT max(cpuUsage) AS "maxUsage" INTO ${dbName}.${retentionPolicyTo}.max_cpu_usage 
        FROM ${dbName}.${retentionPolicyFrom}.${measurementName} 
        GROUP BY time(1h), domain, serverName
    END ;


    CREATE CONTINUOUS QUERY min_1h_cpu ON ${dbName} 
    BEGIN
        SELECT min(cpuUsage) AS "minUsage" INTO ${dbName}.${retentionPolicyTo}.min_cpu_usage 
        FROM ${dbName}.${retentionPolicyFrom}.${measurementName} 
        GROUP BY time(1h), domain, serverName
    END ;

`

module.exports = {
    createApi,
    schema,
    createContinousQuery
}