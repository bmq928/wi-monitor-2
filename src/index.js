const http = require('http')
const config = require('config')

const server = require('./server')
const database = require('./database')

const monitorApi = require('./monitorApi')
const monitorCpu = require('./monitorCpu')
const monitorMemory = require('./monitorMemory')
const monitorProcess = require('./monitorProcess')

process.on('uncaughtException', err => {
    console.error(err)
})

process.on('unhandledRejection', err => {
    console.error(err)
})

main()

async function main() {

    try {
        
        const db = await database.start()
        const app = await server.start()
        
        await monitorApi.createApi(app, db)
        await monitorCpu.createApi(app, db)
        await monitorMemory.createApi(app, db)
        await monitorProcess.createApi(app, db)
        
        startServer(app)
        

    } catch (e) {
        console.error(e)
    }

}

function startServer(app) {
    
    const PORT = config.get('app.port')

    http.createServer(app).listen(PORT, () => console.log(`server is started in port ${PORT}`))
}