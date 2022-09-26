import { Response, Request, NextFunction } from 'express';
import { Leader, Table } from './leaders.model';
import { db } from '../../db';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

export async function findAll(req: Request, res: Response<Leader[]>, next: NextFunction) {
  try {
    const leaders = await db<Leader>(Table).select('*');;
    res.json(leaders);
  } catch (error) {
    next(error);
  }
}

export async function findOne(req: Request<ParamsWithId>, res: Response<Leader>, next: NextFunction) {
  try {
    const leader = await db<Leader>(Table).select('*').where('id', parseInt(req.params.id)).first();
    res.json(leader);
  } catch (error) {
    next(error);
  }
}

export async function addOne(req: Request<{}, Leader, Leader>, res: Response<Leader>, next: NextFunction) {
  try {
    const id = await db<Leader>(Table).insert(req.body);
    console.log(`INSERTED ID ${id}`)
    const leader = await db<Leader>(Table).select('*').where('id', id[0]).first();
    res.status(201);
    res.json(leader);
  } catch (error) {
    res.status(422);
    next(error);
  }
}

export async function updateOne(req: Request<ParamsWithId, Leader, Leader>, res: Response<Leader>, next: NextFunction) {
  try {
    const result = await db<Leader>(Table).where('id', parseInt(req.params.id)).update(req.body);
    console.log('UPDATED', result);
    const updated_leader = await db<Leader>(Table).select('*').where('id', req.params.id);
    if (updated_leader.length < 1) {
      res.status(404);
      throw new Error(`Leader with id "${req.params.id}" not found.`)
    }
    res.json(updated_leader[0]);
  } catch (error) {
    next(error)
  }
}