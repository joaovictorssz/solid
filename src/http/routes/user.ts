import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/user/register";

export async function userRoutes(app: FastifyInstance) {

    app.post('/register', createUserController)

}