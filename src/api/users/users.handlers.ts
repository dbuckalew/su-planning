import { Response, Request, NextFunction } from 'express';
import { User, Table } from './users.model';
import { db } from '../../db';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

export async function findAll(req: Request, res: Response<User[]>, next: NextFunction) {
  try {
    const users = await db<User>(Table).select('*');;
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function findOne(req: Request<ParamsWithId>, res: Response<User>, next: NextFunction) {
  try {
    const user = await db<User>(Table).select('*').where('id', parseInt(req.params.id)).first();
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function addOne(req: Request<{}, User, User>, res: Response<User>, next: NextFunction) {
  try {
    const id = await db<User>(Table).insert(req.body);
    console.log(`INSERTED ID ${id}`)
    const user = await db<User>(Table).select('*').where('id', id[0]).first();
    res.status(201);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(req: Request<ParamsWithId, User, User>, res: Response<User>, next: NextFunction) {
  try {
    const result = await db<User>(Table).where('id', parseInt(req.params.id)).update(req.body);
    console.log('UPDATED', result);
    const updated_user = await db<User>(Table).select('*').where('id', req.params.id);
    if (updated_user.length < 1) {
      res.status(404);
      throw new Error(`User with id "${req.params.id}" not found.`)
    }
    res.json(updated_user[0]);
  } catch (error) {
    next(error)
  }
}