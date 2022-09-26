import express from 'express';
import { Plan } from './plans.model';
import * as PlanHandlers from './plans.handlers';
import { ParamsWithFileId } from '../../interfaces/ParamsWithFileId';

import { validateRequest } from '../../middlewares';

const router = express.Router();

router.get('/', PlanHandlers.findAll);

router.get('/:id', 
  validateRequest({
    params: ParamsWithFileId
  }),
  PlanHandlers.findOne
);

router.post('/', 
  validateRequest({
    body: Plan,
  }),
  PlanHandlers.addOne
);

router.put('/:id',
  validateRequest({
    params: ParamsWithFileId,
    body: Plan
  }),
  PlanHandlers.updateOne
)

export default router;