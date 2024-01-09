import { makeFetchHistoryService } from "@/services/factories/check-in/make-fetch-history-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchUserHistoryController(request: FastifyRequest, reply: FastifyReply) {
    const fetchUserHistorySchema = z.object({
        userId: z.string(),
        page: z.coerce.number().min(1)
    })

    const { page, userId } = fetchUserHistorySchema.parse(request.query)

    const service = makeFetchHistoryService()

    const {checkIns} = await service.find({page, userId})
    
    return reply.status(200).send({checkIns})
}