import { FastifyInstance } from "fastify";
import { registerGymController } from "../controllers/gym/register";
import {searchGymController} from "../controllers/gym/search";
import { verifyJWT } from "../middlewares/verify-jwt";
import { getGymsNearbyController } from "../controllers/gym/get-gyms-nearby";
import { verifyUserRole } from "../middlewares/verify-user-role";

export async function gymRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)
    
    app.post('/gyms/register', {onRequest: [verifyUserRole('ADMIN')]} , registerGymController)
    app.post('/gyms/nearby', getGymsNearbyController)
    app.get('/gyms/search', searchGymController)

}