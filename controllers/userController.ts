import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../src/prisma.js';

class UserController {
  getRecords = async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          role: true,
          isActive: true
        }
      });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente brugere' });
    }
  }

  getRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          role: true,
          isActive: true
        }
      });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente bruger' });
    }
  }

  createRecord = async (req: Request, res: Response) => {
    try {
      const { firstname, lastname, email, password, role, isActive } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: { firstname, lastname, email, password: hashedPassword, role, isActive }
      });
      res.json({ id: newUser.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke oprette bruger' });
    }
  }

  updateRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { firstname, lastname, email, password, role, isActive } = req.body;

      const data: any = { firstname, lastname, email, role, isActive };
      if (password) {
        data.password = await bcrypt.hash(password, 10);
      }

      const updated = await prisma.user.update({
        where: { id },
        data
      });
      res.json({ id: updated.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke opdatere bruger' });
    }
  }

  deleteRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const deleted = await prisma.user.delete({ where: { id } });
      res.json({ id: deleted.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke slette bruger' });
    }
  }
}

export const userController = new UserController();