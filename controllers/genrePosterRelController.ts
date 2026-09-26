import { Request, Response } from 'express';
import { prisma } from '../src/prisma.js';

class GenrePosterRelController {
  getRecords = async (req: Request, res: Response) => {
    try {
      const rels = await prisma.genrePosterRel.findMany({
        include: { genre: true, poster: true }
      });
      res.json(rels);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente relationer' });
    }
  }

  getRecord = async (req: Request, res: Response) => {
    try {
      const genreId = Number(req.params.genreId);
      const posterId = Number(req.params.posterId);
      const rel = await prisma.genrePosterRel.findUnique({
        where: { genreId_posterId: { genreId, posterId } },
        include: { genre: true, poster: true }
      });
      res.json(rel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente relation' });
    }
  }

  createRecord = async (req: Request, res: Response) => {
    try {
      const { genreId, posterId } = req.body;
      const newRel = await prisma.genrePosterRel.create({
        data: { genreId, posterId }
      });
      res.json({ genreId: newRel.genreId, posterId: newRel.posterId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke oprette relation' });
    }
  }

  updateRecord = async (req: Request, res: Response) => {
    try {
      const genreId = Number(req.params.genreId);
      const posterId = Number(req.params.posterId);
      const { genreId: newGenreId, posterId: newPosterId } = req.body;
      const updated = await prisma.genrePosterRel.update({
        where: { genreId_posterId: { genreId, posterId } },
        data: { genreId: newGenreId, posterId: newPosterId }
      });
      res.json({ genreId: updated.genreId, posterId: updated.posterId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke opdatere relation' });
    }
  }

  deleteRecord = async (req: Request, res: Response) => {
    try {
      const genreId = Number(req.params.genreId);
      const posterId = Number(req.params.posterId);
      const deleted = await prisma.genrePosterRel.delete({
        where: { genreId_posterId: { genreId, posterId } }
      });
      res.json({ genreId: deleted.genreId, posterId: deleted.posterId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke slette relation' });
    }
  }
}

export const genrePosterRelController = new GenrePosterRelController();
