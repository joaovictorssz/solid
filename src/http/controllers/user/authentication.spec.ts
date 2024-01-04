import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import app from '@/app'

describe('Authentication Controler E2E', ()=>{

    beforeAll(async ()=>{
        await app.ready()

         // create an user
         await request(app.server).post('/register').send({
            email: 'johndoe@example.com',
            name: 'John Doe',
            password: '123456'
        })
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate', async () => {

        const response = await request(app.server).post('/auth').send({
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(response.statusCode).toEqual(200)
    })

    it('should not be able to authenticate with invalid credentials', async () => {
        const response = await request(app.server).post('/auth').send({
            email: 'johndoe@example.com',
            password: 'invalid-password'
        })

        expect(response.statusCode).toEqual(401)
        expect(response.body.message).toBe('Invalid credentials.')

        
    })
})