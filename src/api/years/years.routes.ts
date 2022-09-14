import express from 'express';
import { Year } from './years.model';
import * as YearHandlers from './years.handlers';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';

const router = express.Router();

router.get('/', YearHandlers.findAll);

router.get('/:id', 
  validateRequest({
    params: ParamsWithId
  }),
  YearHandlers.findOne
);

router.post('/', 
  validateRequest({
    body: Year,
  }),
  YearHandlers.addOne
);

router.put('/:id',
  validateRequest({
    params: ParamsWithId,
    body: Year
  }),
  YearHandlers.updateOne
)

export default router;