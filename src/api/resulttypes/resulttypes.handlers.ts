import { Response, Request, NextFunction } from 'express';
import { ResultType, Table } from './resulttypes.model';
import { db } from '../../db';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

export async function findAll(req: Request, res: Response<ResultType[]>, next: NextFunction) {
  try {
    const resulttypes = await db<ResultType>(Table).select('*');;
    res.json(resulttypes);
  } catch (error) {
    next(error);
  }
}

export async function findOne(req: Request<ParamsWithId>, res: Response<ResultType>, next: NextFunction) {
  try {
    const resulttype = await db<ResultType>(Table).select('*').where('id', parseInt(req.params.id)).first();
    res.json(resulttype);
  } catch (error) {
    next(error);
  }
}

export async function addOne(req: Request<{}, ResultType, ResultType>, res: Response<ResultType>, next: NextFunction) {
  try {
    const id = await db<ResultType>(Table).insert(req.body);
    console.log(`INSERTED ID ${id}`)
    const resulttype = await db<ResultType>(Table).select('*').where('id', id[0]).first();
    res.status(201);
    res.json(resulttype);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(req: Request<ParamsWithId, ResultType, ResultType>, res: Response<ResultType>, next: NextFunction) {
  try {
    const result = await db<ResultType>(Table).where('id', parseInt(req.params.id)).update(req.body);
    console.log('UPDATED', result);
    const updated_resultttype = await db<ResultType>(Table).select('*').where('id', req.params.id);
    if (updated_resultttype.length < 1) {
      res.status(404);
      throw new Error(`Result Type with id "${req.params.id}" not found.`)
    }
    res.json(updated_resultttype[0]);
  } catch (error) {
    next(error)
  }
}