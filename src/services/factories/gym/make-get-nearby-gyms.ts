import { GymRepository } from "@/repositories/gym-repository";
import { GetNearGymsService } from "@/services/gym/get-near-gyms/get-near-gyms-service";

export function makeGetGymsNearbyService (){
    const gymRepository = new GymRepository()
    const service = new GetNearGymsService(gymRepository)
    return service
}