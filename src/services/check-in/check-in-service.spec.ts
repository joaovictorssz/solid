import { InMemoryCheckInRepository } from "@/repositories/in-memory-check-in-repository";
import { describe } from "node:test";
import { CheckInService } from "./check-in-service";
import { beforeEach, expect, it } from "vitest";
import { randomUUID } from "node:crypto";


let checkInRepository: InMemoryCheckInRepository
let sut : CheckInService

describe('Check In Service', () => {

    beforeEach(()=>{
        checkInRepository = new InMemoryCheckInRepository()
        sut = new CheckInService(checkInRepository)
    })

    it('should register a new check-in', async () => {

        const {checkIn} = await sut.create({
            gymId: randomUUID(),
            userId: randomUUID()
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })
})