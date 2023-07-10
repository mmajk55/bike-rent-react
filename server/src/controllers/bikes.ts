import express from 'express';
import asyncHandler from 'express-async-handler';

import knex from '../knex';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const data = await knex('bikes');
    res.json(data);
  })
);

export default router;
