import { Response, Request, NextFunction } from 'express';
import { Goal, Table } from './goals.model';
import { db } from '../../db';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

export async function findAll(req: Request, res: Response<Goal[]>, next: NextFunction) {
  try {
    const goals = await db<Goal>(Table).select('*');;
    res.json(goals);
  } catch (error) {
    next(error);
  }
}

export async function findOne(req: Request<ParamsWithId>, res: Response<Goal>, next: NextFunction) {
  try {
    const goal = await db<Goal>(Table).select('*').where('id', parseInt(req.params.id)).first();
    res.json(goal);
  } catch (error) {
    next(error);
  }
}

export async function addOne(req: Request<{}, Goal, Goal>, res: Response<Goal>, next: NextFunction) {
  try {
    const id = await db<Goal>(Table).insert(req.body);
    console.log(`INSERTED ID ${id}`)
    const goal = await db<Goal>(Table).select('*').where('id', id[0]).first();
    res.status(201);
    res.json(goal);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(req: Request<ParamsWithId, Goal, Goal>, res: Response<Goal>, next: NextFunction) {
  try {
    const result = await db<Goal>(Table).where('id', parseInt(req.params.id)).update(req.body);
    console.log('UPDATED', result);
    const updated_goal = await db<Goal>(Table).select('*').where('id', req.params.id);
    if (updated_goal.length < 1) {
      res.status(404);
      throw new Error(`Goal with id "${req.params.id}" not found.`)
    }
    res.json(updated_goal[0]);
  } catch (error) {
    next(error)
  }
}