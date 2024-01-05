import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import app from '@/app'

describe('Authentication Controler E2E', ()=>{

    beforeAll(async ()=>{
        await app.ready()


    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate', async () => {

        // create an user
        await request(app.server).post('/register').send({
            email: 'johndoe@example.com',
            name: 'John Doe',
            password: '123456'
        })

        const response = await request(app.server).post('/auth').send({
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })

})