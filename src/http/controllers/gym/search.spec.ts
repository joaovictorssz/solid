import app from "@/app";

import { expect, describe, it, beforeAll, afterAll } from "vitest";
import request from 'supertest'

describe('Search Gyms Test E2E', () => {
    
    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get gyms by query', async () => {
        // create user

        await request(app.server).post('/register').send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        // authenticate

        const authResponse = await request(app.server).post('/auth').send({
            email: 'johndoe@example.com',
            password: '123456'
        })

        const token = authResponse.body.token

        // create some gyms

        for(let i = 1; i <= 2; i++){
            await request(app.server).post('/gyms/register').set('Authorization', `Bearer ${token}`).send({
                title: 'Gym ', i,
                description: `This is the ${i}st Gym`,
                phone: '99999-9999',
                latitude: 1.00000,
                longitude: 1.00000
            })
        }

        const response =  await request(app.server).get('/gyms/search?query=ym&page=1').set('Authorization', `Bearer ${token}`).send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveLength(2)
        
    })
})
    