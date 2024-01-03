import { GymRepository } from "@/repositories/gym-repository";
import { SearchGymService } from "@/services/gym/search/search-service";

export function makeSearchGymsService(){
    const gymRepository = new GymRepository()
    const service = new SearchGymService(gymRepository)

    return service
}