const { convertTime } = require('../utils')

const createRepository = (db, measurementName) => {
    const insertData = data => new Promise(async (resolve, reject) => {
        const {
            total,
            used,
            free,
            shared,
            buff,
            available,
            domain,
            serverName
        } = data

        if (!total) return reject(new Error('total is required'))
        if (!used) return reject(new Error('used is required'))
        if (!free) return reject(new Error('free is required'))
        if (!shared) return reject(new Error('shared is required'))
        if (!buff) return reject(new Error('buff is required'))
        if (!available) return reject(new Error('available is required'))
        if (!domain) return reject(new Error('domain is required'))
        if (!serverName) return reject(new Error('serverName is required'))

        try {

            await db.influxDB.writePoints([{
                measurement: measurementName,
                tags: {
                    domain,
                    serverName
                },
                fields: {
                    total,
                    used,
                    free,
                    shared,
                    buff,
                    available
                }
            }])

            resolve()
        } catch (e) {
            reject(e)
        }
    })

    const allDataInTime = data => new Promise(async (resolve, reject) => {
        const hours = data.hours || 1
        const { domain } = data

        let whereClause = ''

        if (domain) whereClause += ` AND domain = ${domain}`
        whereClause += ` AND time > now() - ${hours}h`

        try {
            const query = `SELECT * FROM ${measurementName} WHERE 1=1 ${whereClause}`
            const result = await db.influxDB.query(query)
            const formatResult = await convertTime(result)

            if (!formatResult || !formatResult.length) throw new Error('Internal Error')
            resolve(formatResult)

        } catch (e) {
            reject(e)
        }
    })

    const minMaxUsage = data => new Promise(async (resolve, reject) => {
        const days = data.days || 1
        const { domain } = data

        let whereClause = ''
        if (domain) whereClause += ` AND domain = ${domain}`
        whereClause += ` AND time > now() - ${days}d`

        try {
            // query for max cpu usage
            const queryMax = `SELECT * FROM three_months.max_memory_usage WHERE 1=1 ${whereClause}`
            // query for max cpu usage
            const queryMin = `SELECT * FROM three_months.min_memory_usage WHERE 1=1 ${whereClause}`

            // raw data
            const result = await Promise.all([
                db.influxDB.query(queryMax),
                db.influxDB.query(queryMin)
            ])

            const [max, min] = result.map(async i => await convertTime(i))

            //min is not neccessary
            //if max is null, min is null
            if (!max || !max.length) throw new Error('Internal Error')

            resolve({ max, min })
        } catch (e) {
            reject(e)
        }
    })

    return {
        insertData,
        allDataInTime,
        minMaxUsage
    }
}

module.exports = {
    createRepository
}