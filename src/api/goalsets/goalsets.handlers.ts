import { Response, Request, NextFunction } from 'express';
import { Goalset, Table } from './goalsets.model';
import { db } from '../../db';

export async function findAll(req: Request, res: Response<Goalset[]>, next: NextFunction) {
  try {
    const goalsets = await db<Goalset>(Table).select('*');;
    res.json(goalsets);
  } catch (error) {
    next(error);
  }
}

export async function findOne(req: Request<{id: number}>, res: Response<Goalset>, next: NextFunction) {
  try {
    const goalset = await db<Goalset>(Table).select('*').where('id', req.params.id).first();
    res.json(goalset);
  } catch (error) {
    next(error);
  }
}