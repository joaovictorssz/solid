import {fastify} from 'fastify'
import { PrismaClient } from 'prisma/prisma-client'
const app = fastify()

const prisma = new PrismaClient()



export default app;