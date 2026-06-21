import { Request, Response } from 'express';
import { prisma } from '../src/prisma.js';

class PosterController {
  getRecords = async (req: Request, res: Response) => {
    try {
      const posters = await prisma.poster.findMany({
        include: {
          genres: { include: { genre: true } }
        }
      });
      res.json(posters);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente plakater' });
    }
  }

  getRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const poster = await prisma.poster.findUnique({
        where: { id },
        include: {
          genres: { include: { genre: true } }
        }
      });
      res.json(poster);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente plakat' });
    }
  }

  createRecord = async (req: Request, res: Response) => {
    try {
      const { name, slug, description, image, width, height, price, stock, genreIds } = req.body;
      const newPoster = await prisma.poster.create({
        data: { name, slug, description, image, width, height, price, stock }
      });
      if (Array.isArray(genreIds) && genreIds.length) {
        await prisma.genrePosterRel.createMany({
          data: genreIds.map((genreId: number) => ({ genreId, posterId: newPoster.id }))
        });
      }
      res.json({ id: newPoster.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke oprette plakat' });
    }
  }

  updateRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { name, slug, description, image, width, height, price, stock, genreIds } = req.body;

      const updated = await prisma.poster.update({
        where: { id },
        data: { name, slug, description, image, width, height, price, stock }
      });

      if (Array.isArray(genreIds)) {
        await prisma.genrePosterRel.deleteMany({ where: { posterId: id } });
        if (genreIds.length) {
          await prisma.genrePosterRel.createMany({
            data: genreIds.map((genreId: number) => ({ genreId, posterId: id }))
          });
        }
      }

      res.json({ id: updated.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke opdatere plakat' });
    }
  }

  deleteRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await prisma.genrePosterRel.deleteMany({ where: { posterId: id } });
      const deleted = await prisma.poster.delete({ where: { id } });
      res.json({ id: deleted.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke slette plakat' });
    }
  }
}

export const posterController = new PosterController();