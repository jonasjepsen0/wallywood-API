import { Router, Request, Response } from "express";
import { authController } from "../../controllers/authController.js";

const router = Router();

router.post('/login', authController.authenticate);

router.get('/authorize', authController.authorize, (req: Request, res: Response) => {
  res.json({ user: req.user });
});

export const authRoutes = router;