const execa = require('execa')

const poll = () => new Promise(async (resolve, reject) => {

    try {
        const { stdout } = await execa.shell('free -m')
        const memInfo = stdout.split('\n')[1]
        const preProcessMem = memInfo.replace(/(\s)+/g, ' ')
        const [_, total, used, free, shared, buff, available] = preProcessMem.split(' ')
        
        const result = {
            total: parseFloat(total),
            used : parseFloat(used),
            free: parseFloat(free),
            shared: parseFloat(shared),
            buff: parseFloat(buff),
            available: parseFloat(available)
        }

        resolve(result)
        
    } catch (e) {
        reject(e)
    }
})

poll()

module.exports = {
    poll
}