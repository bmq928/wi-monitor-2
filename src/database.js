const influxDB = require('./influxDB')

const connect = config => new Promise(async (resolve, reject) => {
    try {
        const [_influxDB] = await Promise.all([
            influxDB.connect(config.influxDB)
        ])

        resolve({
            influxDB: _influxDB
        })
    } catch (e) {
        reject(e)
    }
})

module.exports = { connect }