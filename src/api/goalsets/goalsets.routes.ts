import express from 'express';
import { Goalset } from './goalsets.model';
import * as GoalsetHandlers from './goalsets.handlers';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';

const router = express.Router();

router.get('/', GoalsetHandlers.findAll);

router.get('/:id', 
  validateRequest({
    params: ParamsWithId
  }),
  GoalsetHandlers.findOne
);

router.post('/', 
  validateRequest({
    body: Goalset,
  }),
  GoalsetHandlers.addOne
);

router.put('/:id',
  validateRequest({
    params: ParamsWithId,
    body: Goalset
  }),
  GoalsetHandlers.updateOne
)

export default router;