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

const createApi = (app, db) => new Promise((resolve, reject) => {
    app.get('/monitor-process', (req, res) => {
        res.send('something')
    })

    resolve()
})

const createMiddleware = () => {

}



module.exports = { 
    createApi,
    schema
}