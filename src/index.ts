import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import { authRoutes } from './router/authRoutes.js';
import { userRoutes } from './router/userRouter.js';
import { posterRoutes } from './router/posterRouter.js';
import { genreRoutes } from './router/genreRouter.js';

const app = express();
const port = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posters", posterRoutes);
app.use("/api/genres", genreRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Wallywood API kører');
});

app.listen(port, () => {
  console.log(`Server kører på http://localhost:${port}`);
});