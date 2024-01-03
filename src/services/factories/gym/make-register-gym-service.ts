import { GymRepository } from "@/repositories/gym-repository"
import { RegisterGymService } from "@/services/gym/register/register"

export function makeRegisterGymService(){
    const gymRepository = new GymRepository()
    const service = new RegisterGymService(gymRepository)
    return service
}