import { FastifyInstance } from "fastify";
import { createUser } from "../controllers/user/create";

export async function routes(app: FastifyInstance) {

    app.post('/user', createUser)

}