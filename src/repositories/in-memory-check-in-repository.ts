import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepositoryInterface } from "./interfaces/check-in-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInRepository implements CheckInRepositoryInterface {

    public checkIns: CheckIn[] = []

    
    async create(data: Prisma.CheckInUncheckedCreateInput) {

        const checkIn : CheckIn= {
            id: randomUUID(),
            userId: data.userId,
            gymId: data.gymId,
            createdAt: new Date(),
            validatedAt: data.validatedAt ? new Date(data.validatedAt) : null
        }

        this.checkIns.push(checkIn)
        
        return checkIn



    }
}