import { makeAuthenticationService } from "@/services/factories/user/make-authentication-service";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentia-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function userAuthenticationController(request: FastifyRequest, reply: FastifyReply) {

    const requestBodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const { email, password } = requestBodySchema.parse(request.body)

    try {

        const authenticationService = makeAuthenticationService()
        const user = await authenticationService.authenticate({ email, password })
        const token = await reply.jwtSign(
            {
            role: user.role
            },{
            sign:{
                sub: user.id
            }
        })

        const refreshToken = await reply.jwtSign(
            {
            role: user.role
            },{
            sign:{
                sub: user.id,
                expiresIn: '7d'
            }
            })
        return reply.status(200).setCookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: true,
            path: '/'
        }).send({
            token
        })
    }
    catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(401).send({ message: error.message })
        }
        return reply.status(500).send()
    }

}