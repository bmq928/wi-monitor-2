const moment = require('moment-timezone')

//copy function
//for converting time when query from influx
const convertTime = (objectArray) => new Promise((resolve, reject) => {
    objectArray.forEach(object => {
        object.time = moment(object.time.getTime())
            .tz('Asia/Ho_Chi_Minh')
            .format('YYYY/MM/DD HH:mm:ss.SSSS')
    })
    resolve(objectArray)
})


const createRepository = (db, measurementName) => {


    const countRequest = () => new Promise(async (resolve, reject) => {
        try {
            const result = await db.influxDB.query(`select count(*) from ${measurementName}`)
            resolve(result)
        } catch (e) {
            reject(e)
        }
    })

    const insertData = (data) => new Promise(async (resolve, reject) => {
        const {
            username,
            originalUrl,
            duration,
            ipaddr,
            pid
        } = data


        if (!username) return reject(new Error('username is required'))
        if (!originalUrl) return reject(new Error('originalUrl is required'))
        if (!duration) return reject(new Error('duration is required'))
        // if (!ipaddr) return reject(new Error('ip is required'))
        if (!pid) return reject(new Error('pid is required'))

        try {
            await db.influxDB.writePoints([{
                measurement: measurementName,
                tags: {
                    username,
                    path: originalUrl
                },
                fields: {
                    duration,
                    ipaddr,
                    pid
                },
            }])

            resolve()
        } catch (e) {
            reject(e)
        }
    })


    const allRequest = data => new Promise(async (resolve, reject) => {
        const hours = data.hours || 1
        const { username } = data

        let whereClause = ''

        if (username) whereClause += ` AND username = '${username}'`
        whereClause += ` AND time > now() - ${hours}h`


        try {
            const query = `SELECT * FROM ${measurementName} WHERE 1=1 ${whereClause}`
            const result = await db.influxDB.query(query)
            const formatResult = await convertTime(result)

            if(!formatResult || !formatResult.length) throw new Error('Internal Error')
            resolve(formatResult)
        } catch (e) {
            reject(e)
        }
    })

    const allMeanRequest = data => new Promise(async (resolve, reject) => {
        const days = data.days || 1
        const { username } = data

        let whereClause = ''
        if (username) whereClause += ` AND username = '${username}'`
        whereClause += ` AND time > now() - ${days}d`


        try {
            const query = `SELECT * FROM three_months.mean_response_times_2 WHERE 1=1 ${whereClause}`
            const result = await db.influxDB.query(query)
            const formatResult = await convertTime(result)

            if(!formatResult || !formatResult.length) throw new Error('Internal Error')
            resolve(formatResult)

        } catch (e) {
            reject(e)
        }
    })

    return {
        countRequest,
        insertData,
        allRequest,
        allMeanRequest
    }
}

module.exports = {
    createRepository
}