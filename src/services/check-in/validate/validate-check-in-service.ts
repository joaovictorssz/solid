import { CheckInRepository } from "@/repositories/check-in-repository"
import { LateValidationCheckInError } from "@/services/errors/late-validation-check-in-error"
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error"
import { CheckIn } from "@prisma/client"
import dayjs from "dayjs"

interface ValidateCheckInRequest {
    checkInId: string
}

interface ValidateCheckInReply {
    checkIn: CheckIn
}

export class ValidateCheckInService {

    constructor(private checkInRepository : CheckInRepository){}

    async validate({ checkInId }: ValidateCheckInRequest) : Promise<ValidateCheckInReply> {
        const checkIn = await this.checkInRepository.findById(checkInId)

        if(!checkIn){
            throw new ResourceNotFoundError()
        }

        const checkInCreationDate = dayjs(checkIn.createdAt)
        const checkInValidationDate = dayjs(new Date())

        const differenceInMinutes = checkInValidationDate.diff(checkInCreationDate, 'minutes')

        if(differenceInMinutes > 20){
            throw new LateValidationCheckInError()
        }

        checkIn.validatedAt = new Date()

        await this.checkInRepository.save(checkIn)

        return {
            checkIn
        }
    }

}