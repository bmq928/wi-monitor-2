const execa = require('execa')
const {poll} = require('./monitorMemory')


jest.mock('execa')
describe('Memory Monitor', () => {

    beforeEach(() => {
        jest.mock('execa')
        const simulatedOutput = (
`total        used        free      shared  buff/cache   available
Mem:           3873        2442         478         341   953         848
Swap:          1229         165        1063`)
        execa.shell.mockResolvedValue(Promise.resolve({stdout:simulatedOutput}))
    })

    it('value should be an object and have total, used, free, shared, buff, cache, available property', async () => {
        const result = await poll()

        expect(typeof result).toEqual('object')
        expect(result).toHaveProperty('total')
        expect(result).toHaveProperty('used')
        expect(result).toHaveProperty('free')
        expect(result).toHaveProperty('shared')
        expect(result).toHaveProperty('buff')
        expect(result).toHaveProperty('available')
    })
    
    it('value of property should be number', async () => {
        const {total, used, free, shared,buff, available} = await poll()

        expect(typeof total).toEqual('number')
        expect(typeof used).toEqual('number')
        expect(typeof free).toEqual('number')
        expect(typeof shared).toEqual('number')
        expect(typeof buff).toEqual('number')
        expect(typeof available).toEqual('number')
    })

    it('check correct value', async () => {
        const result = await poll()
        expect(result).toEqual({ 
            total: 3873,
            used: 2442,
            free: 478,
            shared: 341,
            buff: 953,
            available: 848 })
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })
})