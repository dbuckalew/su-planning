import express from 'express';
import { Goal } from './goals.model';
import * as GoalHandlers from './goals.handlers';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';

const router = express.Router();

router.get('/', GoalHandlers.findAll);

router.get('/:id', 
  validateRequest({
    params: ParamsWithId
  }),
  GoalHandlers.findOne
);

router.post('/', 
  validateRequest({
    body: Goal,
  }),
  GoalHandlers.addOne
);

router.put('/:id',
  validateRequest({
    params: ParamsWithId,
    body: Goal
  }),
  GoalHandlers.updateOne
)

export default router;