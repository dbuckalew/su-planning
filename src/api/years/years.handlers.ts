import { Response, Request, NextFunction } from 'express';
import { Year, Table } from './years.model';
import { db } from '../../db';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

export async function findAll(req: Request, res: Response<Year[]>, next: NextFunction) {
  try {
    const years = await db<Year>(Table).select('*');;
    res.json(years);
  } catch (error) {
    next(error);
  }
}

export async function findOne(req: Request<ParamsWithId>, res: Response<Year>, next: NextFunction) {
  try {
    const year = await db<Year>(Table).select('*').where('id', parseInt(req.params.id)).first();
    res.json(year);
  } catch (error) {
    next(error);
  }
}

export async function addOne(req: Request<{}, Year, Year>, res: Response<Year>, next: NextFunction) {
  try {
    const id = await db<Year>(Table).insert(req.body);
    console.log(`INSERTED ID ${id}`)
    const year = await db<Year>(Table).select('*').where('id', id[0]).first();
    res.status(201);
    res.json(year);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(req: Request<ParamsWithId, Year, Year>, res: Response<Year>, next: NextFunction) {
  try {
    const result = await db<Year>(Table).where('id', parseInt(req.params.id)).update(req.body);
    console.log('UPDATED', result);
    const updated_year = await db<Year>(Table).select('*').where('id', req.params.id);
    if (updated_year.length < 1) {
      res.status(404);
      throw new Error(`Year with id "${req.params.id}" not found.`)
    }
    res.json(updated_year[0]);
  } catch (error) {
    next(error)
  }
}