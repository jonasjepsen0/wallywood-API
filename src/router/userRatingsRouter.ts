import { Router } from "express";
import { userRatingsController } from "../../controllers/userRatingsController.js";
import { authController } from "../../controllers/authController.js";

const routes = Router();

routes.get('/', userRatingsController.getRecords);
routes.get('/:id', userRatingsController.getRecord);

routes.post('/', authController.authorize, authController.isAdmin, userRatingsController.createRecord);
routes.put('/:id', authController.authorize, authController.isAdmin, userRatingsController.updateRecord);
routes.delete('/:id', authController.authorize, authController.isAdmin, userRatingsController.deleteRecord);

export const userRatingsRoutes = routes;
