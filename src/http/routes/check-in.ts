import { FastifyInstance } from "fastify";
import {searchGymController} from "../controllers/gym/search";
import { verifyJWT } from "../middlewares/verify-jwt";
import { getGymsNearbyController } from "../controllers/gym/get-gyms-nearby";
import { registerCheckInController } from "../controllers/check-in/register";
import { validateCheckInController } from "../controllers/check-in/validate";

export async function checkInRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)
    
    app.post('/checkin/register', registerCheckInController)
    app.post('/checkin/history', getGymsNearbyController)
    app.post('/checkin/validate', validateCheckInController)
    app.get('/checkin/metrics', searchGymController)

}