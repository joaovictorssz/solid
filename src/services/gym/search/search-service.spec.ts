import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymService } from "./search-service";


let gymRepository : InMemoryGymRepository
let sut : SearchGymService

describe("Register Gym Service", ()=>{

    beforeEach(()=>{
        gymRepository = new InMemoryGymRepository()
        sut = new SearchGymService(gymRepository)
    })

    

    it('should be able to search a gym and get a paginated list',async () => {
          
        for (let index = 1; index <= 22; index++) {
            await gymRepository.create({
                description: null,
                latitude: -2.924596,
                longitude:-59.9880413,
                phone: null,
                title: `gym-${index}`
            })
            
        }

        const gyms_page_1 = await sut.search({query: 'ym-', page: 1})
        expect(gyms_page_1.gyms).toHaveLength(20)

        
        const gyms_page_2 = await sut.search({query: 'gy', page: 2})
        expect(gyms_page_2.gyms).toHaveLength(2)
    })

    it('should return an empty list if the query is not equal any part of gym title', async () => {
        for (let index = 1; index <= 22; index++) {
            await gymRepository.create({
                description: null,
                latitude: -2.924596,
                longitude:-59.9880413,
                phone: null,
                title: `gym-${index}`
            })
            
        }

        const gyms_page_1 = await sut.search({query: 'test', page: 1})
        expect(gyms_page_1.gyms).toHaveLength(0)
    })
})