import app from "@/app";

import { afterAll, beforeAll, expect, describe, it, vi } from "vitest";
import request from 'supertest'
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";


describe('Fetch User History E2E', () => {

    beforeAll(async ()=>{
        await app.ready()

        vi.useFakeTimers()
    })

    afterAll(async () => {
        await app.close()
        vi.useRealTimers()
    })
    
    it('should  be able to fetch user history', async () => {

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

        // create 3 checkIn
        for(let i = 1; i <=3; i++){
            vi.setSystemTime(new Date(2011, 0, i, 8, 0, 0))
            await request(app.server).post('/checkin/register').set('Authorization', `Bearer ${token}`).send({
                gymId: gymResponse.body.gym.id,
                userId: userResponse.id,
                userLatitude: -3.0321069,
                userLongitude: -60.0660148

        })
        }

        const response = await request(app.server).get(`/checkin/history?userId=${userResponse.id}&page=1`).set('Authorization', `Bearer ${token}`).send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.checkIns).toHaveLength(3)
    })
})