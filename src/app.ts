import { fastify } from 'fastify'
import { userRoutes } from './http/routes/user';
import { ZodError } from 'zod';
import { env } from './env';

const app = fastify()

app.register(userRoutes)

app.setErrorHandler((error, _, reply)=>{
    if(error instanceof ZodError){
        return reply.status(400).send({message: "Validation error.", issues: error.format()})
    }

    if(env.NODE_ENVIRONMENT !== 'production'){
        console.error(error)
    }

    return reply.status(500).send({message: "Internal server error."})
})


export default app; 