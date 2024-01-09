import { FastifyInstance } from "fastify";
import { registerGymController } from "../controllers/gym/register";
import {searchGymController} from "../controllers/gym/search";
import { verifyJWT } from "../middlewares/verify-jwt";
import { getGymsNearbyController } from "../controllers/gym/get-gyms-nearby";

export async function gymRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)
    
    app.post('/gyms/register', registerGymController)
    app.post('/gyms/nearby', getGymsNearbyController)
    app.get('/gyms/search', searchGymController)

}