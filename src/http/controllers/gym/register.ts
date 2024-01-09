import { makeRegisterGymService } from "@/services/factories/gym/make-register-gym-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerGymController(request: FastifyRequest, reply: FastifyReply){


    const registerGymSchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine((value)=>{
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value)=>{
            return Math.abs(value) <= 180
        })
    })

    const newGym = registerGymSchema.parse(request.body)

   
    const service = makeRegisterGymService()

    const {gym} = await service.create(newGym)

    return reply.status(201).send({
        gym
    })
    
}