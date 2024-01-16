import app from "@/app";

import { afterAll, beforeAll, expect, describe, it } from "vitest";
import request from 'supertest'
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";


describe('Register Gym E2E', () => {

    beforeAll(async ()=>{
        await app.ready()


    })

    afterAll(async () => {
        await app.close()
    })
    
    it('should  be able to  register a gym', async () => {

        // create user

        await prisma.user.create({
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

        const response = await request(app.server).post('/gyms/register').set('Authorization', `Bearer ${token}`).send({
            title: 'New Gym',
            description: 'Gym created for E2E tests.',
            phone: '9999-9999',
            latitude: 1.0000,
            longitude: 1.0000
        })

        expect(response.statusCode).toEqual(201)
        expect(response.body.gym).toEqual(expect.objectContaining({
            id: expect.any(String)
        }))
    })
})