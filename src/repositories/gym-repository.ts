import { Gym } from "@prisma/client";
import { GymRepositoryInterface } from "./interfaces/gym-repository";

export class GymRepository implements GymRepositoryInterface{
    
    
    async findById(gymId: string) : Promise<Gym | null>{
        
        return null
    }
}