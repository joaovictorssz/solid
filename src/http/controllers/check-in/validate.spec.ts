import app from "@/app";

import { afterAll, beforeAll, expect, describe, it } from "vitest";
import request from 'supertest'
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";


describe('Validate CheckIn E2E', () => {

    beforeAll(async ()=>{
        await app.ready()


    })

    afterAll(async () => {
        await app.close()
    })
    
    it('should  be able to  validate a checkIn', async () => {

        // create user

        const userResponse = await prisma.user.create({
            data: {
                email: 'johndoe@example.com',
                name: 'John Doe',
                password_hash: await hash('123456', 6),
                role: 'ADMIN'
            }
        })


        // authenticate

        const authResponse = await request(app.server).post('/auth').send({
            email: 'johndoe@example.com',
            password: '123456'
        })

        const token = authResponse.body.token

        // create gym

        const gymResponse = await request(app.server).post('/gyms/register').set('Authorization', `Bearer ${token}`).send({
            title: 'New Gym',
            description: 'Gym created for E2E tests.',
            phone: '9999-9999',
            latitude: -3.0321069,
            longitude: -60.0660148
        })

        // create checkIn

        const checkInResponse = await request(app.server).post('/checkin/register').set('Authorization', `Bearer ${token}`).send({
            gymId: gymResponse.body.gym.id,
            userId: userResponse.id,
            userLatitude: -3.0321069,
            userLongitude: -60.0660148

        })

        const response = await request(app.server).post('/checkin/validate').set('Authorization', `Bearer ${token}`).send({
            checkInId: checkInResponse.body.id
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String)
        }))
    })
})