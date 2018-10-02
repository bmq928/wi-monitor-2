const { convertTime } = require('../utils')

const createRepository = (db, measurementName) => {
    const insertData = data => new Promise(async (resolve, reject) => {
        const {
            command,
            serverName,
            domain,
            cpu,
            count,
            memory
        } = data

        if (!domain) return reject(new Error('domain is required'))
        if (!serverName) return reject(new Error('path is required'))
        if (!command) return reject(new Error('command is required'))
        if (!cpu) return reject(new Error('cpu is required'))
        if (!count) return reject(new Error('count is required'))
        if (!memory) return reject(new Error('memory is required'))

        try {

            await db.influxDB.writePoints([{
                measurement: measurementName,
                tags: {
                    domain,
                    serverName,
                    command
                },
                fields: {
                    cpu,
                    count,
                    memory
                },
            }])

            resolve()
        } catch (e) {
            reject(e)
        }
    })

    const allProcessInTime = data => new Promise(async (resolve, reject) => {

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

    const countMinMax = data => new Promise(async (resolve, reject) => {
        const days = data.days || 1
        const { domain } = data

        let whereClause = ''
        if (domain) whereClause += ` AND domain = ${domain}`
        whereClause += ` AND time > now() - ${days}d`

        try {
            // query for max cpu usage
            const queryMax = `SELECT * FROM three_months.max_process_count WHERE 1=1 ${whereClause}`
            // query for max cpu usage
            const queryMin = `SELECT * FROM three_months.min_process_count WHERE 1=1 ${whereClause}`

            // raw data
            const result = await Promise.all([
                db.influxDB.query(queryMax),
                db.influxDB.query(queryMin)
            ])

            const [max, min] = result.map(async i => await convertTime(i))

            //min is not neccessary
            //if max is null, min is null
            if(!max || !max.length) throw new Error('Internal Error')

            resolve({ max, min })
        } catch (e) {
            reject(e)
        }
    })

    const cpuMinMax = data => new Promise(async (resolve, reject) => {
        const days = data.days || 1
        const { domain } = data

        let whereClause = ''
        if (domain) whereClause += ` AND domain = ${domain}`
        whereClause += ` AND time > now() - ${days}d`

        try {
            // query for max cpu usage
            const queryMax = `SELECT * FROM three_months.max_process_cpu WHERE 1=1 ${whereClause}`
            // query for max cpu usage
            const queryMin = `SELECT * FROM three_months.min_process_cpu WHERE 1=1 ${whereClause}`

            // raw data
            const result = await Promise.all([
                db.influxDB.query(queryMax),
                db.influxDB.query(queryMin)
            ])

            const [max, min] = result.map(async i => await convertTime(i))

            //min is not neccessary
            //if max is null, min is null
            if(!max || !max.length) throw new Error('Internal Error')

            resolve({ max, min })
        } catch (e) {
            reject(e)
        }
    })

    return {
        insertData,
        allProcessInTime,
        countMinMax,
        cpuMinMax
    }
}

module.exports = {
    createRepository
}