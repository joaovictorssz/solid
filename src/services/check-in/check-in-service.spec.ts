import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { CheckInService } from "./check-in-service";
import { afterEach,describe, beforeEach, expect, it, vi } from "vitest";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";



let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepository
let sut : CheckInService

describe('Check In Service', () => {

    beforeEach(()=>{
        checkInRepository = new InMemoryCheckInRepository()
        gymRepository = new InMemoryGymRepository()
        sut = new CheckInService(checkInRepository, gymRepository)

        vi.useFakeTimers()

        gymRepository.gyms.push({
            description: '',
            id: 'gym-1',
            latitude: new Decimal(123),
            longitude: new Decimal(123),
            phone: '',
            title: 'Gym'
        })
    })

    afterEach(()=>{
        vi.useRealTimers()
    })

    it('should register a new check-in', async () => {

        const {checkIn} = await sut.create({
            gymId: 'gym-1',
            userId: 'gym-1',
            userLatitude: 123,
            userLongitude:123
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    it('should not be able to check in twice in a day', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await sut.create({
            gymId: 'gym-1',
            userId: 'user-1',
            userLatitude: 123,
            userLongitude:123
        })


        await expect(async ()=>{
            await sut.create({
                gymId: 'gym-1',
                userId: 'user-1',
                userLatitude: 123,
                userLongitude:123
            })
        }).rejects.toBeInstanceOf(Error)
        

    })

    it('should be able to chek in at different days', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await sut.create({
            gymId: 'gym-1',
            userId: 'user-1',
            userLatitude: 123,
            userLongitude:123
        })

        vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.create({
            gymId: 'gym-1',
            userId: 'user-1',
            userLatitude: 123,
            userLongitude:123
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

})