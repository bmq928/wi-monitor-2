const { FieldType } = require('influx')
const monitorProcess = require('./monitorProcess')

const schema = {
    measurement: 'process',
    tags: ['command','location', 'path'],
    fields: {
        cpu: FieldType.FLOAT,
        count: FieldType.INTEGER,
        memory: FieldType.STRING
    }
}

const createApi = (app, db) => new Promise( async (resolve, reject) => {

    const repository = await monitorProcess.createRepository(db)

    app.get('/monitor-process/all', async (req, res) => {

    })

    app.get('/monitor-process/mean/all', async (req, res) => {

    })

    app.post('monitor-process/insert-data', async (req, res) => {
        
    })

    resolve()
})



module.exports = { 
    createApi,
    schema
}