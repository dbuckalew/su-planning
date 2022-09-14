import express from 'express';
import { ResultType } from './resulttypes.model';
import * as ResultTypeHandlers from './resulttypes.handlers';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';

const router = express.Router();

router.get('/', ResultTypeHandlers.findAll);

router.get('/:id', 
  validateRequest({
    params: ParamsWithId
  }),
  ResultTypeHandlers.findOne
);

router.post('/', 
  validateRequest({
    body: ResultType,
  }),
  ResultTypeHandlers.addOne
);

router.put('/:id',
  validateRequest({
    params: ParamsWithId,
    body: ResultType
  }),
  ResultTypeHandlers.updateOne
)

export default router;