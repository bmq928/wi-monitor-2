const {poll} = require('./monitorProcess')


describe('Memory Monitor', () => {

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
})