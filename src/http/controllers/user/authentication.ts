import { PrismaUserRepository } from "@/repositories/prisma-user-repository";
import { AuthenticationService } from "@/services/user/authentication/authentication-service";
import { InvalidCredentialsError } from "@/services/user/errors/invalid-credentia-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function userAuthenticationController(request: FastifyRequest, reply: FastifyReply) {

    const requestBodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const { email, password } = requestBodySchema.parse(request.body)

    try{
        const usersRepository = new PrismaUserRepository()
        const authenticationService = new AuthenticationService(usersRepository)

        const user = await authenticationService.authenticate({email, password})

        return reply.status(200).send(user)
    }
    catch(error){
        if(error instanceof InvalidCredentialsError){
            return reply.status(401).send({message: error.message})
        }
        return reply.status(500).send()
    }
    
}