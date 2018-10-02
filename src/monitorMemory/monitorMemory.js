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

    const allRequest = time => new Promise(async (resolve, reject) => {

    })

    const meanRequest = time => new Promise(async (resolve, reject) => {

    })

    return {
        insertData,
        allRequest,
        meanRequest
    }
}

module.exports = {
    createRepository
}