import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import users from './users/users.routes';
import goalsets from './goalsets/goalsets.routes';
import goals from './goals/goals.routes';
import units from './units/units.routes';
import resulttypes from './resulttypes/resulttypes.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/users', users);
router.use('/goalsets', goalsets);
router.use('/goals', goals);
router.use('/units', units);
router.use('/types', resulttypes);

export default router;
