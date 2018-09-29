describe('Monitor API', () => {
    it('nothing', () => {
        expect(2).toBe(2)
    })
})
// const config = require('config')
// const execa = require('execa')
// const database = require('../database')
// const monitorApi = require('./monitorApi')
// const measurementName = 'response_time'
// const schema = require('./index').schema

// let db
// let repository



// describe('Api Monitor', () => {
//     beforeAll(async () => {
//         db = await database.init(schema)
//         repository = await monitorApi.createRepository(db, 'response_time')
//         await insertSampleData(db)
//     }, 9000)

//     afterAll(async () => {
//         const dbName = config.get('db.influx.database')
//         await db.query(`drop database '${dbName}'`)
//     }, 9000)

//     it('db test is available', async () => {
//         const data = await db.query(`select * from ${measurementName}`)
//         expect(data).not.toBeNull()
//     })

    
// })


// function createSampleData() {

//     return [
//         {
//             'time': '2018/09/29 09:55:53.8300',
//             'duration': 461,
//             'ipaddr': '::ffff:127.0.0.1',
//             'path': '/project/list',
//             'pid': '13449',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:55:57.6130',
//             'duration': 118,
//             'ipaddr': null,
//             'path': '/project/fullinfo',
//             'pid': '13306',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:55:58.6460',
//             'duration': 189,
//             'ipaddr': null,
//             'path': '/family/list',
//             'pid': '13506',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:55:59.2880',
//             'duration': 178,
//             'ipaddr': null,
//             'path': '/pattern/list',
//             'pid': '13384',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:55:59.6270',
//             'duration': 10,
//             'ipaddr': null,
//             'path': '/task-spec/list',
//             'pid': '13526',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:00.0700',
//             'duration': 61,
//             'ipaddr': null,
//             'path': '/family/all-unit',
//             'pid': '13333',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:00.1190',
//             'duration': 47,
//             'ipaddr': null,
//             'path': '/family/all-unit',
//             'pid': '13333',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:32.9760',
//             'duration': 81,
//             'ipaddr': null,
//             'path': '/pal/all',
//             'pid': '13271',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:33.3530',
//             'duration': 89,
//             'ipaddr': null,
//             'path': '/project/plot/info',
//             'pid': '13401',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:33.5380',
//             'duration': 18,
//             'ipaddr': null,
//             'path': '/project/plot/track/info',
//             'pid': '13526',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:33.8250',
//             'duration': 8,
//             'ipaddr': '::1',
//             'path': '/project/plot/edit',
//             'pid': '13271',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:34.1740',
//             'duration': 539,
//             'ipaddr': null,
//             'path': '/project/well/dataset/curve/getData',
//             'pid': '13384',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:34.3750',
//             'duration': 550,
//             'ipaddr': null,
//             'path': '/project/well/dataset/curve/getData',
//             'pid': '13281',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:34.3770',
//             'duration': 551,
//             'ipaddr': null,
//             'path': '/project/well/dataset/curve/getData',
//             'pid': '13281',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:35.1030',
//             'duration': 517,
//             'ipaddr': '::1',
//             'path': '/project/well/dataset/curve/info',
//             'pid': '13506',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:35.7040',
//             'duration': 514,
//             'ipaddr': '::1',
//             'path': '/project/well/dataset/curve/info',
//             'pid': '13401',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:36.1810',
//             'duration': 7,
//             'ipaddr': '::ffff:127.0.0.1',
//             'path': '/project/plot/edit',
//             'pid': '13306',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:36.4950',
//             'duration': 512,
//             'ipaddr': '::ffff:127.0.0.1',
//             'path': '/project/well/dataset/curve/info',
//             'pid': '13465',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:38.6750',
//             'duration': 5,
//             'ipaddr': '::ffff:127.0.0.1',
//             'path': '/project/plot/edit',
//             'pid': '13364',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:45.5560',
//             'duration': 3,
//             'ipaddr': '::ffff:127.0.0.1',
//             'path': '/project/info',
//             'pid': '13560',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:56:45.6770',
//             'duration': 11,
//             'ipaddr': '::1',
//             'path': '/project/well/zone-set/list',
//             'pid': '13560',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:57:20.6110',
//             'duration': 3,
//             'ipaddr': '::1',
//             'path': '/project/info',
//             'pid': '13364',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 09:57:20.7080',
//             'duration': 24,
//             'ipaddr': '::1',
//             'path': '/project/well/zone-set/list',
//             'pid': '13449',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 10:03:34.9170',
//             'duration': 5,
//             'ipaddr': '::1',
//             'path': '/project/plot/edit',
//             'pid': '13465',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 10:03:35.0620',
//             'duration': 10,
//             'ipaddr': null,
//             'path': '/family/list-unit',
//             'pid': '13449',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 10:03:43.2270',
//             'duration': 521,
//             'ipaddr': '::1',
//             'path': '/project/well/dataset/curve/info',
//             'pid': '13306',
//             'username': 'tkvmai'
//         },
//         {
//             'time': '2018/09/29 10:03:44.0520',
//             'duration': 545,
//             'ipaddr': null,
//             'path': '/project/well/dataset/curve/getData',
//             'pid': '13506',
//             'username': 'tkvmai'
//         }
//     ]
// }

// function insertSampleData(db) {
//     return new Promise( async (resolve, reject) => {
//         const rawData = createSampleData()
//         const data = rawData.map(e => ({ ...e, measurement: measurementName }))
//         await db.writePoints(data)
//         resolve()
//     })
// }