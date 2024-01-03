
import { CheckInRepository } from "@/repositories/check-in-repository"
import { GymRepository } from "@/repositories/gym-repository"
import { CheckInService } from "@/services/check-in/register/check-in-service"

export function makeRegisterCheckInService(){
    const checkInRepository = new CheckInRepository()
    const gymRepository = new GymRepository()
    const registerCheckInService = new CheckInService(checkInRepository, gymRepository)
    return registerCheckInService
}