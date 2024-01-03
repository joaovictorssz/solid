import { GymRepository } from "@/repositories/gym-repository";
import { SearchGymService } from "@/services/gym/search/search-service";

export function makeSearchGymsService(){
    const gymRepository = new GymRepository()
    const searchGymService = new SearchGymService(gymRepository)

    return searchGymService
}