import { Router } from "express";
import { userController } from "../../controllers/userController.js";
import { authController } from "../../controllers/authController.js";

const routes = Router();

routes.get('/', userController.getRecords);
routes.get('/:id', userController.getRecord);

routes.post('/', authController.authorize, authController.isAdmin, userController.createRecord);
routes.put('/:id', authController.authorize, authController.isAdmin, userController.updateRecord);
routes.delete('/:id', authController.authorize, authController.isAdmin, userController.deleteRecord);

export const userRoutes = routes;