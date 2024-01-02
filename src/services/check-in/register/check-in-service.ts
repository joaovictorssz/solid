import { CheckInRepository } from "@/repositories/check-in-repository";
import { GymRepository } from "@/repositories/gym-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "../../errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxNumberOfCheckInsError } from "../../errors/max-number-of-check-ins";
import { MaxDistanceError } from "../../errors/max-distance-error";

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


    async create({gymId, userId, userLatitude, userLongitude}: CheckInServiceRequestBody) : Promise<CheckInServiceReply>{

       const gym = await this.gymRepository.findById(gymId)
 
        if(!gym){
            throw new ResourceNotFoundError()
        }

        // calculate the distance between user and gym

        const distance = getDistanceBetweenCoordinates(
            {latitude: userLatitude,
            longitude: userLongitude},
            {latitude:  gym.latitude.toNumber(),
            longitude: gym.longitude.toNumber()}
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if(distance > MAX_DISTANCE_IN_KILOMETERS){
            throw new MaxDistanceError()
        }
        const isOnSameDay = await this.checkInRepository.findByUserIdOnDay(userId, new Date())

        if(isOnSameDay){
            throw new MaxNumberOfCheckInsError()
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