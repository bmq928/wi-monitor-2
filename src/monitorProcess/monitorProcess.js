const execa = require('execa')

const poll = () => new Promise(async (resolve, reject) => {
    try {
        const { stdout } = await execa.shell('ps -ewwwo %cpu,%mem,comm')
        const [_, ...lines] = stdout.split('\n')
        const initialVal = {
            cpu: [],
            count: [],
            memory: [],
            command: []
        }
        // console.log(lines)

        const result = lines
            .map(l => {

                // remove unecessary symbol
                const line = l.trim().replace('  ', ' ')
                const [cpu, memory, ...commandSplited] = line.split(' ')
                const command = commandSplited.join(' ')
                const count = 1

                return [cpu, memory, command, count]
            })
            .filter((val, i, arr) => {

                // have same command value
                const preElementIndex = arr.findIndex(el => el[2] === val[2])

                //this element is the first element
                if (preElementIndex === i) return true

                // increase count
                ++arr[preElementIndex][3]
                return false

            })
            .reduce((acc, cur) => {

                
                const [cpu, memory, command, count] = cur

                acc.cpu.push(parseFloat(cpu))
                acc.count.push(count)
                acc.memory.push(parseFloat(memory))
                acc.command.push(command)

                return acc
            }, initialVal)

        // caculating the count of command
        // remove duplicated command




        // console.log(result)

        resolve(result)

    } catch (e) {
        reject(e)
    }
})

// poll()

module.exports = {
    poll
}