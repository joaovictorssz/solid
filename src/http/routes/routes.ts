import { FastifyInstance } from "fastify";
import { createUser } from "../controllers/create_user.controller";

export async function routes(app: FastifyInstance) {

    app.post('/user', createUser)
    
}