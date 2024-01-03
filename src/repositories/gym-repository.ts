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
            },
            take: 20,
            skip: (page -1) * 20
        })
        
        return gyms
    }
    
    async create(data: Prisma.GymCreateInput){
        const gym = await prisma.gym.create({data})

        return gym
    }
    
    async getByDistance(latitude: number, longitude: number, rate: number): Promise<Gym[]> {
        const gyms = await prisma.$queryRaw<Gym[]>`
        
            SELECT * FROM gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= ${rate}
        
        `
            
        return gyms
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