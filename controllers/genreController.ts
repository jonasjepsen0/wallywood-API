import { Request, Response } from 'express';
import { prisma } from '../src/prisma.js';

class GenreController {
  getRecords = async (req: Request, res: Response) => {
    try {
      const genres = await prisma.genre.findMany({
        include: {
          posters: { include: { poster: true } }
        }
      });
      res.json(genres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente genrer' });
    }
  }

  getRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const genre = await prisma.genre.findUnique({
        where: { id },
        include: {
          posters: { include: { poster: true } }
        }
      });
      res.json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente genre' });
    }
  }

  createRecord = async (req: Request, res: Response) => {
    try {
      const { title, slug } = req.body;
      const newGenre = await prisma.genre.create({
        data: { title, slug }
      });
      res.json({ id: newGenre.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke oprette genre' });
    }
  }

  updateRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { title, slug } = req.body;
      const updated = await prisma.genre.update({
        where: { id },
        data: { title, slug }
      });
      res.json({ id: updated.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke opdatere genre' });
    }
  }

  deleteRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await prisma.genrePosterRel.deleteMany({ where: { genreId: id } });
      const deleted = await prisma.genre.delete({ where: { id } });
      res.json({ id: deleted.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke slette genre' });
    }
  }
}

export const genreController = new GenreController();