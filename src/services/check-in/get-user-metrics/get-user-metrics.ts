import { CheckInRepository } from "@/repositories/check-in-repository"

interface GetUserMetricasRequest {
    userId: string
}

interface GetUserMetricsReply {
    checkInsCount: number
}

export class GetUserMetricsService {

    constructor( private chekInRepository: CheckInRepository ){}

    async get({userId}: GetUserMetricasRequest):Promise<GetUserMetricsReply>{
        const checkInsCount = await this.chekInRepository.getUserMetrics(userId)

        return {
            checkInsCount
        }
    }

}