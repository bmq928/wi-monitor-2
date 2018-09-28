const { FieldType } = require('influx')
const monitorApi = require('./monitorApi')

const schema = {
    measurement: 'response_time',
    tags: ['username', 'path'],
    fields: {
        duration: FieldType.INTEGER,
        ipadrr: FieldType.STRING,
        pid: FieldType.STRING
    }
}

const createApi = (app, db) => new Promise((resolve, reject) => {
    app.get('/monitor-api', async (req, res) => {

    })


    resolve()
})



module.exports = {
    createApi,
    schema
}