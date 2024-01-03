import { afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { ValidateCheckInService } from "./validate-check-in-service";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { LateValidationCheckInError } from "@/services/errors/late-validation-check-in-error";

let checkInRepository: InMemoryCheckInRepository
let sut : ValidateCheckInService


describe('Validate CheckIn Service', ()=>{

    beforeEach(()=>{
        checkInRepository = new InMemoryCheckInRepository()
        sut = new ValidateCheckInService(checkInRepository)

        vi.useFakeTimers()
        
    })

    afterEach(()=>{
        vi.useRealTimers()
    })

    it('should validate a check-in', async ()=>{
        
        // create an user

        vi.setSystemTime(new Date())

        const checkIn = await checkInRepository.create({
            gymId: 'gym-01',
            userId: 'user-01'
        })


        const validatedCheckIn = await sut.validate({checkInId: checkIn.id})

        expect(validatedCheckIn.checkIn.validatedAt).toEqual(expect.any(Date))
        expect(checkInRepository.checkIns[0].validatedAt).toEqual(expect.any(Date))


    })

    it('should not validate a inexistant check-in', async ()=>{
        
        await expect(async ()=>{
            await sut.validate({
                checkInId: "inexistant-check-in"
            })
        }).rejects.toBeInstanceOf(ResourceNotFoundError)

    })

    it('should not be able to validate a check-in after 20 minutes', async ()=>{
        
        vi.setSystemTime(new Date(2011, 0, 20, 8, 0, 0))

        const newCheckIn = await checkInRepository.create({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        vi.setSystemTime(new Date(2011, 0, 20, 8, 25, 0))

        await expect( async ()=>{
            await sut.validate({checkInId: newCheckIn.id})
        }).rejects.toBeInstanceOf(LateValidationCheckInError)

    })

    it('should validate a check-in before 20 minutes', async ()=>{
        
        vi.setSystemTime(new Date(2011, 0, 20, 8, 0, 0))

        const newCheckIn = await checkInRepository.create({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        vi.setSystemTime(new Date(2011, 0, 20, 8, 15, 0))

        const {checkIn} = await sut.validate({checkInId: newCheckIn.id})

        expect(checkIn.validatedAt).toEqual(expect.any(Date))

    })


})