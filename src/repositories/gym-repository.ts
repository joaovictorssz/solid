import { Gym, Prisma } from "@prisma/client";
import { GymRepositoryInterface } from "./interfaces/gym-repository";
import { prisma } from "@/lib/prisma";

export class GymRepository implements GymRepositoryInterface{


    async findMany(query: string, page: number): Promise<Gym[]> {
        const gyms = await prisma.gym.findMany({
            where:{
                title:{
                    contains: query
                }
            }
        })
        
        return gyms.slice((page-1)*20, page*20)
    }
    
    async create(data: Prisma.GymCreateInput){
        const gym = await prisma.gym.create({data})

        return gym
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getByDistance(latitude: number, longitude: number, rate: number): Promise<Gym[]> {
        const nearGyms = await prisma.gym.findMany()
        return nearGyms
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