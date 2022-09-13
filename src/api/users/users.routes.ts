import express from 'express';
import { User } from './users.model';
import * as UserHandlers from './users.handlers';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';

const router = express.Router();

router.get('/', UserHandlers.findAll);

router.get('/:id', 
  validateRequest({
    params: ParamsWithId
  }),
  UserHandlers.findOne
);

router.post('/', 
  validateRequest({
    body: User,
  }),
  UserHandlers.addOne
);

router.put('/:id',
  validateRequest({
    params: ParamsWithId,
    body: User
  }),
  UserHandlers.updateOne
)

export default router;