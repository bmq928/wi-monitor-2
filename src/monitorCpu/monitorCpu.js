const os = require('os-utils')

const poll = () => new Promise((resolve, reject) => {
    os.cpuUsage(num => resolve({
        cpuUsage: num
    }))
})

module.exports = {
    poll
}