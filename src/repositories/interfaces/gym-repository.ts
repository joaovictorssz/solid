import { Gym } from "@prisma/client";

export interface GymRepositoryInterface {

    findById(gymId: string) : Promise<Gym | null>

}