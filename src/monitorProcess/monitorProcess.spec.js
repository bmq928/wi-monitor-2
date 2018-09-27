const execa = require('execa')
const {poll} = require('./monitorProcess')


jest.mock('execa')
describe('Memory Monitor', () => {

    beforeEach(() => {
        jest.mock('execa')
        const simulatedOutput = (
        `%CPU %MEM COMMAND
0.2  0.2 a
0.0  0.0 a
0.0  0.0 a
0.0  0.0 a
0.0  0.0 a
0.0  0.0 a
0.0  0.0 a
0.0  0.0 b
0.0  0.0 b
0.0  0.0 c
0.0  0.0 d
0.0  0.0 d`)
        execa.shell.mockResolvedValue(Promise.resolve({stdout:simulatedOutput}))
    })

    it('value should be object and have %CPU %MEM Command Count', async () => {
        const result = await poll()        

        expect(typeof result).toBe('object')
        expect(result).toHaveProperty('cpu')
        expect(result).toHaveProperty('memory')
        expect(result).toHaveProperty('command')
        expect(result).toHaveProperty('count')
    })

    it('all value in attribute should be an array and have same length', async () => {
        const result = await poll()        
        const listCpuVal = result.cpu
        const listMemVal = result.memory
        const listCommandVal = result.command
        const listCountVal = result.count

        expect(listCpuVal).toHaveProperty('length')
        expect(listCommandVal).toHaveProperty('length')
        expect(listMemVal).toHaveProperty('length')
        expect(listCountVal).toHaveProperty('length')

        expect(listCommandVal.length).toEqual(listCpuVal.length)
        expect(listCommandVal.length).toEqual(listCpuVal.length)
        expect(listCommandVal.length).toEqual(listCountVal.length)
    })

    it('cannot have a zero-element-array', async () => {
        const result = await poll()
        const listCpuVal = result.cpu

        expect(listCpuVal.length).not.toEqual(0)
    })

    it('check correct value', async () => {
        const result = await poll()

        expect(result).toEqual({
            cpu: [0.2,0,0,0],
            count: [7,2,1,2],
            memory: [0.2,0,0,0],
            command: ['a','b','c','d']
        })

    })

    afterEach(() => {
        jest.resetAllMocks()
    })
})