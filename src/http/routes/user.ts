import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/user/register";
import { userAuthenticationController } from "../controllers/user/authentication";
import { getUserProfileController } from "../controllers/user/get-user-profile";

export async function userRoutes(app: FastifyInstance) {

    app.post('/register', createUserController)
    app.post('/auth', userAuthenticationController)
    app.get('/users/:id', getUserProfileController)

}