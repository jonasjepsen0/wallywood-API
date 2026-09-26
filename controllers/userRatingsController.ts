import { Request, Response } from 'express';
import { prisma } from '../src/prisma.js';

class UserRatingsController {
  getRecords = async (req: Request, res: Response) => {
    try {
      const ratings = await prisma.userRatings.findMany({
        include: {
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              email: true,
              role: true,
              isActive: true
            }
          },
          poster: true
        }
      });
      res.json(ratings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente bedømmelser' });
    }
  }

  getRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const rating = await prisma.userRatings.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              email: true,
              role: true,
              isActive: true
            }
          },
          poster: true
        }
      });
      res.json(rating);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente bedømmelse' });
    }
  }

  createRecord = async (req: Request, res: Response) => {
    try {
      const { userId, posterId, numStars } = req.body;
      const newRating = await prisma.userRatings.create({
        data: { userId, posterId, numStars }
      });
      res.json({ id: newRating.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke oprette bedømmelse' });
    }
  }

  updateRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { userId, posterId, numStars } = req.body;
      const updated = await prisma.userRatings.update({
        where: { id },
        data: { userId, posterId, numStars }
      });
      res.json({ id: updated.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke opdatere bedømmelse' });
    }
  }

  deleteRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const deleted = await prisma.userRatings.delete({ where: { id } });
      res.json({ id: deleted.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke slette bedømmelse' });
    }
  }
}

export const userRatingsController = new UserRatingsController();
