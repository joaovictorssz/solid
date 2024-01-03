import { Gym, Prisma } from "@prisma/client";

export interface GymRepositoryInterface {

    findById(gymId: string) : Promise<Gym | null>,
    create(data: Prisma.GymCreateInput): Promise<Gym>,
    findMany(query: string, page: number): Promise<Gym[]>,
    getByDistance(latitude: number, longitude: number, rate: number) : Promise<Gym[]>
}