import { MaxDistanceError } from "@/services/errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "@/services/errors/max-number-of-check-ins";
import { makeRegisterCheckInService } from "@/services/factories/check-in/make-register-check-in-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerCheckInController(request: FastifyRequest, reply: FastifyReply){
    
    const  registerCheckInBodySchema = z.object({
        gymId: z.string(),
        userId: z.string(),
        userLatitude: z.coerce.number(),
        userLongitude: z.coerce.number()
    })

    const { gymId, userId, userLatitude, userLongitude } = registerCheckInBodySchema.parse(request.body)

    try{
        const service =  makeRegisterCheckInService()
        const {checkIn} = await service.create({
            gymId, 
            userId,
            userLatitude,
            userLongitude
        })

        return reply.status(201).send(checkIn)
    }
    catch(err){
        if(err instanceof MaxDistanceError || err instanceof MaxNumberOfCheckInsError){
            return reply.status(400).send({message: err.message})
        }
        
        return reply.status(500).send()
    }
}