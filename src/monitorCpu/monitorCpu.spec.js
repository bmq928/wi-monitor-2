const os = require('os-utils')
const {poll} = require('./monitorCpu')

jest.mock('os-utils')

describe('Monitor Cpu', () => {

    beforeEach(() => {
        os.cpuUsage = jest.fn(cb => {
            cb(0.03)
        })
    })

    it('cpu usage should be between 0 and 1', async () => {
        const result = await poll()

        expect(result).toBeLessThan(1)
        expect(result).toBeGreaterThan(0)
    })

    afterEach(() => {
        jest.resetAllMocks()
    })
})