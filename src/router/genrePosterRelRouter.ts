import { Router } from "express";
import { genrePosterRelController } from "../../controllers/genrePosterRelController.js";
import { authController } from "../../controllers/authController.js";

const routes = Router();

routes.get('/', genrePosterRelController.getRecords);
routes.get('/:genreId/:posterId', genrePosterRelController.getRecord);

routes.post('/', authController.authorize, authController.isAdmin, genrePosterRelController.createRecord);
routes.put('/:genreId/:posterId', authController.authorize, authController.isAdmin, genrePosterRelController.updateRecord);
routes.delete('/:genreId/:posterId', authController.authorize, authController.isAdmin, genrePosterRelController.deleteRecord);

export const genrePosterRelRoutes = routes;
