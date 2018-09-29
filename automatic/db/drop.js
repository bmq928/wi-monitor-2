const config = require('config')
const { InfluxDB, FieldType } = require('influx')
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
    await repository.dropDatabase(influxConfig.database)
    console.log('drop success')
}