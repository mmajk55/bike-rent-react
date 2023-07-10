import asyncHandler from 'express-async-handler';
import { HttpError } from 'http-errors';
import knex from '../knex';
import { User } from '../models/user';
import { Bike, BikeType } from '../models/bike';
import { Location } from '../models/location';
import { Booking } from '../models/booking';
import express from 'express';
import authMiddleware from '../middleware/auth';

export interface UserData extends User {
  bookings: {
    id: number;
    bikeType: BikeType;
    start_time: string;
    end_time: string;
    locationName: string;
  }[];
}

const getUserData = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await knex<User>('users').where('users.id', id).first();

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const userBookings = await knex<User>('bookings')
      .where('bookings.user_id', id)
      .join<Bike>('bikes', 'bookings.bike_id', 'bikes.id')
      .join<Location>('locations', 'bookings.location_id', 'locations.id')
      .select(
        'bookings.id',
        'bikes.type as bikeType',
        'bookings.start_time',
        'bookings.end_time',
        'locations.name as locationName'
      );

    res.json({
      ...user,
      bookings: userBookings,
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

router.get('/:id', authMiddleware, getUserData);

export default router;
