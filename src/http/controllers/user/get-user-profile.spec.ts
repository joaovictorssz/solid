import app from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request  from 'supertest'

describe('Get User Profile E2E', ()=>{


    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get user profile', async () => {
        // create an user

        await request(app.server).post('/register').send({
            email: 'johndoe@example.com',
            password: '123456',
            name: 'John Doe'
        })

        // get jwt by authentication

        const authResponse = await request(app.server).post('/auth').send({
            email: 'johndoe@example.com',
            password: '123456',
        })

        const token = authResponse.body.token

        // get profile

        const profileResponse = await request(app.server).get('/profile').set('Authorization', `Bearer ${token}`).send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body).toEqual(expect.objectContaining({
            email: expect.any(String)
        }))
    })
})