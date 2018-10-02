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

module.exports = convertTime