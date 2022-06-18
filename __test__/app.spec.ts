import supertest from 'supertest'

import app from '../src/app'

describe('App', () => {
    const request = supertest(app.callback())
    it('should return true for health endpoint', async () => {
        const response = await request.get('/v1/health')
        
        expect(response.text).toEqual('true')
    })
})