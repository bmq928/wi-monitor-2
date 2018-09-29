const { InfluxDB, FieldType } = require('influx')
const config = require('config')

const init = ({schemas, contiousQueries}) => new Promise(async (resolve, reject) => {
    const influxConfig = config.get('db.influx')

    const repository = new InfluxDB({
        ...influxConfig,
        schema: [...schemas]
    })


    try {
        const names = await repository.getDatabaseNames()
        const DB_NAME = influxConfig.database
        if (!names.includes(DB_NAME)) {
            repository.createDatabase(DB_NAME)


            //create retention policies
            // 1 day defalut
            await repository.query(`
            
                CREATE RETENTION POLICY "one_day"
                ON "${DB_NAME}"
                DURATION 1d
                REPLICATION 1
                DEFAULT 

            `)

            

            // //3 months for statisting mean, max, min, ... of a day, etc
            await repository.query(`
            
                CREATE RETENTION POLICY "three_months"
                ON "${DB_NAME}"
                DURATION 12w
                REPLICATION 1
            
            `)

            //create Continuous Queries
            //like cron job 
            //caculate mean of request per hour
            //and insert to wi_backend.three_months.mean_response_times_2 
            await Promise.all(contiousQueries.map(createQuery => {
                return repository.query(createQuery(DB_NAME, 'one_day', 'three_months'))
            }))
        }


        

        resolve(repository)
    } catch (e) {
        reject(e)
    }
})

module.exports = { init }