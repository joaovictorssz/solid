import { CheckInRepository } from "@/repositories/check-in-repository";
import { FetchCheckInsHistoryService } from "@/services/check-in/fetch-history/fetch-history-service";

export function makeFetchHistoryService(){
    const checkInRepository = new CheckInRepository()
    const fetchHistoryService = new FetchCheckInsHistoryService(checkInRepository)

    return fetchHistoryService
}