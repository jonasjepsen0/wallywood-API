import { Router } from "express";
import { genreController } from "../../controllers/genreController.js";
import { authController } from "../../controllers/authController.js";

const routes = Router();

routes.get('/', genreController.getRecords);
routes.get('/:id', genreController.getRecord);

routes.post('/', authController.authorize, authController.isAdmin, genreController.createRecord);
routes.put('/:id', authController.authorize, authController.isAdmin, genreController.updateRecord);
routes.delete('/:id', authController.authorize, authController.isAdmin, genreController.deleteRecord);

export const genreRoutes = routes;