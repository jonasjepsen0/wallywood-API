import { Router } from "express";
import { cartlinesController } from "../../controllers/cartlinesController.js";
import { authController } from "../../controllers/authController.js";

const routes = Router();

routes.get('/', cartlinesController.getRecords);
routes.get('/:id', cartlinesController.getRecord);

routes.post('/', authController.authorize, authController.isAdmin, cartlinesController.createRecord);
routes.put('/:id', authController.authorize, authController.isAdmin, cartlinesController.updateRecord);
routes.delete('/:id', authController.authorize, authController.isAdmin, cartlinesController.deleteRecord);

export const cartlinesRoutes = routes;
