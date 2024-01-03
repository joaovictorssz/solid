import { makeGetUserProfile } from "@/services/factories/user/make-get-user-profile";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getUserProfileController(request: FastifyRequest, reply: FastifyReply){
    
    const getProfileRequestSchemma = z.object({
        id: z.string()
    })

    const {id} = getProfileRequestSchemma.parse(request.params)

    try{
        const getUserProfileService = makeGetUserProfile()
        const userProfile = await getUserProfileService.get(id)

        return userProfile
    }
    catch(error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send()    }
}