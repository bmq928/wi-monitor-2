const config = require('config')
const { InfluxDB, FieldType } = require('influx')
const sampleData = require('./sampleData.json')

const influxConfig = config.get('db.influx')

const repository = new InfluxDB({
    ...influxConfig,
    schema: [{
        measurement: 'response_time',
        tags: ['username', 'path'],
        fields: {
            duration: FieldType.INTEGER,
            ipaddr: FieldType.STRING,
            pid: FieldType.STRING
        }
    }]
})

run()

async function run() {
    try {
        const names = await repository.getDatabaseNames()
        const DB_NAME = influxConfig.database
        if (!names.includes(DB_NAME)) throw new Error('database is not exist')

        const insertableData = sampleData.map(data => {
            const measurement = 'response_time'
            const tags = {
                username: data.username,
                path: data.path
            }
            const fields = {
                duration: data.duration,
                ipaddr: data.ipaddr,
                pid: data.pid
            }

            // return { measurement, tags, fields }
        })
        
        await repository.writePoints(insertableData)
        console.log('seed success !!')
    } catch (e) {
        console.error(e.message)
    }
}