import { makeGetGymsNearbyService } from "@/services/factories/gym/make-get-nearby-gyms";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getGymsNearbyController(request: FastifyRequest, reply: FastifyReply){

    const getGymsNearbyBodySchema = z.object({
        userLatitude: z.coerce.number().refine( value => {
            return Math.abs(value) <= 90
        } ),
        userLongitude: z.coerce.number().refine( value => {
            return Math.abs(value) <= 180 
        }),
    })

    const { userLatitude, userLongitude } = getGymsNearbyBodySchema.parse(request.body)

    const service = makeGetGymsNearbyService()

    const { gyms } = await service.get({userLatitude, userLongitude})

    return reply.status(200).send(gyms)


}