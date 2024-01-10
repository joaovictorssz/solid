import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import app from '@/app'

describe('Refresh Token Controler E2E', ()=>{

    beforeAll(async ()=>{
        await app.ready()


    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to refresh token', async () => {

        // create an user
        await request(app.server).post('/register').send({
            email: 'johndoe@example.com',
            name: 'John Doe',
            password: '123456'
        })

        const authResponse = await request(app.server).post('/auth').send({
            email: 'johndoe@example.com',
            password: '123456'
        })

        const cookies = authResponse.get('Set-Cookie')

        const response = await request(app.server).patch('/token/refresh').set('Cookie', cookies).send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    })

})