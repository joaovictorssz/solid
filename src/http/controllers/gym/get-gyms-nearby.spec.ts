import app from "@/app";

import { expect, describe, it, beforeAll, afterAll } from "vitest";
import request from 'supertest'

describe('Get Gyms Nearby Test E2E', () => {
    
    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get gyms by user location', async () => {
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

        await request(app.server).post('/gyms/register').set('Authorization', `Bearer ${token}`).send({
            title: 'Nearby Gym 1',
            description: `This is the 1st Gym`,
            phone: '99999-9999',
            latitude: -3.0145817,
            longitude: -60.0377899
        })

        await request(app.server).post('/gyms/register').set('Authorization', `Bearer ${token}`).send({
            title: 'Nearby Gym 2',
            description: `This is the 1st Gym`,
            phone: '99999-9999',
            latitude: -3.0147639,
            longitude: -60.0376826
        })

        await request(app.server).post('/gyms/register').set('Authorization', `Bearer ${token}`).send({
            title: 'Far Gym 1',
            description: `This is the 1st Gym`,
            phone: '99999-9999',
            latitude: -5.7286469,
            longitude: -59.4274426
        })

        const response =  await request(app.server).post('/gyms/nearby').set('Authorization', `Bearer ${token}`).send({
            userLatitude: -3.0144933,
            userLongitude: -60.0402307
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveLength(2)
        
    })
})
    