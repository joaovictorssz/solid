import { PrismaUsersReposirory } from "@/repositories/prisma-user-repository"
import { CreateUserService } from "@/services/user/create"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createUser(request: FastifyRequest, reply: FastifyReply) {

    // zod checks if the request body follows the pattern 
    const requestBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, name, password } = requestBodySchema.parse(request.body)

    try {

        const prismaUserRepository = new PrismaUsersReposirory()

        const userService = new CreateUserService(prismaUserRepository)

        const user = await userService.create({ email, name, password })
        return reply.status(201).send(user)

    }
    catch (err) {
        return reply.status(409).send({ message: err })
    }


}