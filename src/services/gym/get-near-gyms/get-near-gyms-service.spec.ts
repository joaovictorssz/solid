import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetNearGymsService } from "./get-near-gyms-service";



let gymRepository : InMemoryGymRepository
let sut : GetNearGymsService

describe("Get Near Gyms Service", ()=>{

    beforeEach(()=>{
        gymRepository = new InMemoryGymRepository()
        sut = new GetNearGymsService(gymRepository)
    })


    it('should be able to get near gyms',async () => {
          
        await gymRepository.create({
            description: null,
            latitude: -3.0320641,
            longitude:-60.0651565,
            phone: null,
            title: `near-gym-1`
        })

        await gymRepository.create({
            description: null,
            latitude: -3.0321069,
            longitude:-60.0660148,
            phone: null,
            title: `near-gym-2`
        })

        await gymRepository.create({
            description: null,
            latitude: -2.7145607,
            longitude:-59.3328311,
            phone: null,
            title: `far-gym-1`
        })

        const nearGyms = await sut.get({userLatitude: -3.0320641, userLongitude: -60.0651565})
        expect(nearGyms.gyms).toHaveLength(2)
    })

    it('should not be able to get distant gyms',async () => {
          
        await gymRepository.create({
            description: null,
            latitude: -2.9599044,
            longitude:-59.9535303,
            phone: null,
            title: `far-gym-1`
        })

        await gymRepository.create({
            description: null,
            latitude: -2.4043934,
            longitude: -59.5507511,
            phone: null,
            title: `far-gym-2`
        })

        const {gyms} = await sut.get({userLatitude: -3.0320641, userLongitude: -60.0651565})

        expect(gyms).toHaveLength(0)
    })


    
    
})