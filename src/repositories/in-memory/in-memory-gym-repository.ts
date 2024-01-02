import { Gym } from "@prisma/client";
import { GymRepositoryInterface } from "../interfaces/gym-repository";
export class InMemoryGymRepository implements GymRepositoryInterface {

    public gyms: Gym[] = []

    async findById(gymId: string) : Promise<Gym | null>{
        
        const gym = this.gyms.find( gym => {return gym.id === gymId})

        if(!gym){
            return null
        }

        return gym
    }

    
}