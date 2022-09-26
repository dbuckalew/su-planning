import { Response, Request, NextFunction } from 'express';
import { Plan, Table } from './plans.model';
import { db } from '../../db';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

export async function findAll(req: Request, res: Response<Plan[]>, next: NextFunction) {
  try {
    const plans = await db<Plan>(Table).select('*');;
    res.json(plans);
  } catch (error) {
    next(error);
  }
}

export async function findOne(req: Request<ParamsWithId>, res: Response<Plan>, next: NextFunction) {
  try {
    const plans = await db<Plan>(Table).select('*').where('id', parseInt(req.params.id)).first();
    res.json(plans);
  } catch (error) {
    next(error);
  }
}

export async function addOne(req: Request<{}, Plan, Plan>, res: Response<Plan>, next: NextFunction) {
  try {
    const id = await db<Plan>(Table).insert(req.body);
    console.log(`INSERTED ID ${id}`)
    const plan = await db<Plan>(Table).select('*').where('fileID', id[0]).first();
    res.status(201);
    res.json(plan);
  } catch (error) {
    res.status(422);
    next(error);
  }
}

export async function updateOne(req: Request<ParamsWithId, Plan, Plan>, res: Response<Plan>, next: NextFunction) {
  try {
    const result = await db<Plan>(Table).where('fileID', parseInt(req.params.id)).update(req.body);
    console.log('UPDATED', result);
    const updated_plan = await db<Plan>(Table).select('*').where('fileID', req.params.id);
    if (updated_plan.length < 1) {
      res.status(404);
      throw new Error(`Plan with id "${req.params.id}" not found.`)
    }
    res.json(updated_plan[0]);
  } catch (error) {
    next(error)
  }
}