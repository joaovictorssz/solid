import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterGymService } from "./register";

let gymRepository : InMemoryGymRepository
let sut : RegisterGymService

describe("Register Gym Service", ()=>{

    beforeEach(()=>{
        gymRepository = new InMemoryGymRepository()
        sut = new RegisterGymService(gymRepository)
    })

    it('should be able to register a gym',async () => {
        const { gym } = await sut.create({
            description: null,
            latitude: -2.924596,
            longitude:-59.9880413,
            phone: null,
            title: 'Gym'
        })        

        expect(gym.id).toEqual(expect.any(String))
    })
})