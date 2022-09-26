import { Response, Request, NextFunction } from 'express';
import { Plan, Table } from './plans.model';
import { db } from '../../db';
import { ParamsWithFileId } from '../../interfaces/ParamsWithFileId';

//    console.log(`INSERTING USER ${JSON.stringify(req.body)}`);
export async function findAll(req: Request, res: Response<Plan[]>, next: NextFunction) {
  try {
    const plans = await db<Plan>(Table).select('*');;
    res.json(plans);
  } catch (error) {
    next(error);
  }
}

export async function findOne(req: Request<ParamsWithFileId>, res: Response<Plan>, next: NextFunction) {
  console.log(`PLANS REQ PARAMS: ${JSON.stringify(req.params)}`);
  try {
    const plans = await db<Plan>(Table).select('*').where('fileID', parseInt(req.params.fileID)).first();
    console.log(`SINGLE PLAN RETURNED: ${JSON.stringify(plans)}`);
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

export async function updateOne(req: Request<ParamsWithFileId, Plan, Plan>, res: Response<Plan>, next: NextFunction) {
  console.log(`UPDATING PLAN: ${JSON.stringify(req.body)}`);
  try {
    const result = await db<Plan>(Table).where('fileID', parseInt(req.params.fileID)).update(req.body);
    console.log('UPDATED', result);
    const updated_plan = await db<Plan>(Table).select('*').where('fileID', req.params.fileID);
    if (updated_plan.length < 1) {
      res.status(404);
      throw new Error(`Plan with id "${req.params.fileID}" not found.`)
    }
    res.json(updated_plan[0]);
  } catch (error) {
    console.error(`ERROR UPDATING PLAN: ${JSON.stringify(error)}`);
    next(error)
  }
}
