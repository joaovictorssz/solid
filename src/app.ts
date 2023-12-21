import { fastify } from 'fastify'
import { userRoutes } from './http/routes/user';

const app = fastify()

app.register(userRoutes)


export default app; 