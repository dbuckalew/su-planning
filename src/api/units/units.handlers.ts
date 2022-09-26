import { Response, Request, NextFunction } from 'express';
import { Unit, Table } from './units.model';
import { db } from '../../db';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

export async function findAll(req: Request, res: Response<Unit[]>, next: NextFunction) {
  try {
    const units = await db<Unit>(Table).select('*');;
    res.json(units);
  } catch (error) {
    next(error);
  }
}

export async function findOne(req: Request<ParamsWithId>, res: Response<Unit>, next: NextFunction) {
  try {
    const unit = await db<Unit>(Table).select('*').where('id', parseInt(req.params.id)).first();
    res.json(unit);
  } catch (error) {
    next(error);
  }
}

export async function addOne(req: Request<{}, Unit, Unit>, res: Response<Unit>, next: NextFunction) {
  try {
    const id = await db<Unit>(Table).insert(req.body);
    // console.log(`INSERTED ID ${id}`)
    const unit = await db<Unit>(Table).select('*').where('id', id[0]).first();
    res.status(201);
    res.json(unit);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(req: Request<ParamsWithId, Unit, Unit>, res: Response<Unit>, next: NextFunction) {
  try {
    const result = await db<Unit>(Table).where('id', parseInt(req.params.id)).update(req.body);
    // console.log('UPDATED', result);
    const updated_unit = await db<Unit>(Table).select('*').where('id', req.params.id);
    if (updated_unit.length < 1) {
      res.status(404);
      throw new Error(`Unit with id "${req.params.id}" not found.`)
    }
    res.json(updated_unit[0]);
  } catch (error) {
    next(error)
  }
}