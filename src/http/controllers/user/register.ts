import { PrismaUserRepository } from "@/repositories/prisma-user-repository";
import { EmailAlreadyExistsError } from "@/services/user/errors/email-already-exists-error";
import { CreateUserServices } from "@/services/user/register/register-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {

    // Zod schema
    const requestBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, name, password } = requestBodySchema.parse(request.body)

    try {
        const prismaUserRepository = new PrismaUserRepository()
        const userServices = new CreateUserServices(prismaUserRepository)

        const created_user = await userServices.create({ email, name, password })
        reply.status(201).send(created_user)

    } catch (error) {
        if (error instanceof EmailAlreadyExistsError) {
            return reply.status(409).send(error)
        }
        return reply.status(500).send() //TODO fix-laters
    }


}