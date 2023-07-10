import express, { RequestHandler } from 'express';
import { z } from 'zod';
import { User } from '../models/user';
import asyncHandler from 'express-async-handler';
import { HttpError } from 'http-errors';
import knex from '../knex';

const SignInSchema = z.object({
  username: z.string(),
});

type SignInParams = z.infer<typeof SignInSchema>;

const signIn: RequestHandler<unknown, unknown, SignInParams, unknown> =
  asyncHandler(async (req, res, next) => {
    const result = SignInSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ error: result.error });
      return;
    }

    const { username } = result.data;

    try {
      const user = await knex<User>('users').where({ name: username }).first();

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({
        userId: user.id,
        token: user.token,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
      }

      next(error);
    }
  });

const router = express.Router();

router.post('/', signIn);

export default router;
