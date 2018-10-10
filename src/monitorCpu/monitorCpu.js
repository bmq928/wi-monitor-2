const { convertTime } = require('../utils')

const createRepository = (db, measurementName) => {
    const insertData = data => new Promise(async (resolve, reject) => {
        const { domain, serverName, cpuUsage } = data

        if (!domain) return reject(new Error('domain is required'))
        if (!serverName) return reject(new Error('path is required'))
        if (!cpuUsage) return reject(new Error('cpuUsage is required'))

        try {
            await db.influxDB.writePoints([{
                measurement: measurementName,
                tags: {
                    domain,
                    serverName
                },
                fields: {
                    cpuUsage
                },
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

            //if (!formatResult || !formatResult.length) throw new Error('Internal Error')
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
            const queryMax = `SELECT * FROM three_months.max_cpu_usage WHERE 1=1 ${whereClause}`
            // query for max cpu usage
            const queryMin = `SELECT * FROM three_months.min_cpu_usage WHERE 1=1 ${whereClause}`
            console.log(queryMax)
            // raw data
            const result = await Promise.all([
                db.influxDB.query(queryMax),
                db.influxDB.query(queryMin)
            ])
            // console.log(result)
            // const [max, min] = result.map(async i => await convertTime(i))
            const [max, min] = await Promise.all(result.map(i => convertTime(i)))
            
            //min is not neccessary
            //if max is null, min is null
            // if(!max || !max.length) throw new Error('Internal Error')

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