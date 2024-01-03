import { CheckInRepository } from "@/repositories/check-in-repository";
import { GetUserMetricsService } from "@/services/check-in/get-user-metrics/get-user-metrics";

export function makeGetUserMetricsService(){
    const checkInRepository = new CheckInRepository()
    const getUserMetricsService = new GetUserMetricsService(checkInRepository)

    return getUserMetricsService
}