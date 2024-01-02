import { Gym, Prisma } from "@prisma/client";
import { GymRepositoryInterface } from "./interfaces/gym-repository";
import { prisma } from "@/lib/prisma";

export class GymRepository implements GymRepositoryInterface{
    
    async create(data: Prisma.GymCreateInput){
        const gym = await prisma.gym.create({data})

        return gym
    }
    
    async findById(gymId: string) : Promise<Gym | null>{
        const gym  = await prisma.gym.findUnique({
            where:{
                id: gymId
            }
        })        
        return gym
    }
}