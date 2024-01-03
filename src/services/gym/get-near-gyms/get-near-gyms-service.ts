import { GymRepository } from "@/repositories/gym-repository"
import { Gym } from "@prisma/client"

interface GetNearGymsRequest  {
    userLatitude: number,
    userLongitude: number
}

interface GetNearGymsReply {
    gyms: Gym[]
}

export class GetNearGymsService {

    constructor(private gymRespository: GymRepository){}

    async get({ userLatitude , userLongitude}: GetNearGymsRequest) : Promise<GetNearGymsReply>{
        
        const MAX_DISTANCE_IN_KILOMETERS = 10
        const gyms = await this.gymRespository.getByDistance(userLatitude, userLongitude, MAX_DISTANCE_IN_KILOMETERS)

        return {gyms}
    }

}