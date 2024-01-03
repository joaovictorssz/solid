import { Gym, Prisma } from "@prisma/client";
import { GymRepositoryInterface } from "../interfaces/gym-repository";
import { randomUUID } from "crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
export class InMemoryGymRepository implements GymRepositoryInterface {

    public gyms: Gym[] = []

    async create(data: Prisma.GymCreateInput){

        const gym = {
            description: data.description ?? null,
            id: data.id ?? randomUUID(),
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude:  new Prisma.Decimal(data.longitude.toString()),
            phone: data.phone ?? null,
            title: data.title ?? null
        }

        this.gyms.push(gym)

        return gym

    }

    async findById(gymId: string) : Promise<Gym | null>{
        
        const gym = this.gyms.find( gym => {return gym.id === gymId})

        if(!gym){
            return null
        }

        return gym
    }

    async getByDistance(latitude: number, longitude: number, rate: number): Promise<Gym[]> {
        const nearGyms = this.gyms.filter((gym)=>{
            const distance = getDistanceBetweenCoordinates(
                {latitude, longitude}, 
                {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()
                })
            console.log(distance)
            return distance <=rate
        }) 

        return nearGyms

    }

    async findMany(query: string, page: number): Promise<Gym[]>{
        const gyms = this.gyms.filter((gym)=>gym.title?.includes(query))
        return gyms.slice((page-1)*20, page*20)
    }
    
}