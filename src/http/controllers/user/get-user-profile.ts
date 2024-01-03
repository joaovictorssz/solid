import { makeGetUserProfile } from "@/services/factories/user/make-get-user-profile";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getUserProfileController(request: FastifyRequest, reply: FastifyReply){
    
    const id = request.user.sub

    try{
        const service = makeGetUserProfile()
        const user = await service.get(id)

        return reply.status(200).send(user)
    }
    catch(err){
        if(err instanceof ResourceNotFoundError){
            return reply.status(401).send({message: err.message})
        }
        return reply.status(500).send()

    }
    
}