import {fastify} from 'fastify'
import { routes } from './http/routes/routes';

const app = fastify()

app.register(routes)


export default app;