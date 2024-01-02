import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { FetchCheckInsHistoryService } from "./fetch-history-service";


let checkInRepository: InMemoryCheckInRepository
let sut : FetchCheckInsHistoryService


describe('Fetch User CheckIn History', ()=>{

    beforeEach(()=>{
        checkInRepository = new InMemoryCheckInRepository()
        sut = new FetchCheckInsHistoryService(checkInRepository)

        vi.useFakeTimers()
    })

    it('should fetch user paginated check-ins', async ()=>{
        
        

        for (let i = 1; i <= 22; i++) {
            
            vi.setSystemTime(new Date(2023, 0, i, 8, 0, 0))
            await checkInRepository.create({
                gymId: `gym-${i}`,
                userId:'user-1'
            })  
        }

        

        const {checkIns} = await sut.find({userId: 'user-1', page: 2})

        expect(checkIns).toHaveLength(2)
    })


})