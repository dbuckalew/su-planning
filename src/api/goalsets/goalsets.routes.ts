import express from 'express';
import { Request, Response } from 'express';
import * as Goalsets from './goalsets.handlers';
import { db } from '../../db';

const router = express.Router();

router.get('/', Goalsets.findAll);

router.get('/:id', Goalsets.findOne);

export default router;