import { CheckInRepository } from "@/repositories/check-in-repository";
import { ValidateCheckInService } from "@/services/check-in/validate/validate-check-in-service";

export function makeValidateCheckInService(){
    const checkInRepository = new CheckInRepository()
    const validateCheckInService = new ValidateCheckInService(checkInRepository)

    return validateCheckInService
}