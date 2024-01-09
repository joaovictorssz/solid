import { LateValidationCheckInError } from "@/services/errors/late-validation-check-in-error";
import { makeValidateCheckInService } from "@/services/factories/check-in/make-validate-check-in";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validateCheckInController(request: FastifyRequest, reply: FastifyReply){
    
    const  validateCheckInBodySchema = z.object({
        checkInId: z.string()
    })

    const { checkInId } = validateCheckInBodySchema.parse(request.body)

    try{
        const service =  makeValidateCheckInService()
        const {checkIn} = await service.validate({
            checkInId
        })

        return reply.status(200).send(checkIn)
    }
    catch(err){
        if(err instanceof LateValidationCheckInError){
            return reply.status(400).send({message: err.message})
        }
        
        return reply.status(500).send()
    }
}