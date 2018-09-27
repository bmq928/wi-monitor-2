const os = require('os-utils')

const poll = () => new Promise((resolve, reject) => {
    os.cpuUsage(v => resolve(v))
})

module.exports = {
    poll
}