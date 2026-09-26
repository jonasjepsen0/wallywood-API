import { Request, Response } from 'express';
import { prisma } from '../src/prisma.js';

class CartlinesController {
  getRecords = async (req: Request, res: Response) => {
    try {
      const cartlines = await prisma.cartlines.findMany({
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
      res.json(cartlines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente kurvelinjer' });
    }
  }

  getRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const cartline = await prisma.cartlines.findUnique({
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
      res.json(cartline);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente kurvelinje' });
    }
  }

  createRecord = async (req: Request, res: Response) => {
    try {
      const { userId, posterId, quantity } = req.body;
      const newCartline = await prisma.cartlines.create({
        data: { userId, posterId, quantity }
      });
      res.json({ id: newCartline.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke oprette kurvelinje' });
    }
  }

  updateRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { userId, posterId, quantity } = req.body;
      const updated = await prisma.cartlines.update({
        where: { id },
        data: { userId, posterId, quantity }
      });
      res.json({ id: updated.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke opdatere kurvelinje' });
    }
  }

  deleteRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const deleted = await prisma.cartlines.delete({ where: { id } });
      res.json({ id: deleted.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke slette kurvelinje' });
    }
  }
}

export const cartlinesController = new CartlinesController();
