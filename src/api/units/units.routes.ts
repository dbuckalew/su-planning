import express from 'express';
import { Unit } from './units.model';
import * as UnitHandlers from './units.handlers';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';

const router = express.Router();

router.get('/', UnitHandlers.findAll);

router.get('/:id', 
  validateRequest({
    params: ParamsWithId
  }),
  UnitHandlers.findOne
);

router.post('/', 
  validateRequest({
    body: Unit,
  }),
  UnitHandlers.addOne
);

router.put('/:id',
  validateRequest({
    params: ParamsWithId,
    body: Unit
  }),
  UnitHandlers.updateOne
)

export default router;