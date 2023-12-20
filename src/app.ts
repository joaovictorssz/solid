import {fastify} from 'fastify'
import { prisma } from './lib/prisma';
import {z} from 'zod'

const app = fastify()

app.post('/user', async (request, reply)=>{
    
    const RequestBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password_hash: z.string().min(6)
    })

    const { email, name, password_hash } = RequestBodySchema.parse(request.body)

    await prisma.user.create({
        data: {
            email,
            name,
            password_hash
        }
    })
    return reply.status(201).send()
})




export default app;