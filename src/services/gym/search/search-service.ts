import { GymRepository } from "@/repositories/gym-repository"
import { Gym } from "@prisma/client"

interface SearchGymRequest {
    query: string,
    page: number
}

interface SearchGymReply {
    gyms: Gym[]
}

export class SearchGymService {

    constructor(private gymRepository: GymRepository) { }

    async search({ page, query }: SearchGymRequest): Promise<SearchGymReply> {
        const gyms = await this.gymRepository.findMany(query, page)

        return {
            gyms
        }
    }

}