const { InfluxDB, FieldType } = require('influx')
const config = require('config')

const start = () => new Promise(async (resolve, reject) => {
    const influxConfig = config.get('db.influx')
    const influx = new InfluxDB({
        ...influxConfig,
        schema: [{
            measurement: 'response_time',
            tags: ['username', 'path'],
            fields: {
                duration: FieldType.INTEGER,
                ipadrr: FieldType.STRING,
                pid: FieldType.STRING
            }
        }]
    })


    try {
        const names = await influx.getDatabaseNames()
        const DB_NAME = influxConfig.database
        if (!names.includes(DB_NAME)) influx.createDatabase(DB_NAME)

        resolve(influx)
    } catch (e) {
        reject(e)
    }
})

module.exports = { start }