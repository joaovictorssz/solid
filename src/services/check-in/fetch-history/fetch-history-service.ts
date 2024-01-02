import { CheckInRepository } from "@/repositories/check-in-repository";
import { CheckIn } from "@prisma/client";

interface FetchHistoryRequestBody{
    userId: string,
    page: number
}

interface FetchHistoryReply {
    checkIns : CheckIn[]
}
export class FetchCheckInsHistoryService {

    constructor( private checkInRepository : CheckInRepository){}

    async find({userId, page}: FetchHistoryRequestBody): Promise<FetchHistoryReply>{
        const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

        return {checkIns}
    }

}