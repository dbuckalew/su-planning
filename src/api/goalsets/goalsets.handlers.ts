import { Response, Request, NextFunction } from 'express';
import { Goalset, Table } from './goalsets.model';
import { db } from '../../db';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

export async function findAll(req: Request, res: Response<Goalset[]>, next: NextFunction) {
  try {
    const goalsets = await db<Goalset>(Table).select('*');;
    res.json(goalsets);
  } catch (error) {
    next(error);
  }
}

export async function findOne(req: Request<ParamsWithId>, res: Response<Goalset>, next: NextFunction) {
  try {
    const goalset = await db<Goalset>(Table).select('*').where('id', parseInt(req.params.id)).first();
    res.json(goalset);
  } catch (error) {
    next(error);
  }
}

export async function addOne(req: Request<{}, Goalset, Goalset>, res: Response<Goalset>, next: NextFunction) {
  try {
    const id = await db<Goalset>(Table).insert(req.body);
    console.log(`INSERTED ID ${id}`)
    const goalset = await db<Goalset>(Table).select('*').where('id', id[0]).first();
    res.status(201);
    res.json(goalset);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(req: Request<ParamsWithId, Goalset, Goalset>, res: Response<Goalset>, next: NextFunction) {
  try {
    const result = await db<Goalset>(Table).where('id', parseInt(req.params.id)).update(req.body);
    console.log('UPDATED', result);
    const updated_goalset = await db<Goalset>(Table).select('*').where('id', req.params.id);
    if (updated_goalset.length < 1) {
      res.status(404);
      throw new Error(`Goalset with id "${req.params.id}" not found.`)
    }
    res.json(updated_goalset[0]);
  } catch (error) {
    next(error)
  }
}