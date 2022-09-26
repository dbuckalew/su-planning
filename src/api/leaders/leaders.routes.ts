import express from 'express';
import { Leader } from './leaders.model';
import * as LeaderHandlers from './leaders.handlers';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';

const router = express.Router();

router.get('/', LeaderHandlers.findAll);

router.get('/:id', 
  validateRequest({
    params: ParamsWithId
  }),
  LeaderHandlers.findOne
);

router.post('/', 
  validateRequest({
    body: Leader,
  }),
  LeaderHandlers.addOne
);

router.put('/:id',
  validateRequest({
    params: ParamsWithId,
    body: Leader
  }),
  LeaderHandlers.updateOne
)

export default router;