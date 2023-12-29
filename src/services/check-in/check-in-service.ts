import { CheckInRepository } from "@/repositories/check-in-repository";
import { CheckIn } from "@prisma/client";

interface CheckInServiceRequestBody{
    gymId: string,
    userId: string 
}

interface CheckInServiceReply {
    checkIn : CheckIn
}

export class CheckInService {
    constructor (private checkInRepository: CheckInRepository) {}

    async create({gymId, userId}: CheckInServiceRequestBody) : Promise<CheckInServiceReply>{
        
        const checkIn = await this.checkInRepository.create({gymId, userId})
        if(!checkIn){
            throw new Error()
        }
        return {
            checkIn
        }

    }
}