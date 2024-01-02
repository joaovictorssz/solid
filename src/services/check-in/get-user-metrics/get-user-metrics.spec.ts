import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetUserMetricsService } from "./get-user-metrics";


let checkInRepository: InMemoryCheckInRepository
let sut : GetUserMetricsService


describe('Get User Metrics Service', ()=>{

    beforeEach(()=>{
        checkInRepository = new InMemoryCheckInRepository()
        sut = new GetUserMetricsService(checkInRepository)

        vi.useFakeTimers()
    })

    it('should  get the number of check-ins of an user', async () => {
        for (let i = 1; i <= 5; i++) {
            
            vi.setSystemTime(new Date(2023, 0, i, 8, 0, 0))
            await checkInRepository.create({
                gymId: `gym-${i}`,
                userId:'user-1'
            })  
        }

        const {checkInsCount} = await sut.get({userId: 'user-1'})

        expect(checkInsCount).toEqual(5)
    })
})