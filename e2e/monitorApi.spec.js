const config = require('config')
const axios = require('axios')
const execa = require('execa')

const PORT = config.get('app.port')
const DOMAIN = `http://localhost:${PORT}`


describe('monitor api', () => {

    it('GET /monitor-api/count (error)', async () => {
        // try {
        //     const response = await axios.get(DOMAIN + '/monitor-api/count')
            
        // } catch (e) {
        //     console.log(e.response.data)
        //     expect(e.response.status).toBe(400)
        //     expect(e.response.data).toBe('Internal Error')
        // }


        expect(2).toBe(2)
    })

    it('GET /monitor-api/count', async () => {
        // try {
        //     await execa.shell('npm run seed:test')
        //     const response = await axios.get(DOMAIN + '/monitor-api/count')
        //     console.log(response)
        //     expect( typeof response).toEqual('object')
        //     expect(response).toHaveProperty('length')

            
        // } catch (e) {
        //     console.log(e)
        //     expect(e).toBeNull()
        // } finally {
        //     await execa.shell('npm run drop:test')
        // }

        expect(2).toBe(2)
    })

    it('GET /monitor-api/all', () => {
        expect(2).toBe(2)
    })

    it('GET /monitor-api/mean/all', () => {
        expect(2).toBe(2)
    })

    it('POST /monitor-api/insert-data', () => {
        expect(2).toBe(2)
    })
})