import { createUserService } from "@/services/create_user_service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createUser(request: FastifyRequest, reply: FastifyReply){
    
    // zod checks if the request body follows the pattern 
    const RequestBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, name, password } = RequestBodySchema.parse(request.body)

    try{

        await createUserService({email, name, password})

    }
    catch(err){

        return reply.status(409).send()

    }

    
    return reply.status(201).send()

}