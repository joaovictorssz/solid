import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/user/register";
import { userAuthenticationController } from "../controllers/user/authentication";
import { getUserProfileController } from "../controllers/user/get-user-profile";
import { verifyJWT } from "../middlewares/verify-jwt";

export async function userRoutes(app: FastifyInstance) {

    app.post('/register', createUserController)
    app.post('/auth', userAuthenticationController)

    /** Authenticated Routes */

    app.get('/profile', {onRequest: [verifyJWT]}, getUserProfileController)

}