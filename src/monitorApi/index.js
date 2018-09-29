const { FieldType } = require('influx')
const axios = require('axios')
const monitorApi = require('./monitorApi')

const measurementName = 'response_time'

const schema = {
    measurement: measurementName,
    tags: ['username', 'path'],
    fields: {
        duration: FieldType.INTEGER,
        ipaddr: FieldType.STRING,
        pid: FieldType.STRING
    }
}

const createApi = (app, db) => new Promise((resolve, reject) => {

    const repository = monitorApi.createRepository(db, measurementName)

    app.get('/monitor-api/count', async (req, res) => {
        try {
            const result = await repository.countRequest()
            res.status(200).json(result)
        } catch (e) {
            res.status(400).send(e.message)
        }

    })

    app.get('/monitor-api/all', async (req, res) => {
        try {
            const data = {
                hours: req.query.hours,
                username: req.query.username
            }

            const result = await repository.allRequest(data)
            res.status(200).json(result)

        } catch (e) {
            res.status(400).send(e.message)
        }
    })

    app.get('/monitor-api/mean/all', async (req, res) => {
        try {
            const data = {
                days: req.query.days,
                username: req.query.username
            }

            const result = await repository.allMeanRequest(data)
            res.status(200).json(result)
        } catch (e) {
            console.log('index')
            console.log({e})
            res.status(400).send(e.message)
        }
    })


    app.post('/monitor-api/insert-data', async (req, res) => {
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
                
    CREATE CONTINUOUS QUERY cq_1h_2 ON ${dbName} 
    BEGIN
        SELECT mean("duration") AS "duration" INTO ${dbName}.${retentionPolicyTo}.mean_response_times_2 
        FROM ${dbName}.${retentionPolicyFrom}.response_times 
        GROUP BY time(1h), username, path 
    END

`

// const createMiddleware = () => (req, res, next) => {

//     const start = Date.now()
//     const wiMonitorUrl = 'http://localhost:3000/monitor-api/insert-data'

//     res.once('finish', async () => {
//         try {
//             const duration = Date.now() - start

//             const data = {
//                 username: req.decoded.username,
//                 originalUrl: req.originalUrl,
//                 duration,
//                 ip: req.ip,
//                 pid: process.pid
//             }
//             await axios.post(wiMonitorUrl, data)
//         } catch (err) {
//             console.error('Error saving data to InfluxDB!')
//             console.log(err)
//         } finally {
//             next()
//         }
//     })


// }


module.exports = {
    createApi,
    schema,
    createContinousQuery
    // createMiddleware
}