import { fastify } from 'fastify'
import { userRoutes } from './http/routes/user';
import { ZodError } from 'zod';
import { env } from './env';
import { fastifyJwt } from '@fastify/jwt';
import { gymRoutes } from './http/routes/gyms';
import { checkInRoutes } from './http/routes/check-in';

const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(userRoutes)
app.register(gymRoutes)
app.register(checkInRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: "Validation error.", issues: error.format() })
    }

    if (env.NODE_ENVIRONMENT !== 'production') {
        console.error(error)
    }

    return reply.status(500).send({ message: "Internal server error." })
})


export default app; 