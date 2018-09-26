// const execa = require('execa')

// const poll = async () => {
//     try {
//         const { stdout } = await execa.shell('ps -ewwwo %cpu,%mem,comm')
//         const lines = stdout.split('\n')
//         // console.log(lines)

//         return {
//             cpu: [],
//             count: [],
//             memory: [],
//             command: []
//         }

//     } catch (e) {
//         console.error(e)
//     }
// }

// poll()

// module.exports = {
//     poll
// }