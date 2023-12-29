import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/user/register";
import { userAuthenticationController } from "../controllers/user/authentication";

export async function userRoutes(app: FastifyInstance) {

    app.post('/register', createUserController)
    app.post('/auth', userAuthenticationController)

}