import { Gym, Prisma } from "@prisma/client";
import { GymRepositoryInterface } from "../interfaces/gym-repository";
import { randomUUID } from "crypto";
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

    
}