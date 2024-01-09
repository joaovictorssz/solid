import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { registerCheckInController } from "../controllers/check-in/register";
import { validateCheckInController } from "../controllers/check-in/validate";
import { getUserMetricsController } from "../controllers/check-in/metrics";
import { fetchUserHistoryController } from "../controllers/check-in/history";

export async function checkInRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)
    
    app.post('/checkin/register', registerCheckInController)
    app.get('/checkin/history', fetchUserHistoryController)
    app.post('/checkin/validate', validateCheckInController)
    app.get('/checkin/metrics', getUserMetricsController)

}