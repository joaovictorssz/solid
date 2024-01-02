import { CheckInRepository } from "@/repositories/check-in-repository";
import { GymRepository } from "@/repositories/gym-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "../user/errors/resource-not-found-error";

interface CheckInServiceRequestBody{
    gymId: string,
    userId: string,
    userLatitude: number,
    userLongitude: number
}

interface CheckInServiceReply {
    checkIn : CheckIn
}

export class CheckInService {
    constructor (
        private checkInRepository: CheckInRepository,
        private gymRepository: GymRepository
        ) {}


    async create({gymId, userId}: CheckInServiceRequestBody) : Promise<CheckInServiceReply>{

        const gym = await this.gymRepository.findById(gymId)

        if(!gym){
            throw new ResourceNotFoundError()
        }
        
        const checkIn = await this.checkInRepository.create({gymId, userId})
        if(!checkIn){
            throw new Error()
        }
        return {
            checkIn
        }

    }
}