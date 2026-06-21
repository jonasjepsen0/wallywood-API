import { Router } from "express";
import { posterController } from "../../controllers/posterController.js";
import { authController } from "../../controllers/authController.js";

const routes = Router();

routes.get('/', posterController.getRecords);
routes.get('/:id', posterController.getRecord);

routes.post('/', authController.authorize, authController.isAdmin, posterController.createRecord);
routes.put('/:id', authController.authorize, authController.isAdmin, posterController.updateRecord);
routes.delete('/:id', authController.authorize, authController.isAdmin, posterController.deleteRecord);

export const posterRoutes = routes;