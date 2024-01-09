import { makeGetUserMetricsService } from "@/services/factories/check-in/make-get-user-metrics-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getUserMetricsController(request: FastifyRequest,reply: FastifyReply) {

    const getUserMetricsSchema = z.object({
        userId: z.string()
    })

    const { userId } = getUserMetricsSchema.parse(request.query)
    
    const service = makeGetUserMetricsService()

    const {checkInsCount} = await service.get({userId})

    return reply.status(200).send({checkInsCount})

}