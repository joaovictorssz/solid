import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { CheckInService } from "./check-in-service";
import { afterEach,describe, beforeEach, expect, it, vi } from "vitest";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "../errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "../errors/max-number-of-check-ins";



let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepository
let sut : CheckInService

describe('Check In Service', () => {

    beforeEach(()=>{
        checkInRepository = new InMemoryCheckInRepository()
        gymRepository = new InMemoryGymRepository()
        sut = new CheckInService(checkInRepository, gymRepository)

        vi.useFakeTimers()

        gymRepository.create({
            description: '',
            id: 'gym-1',
            latitude: new Decimal(-2.924596),
            longitude: new Decimal(-59.9880413),
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
            userLatitude: -2.924596,           
            userLongitude:-59.9880413
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    it('should not be able to check in twice in a day', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await sut.create({
            gymId: 'gym-1',
            userId: 'user-1',
            userLatitude: -2.924596,
            userLongitude:-59.9880413
        })


        await expect(async ()=>{
            await sut.create({
                gymId: 'gym-1',
                userId: 'user-1',
                userLatitude: -2.924596,
                userLongitude:-59.9880413
            })
        }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
        

    })

    it('should be able to chek in at different days', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await sut.create({
            gymId: 'gym-1',
            userId: 'user-1',
            userLatitude: -2.924596,
            userLongitude:-59.9880413
        })

        vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.create({
            gymId: 'gym-1',
            userId: 'user-1',
            userLatitude: -2.924596,
            userLongitude:-59.9880413
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
    it('should not be able to chek in distant gyms', async () => {
        gymRepository.create({
            description: '',
            id: 'gym-2',
            latitude: new Decimal(-3.0254215),
            longitude: new Decimal(-60.0606504),
            phone: '',
            title: 'Gym'
        })

        await expect(async ()=>{
            await sut.create({
                gymId: 'gym-2',
                userId: 'user-1',
                userLatitude: -2.924596,
                userLongitude:-59.98804139
            })
        }).rejects.toBeInstanceOf(MaxDistanceError)
    })

})