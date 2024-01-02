import { GymRepository } from "@/repositories/gym-repository";
import { Gym } from "@prisma/client";


interface GymRegisterRequestBody {
    title: string,
    description: string | null,
    phone: string  |null,
    latitude: number,
    longitude: number
}

interface GymRegisterReply{
    gym: Gym
}
export class RegisterGymService{
    constructor(private gymRepository : GymRepository){}

    async create(data: GymRegisterRequestBody) : Promise<GymRegisterReply>{
    
        const gym = await this.gymRepository.create(data)
    
        return {gym}
    }
}