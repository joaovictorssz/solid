import { makeSearchGymsService } from "@/services/factories/gym/make-search-gyms-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchGymController(request:FastifyRequest, reply: FastifyReply){
    

    const searchGymControllerSchema = z.object({
        query: z.string(),
        page: z.coerce.number().nonnegative()
    })

    const { page, query } = searchGymControllerSchema.parse(request.query)
    

    const service = makeSearchGymsService()
    const {gyms} = await service.search({page, query})
    return reply.status(200).send(gyms)

    
    
}