import express, { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { HttpError } from 'http-errors';
import authMiddleware from '../../middleware/auth';
import knex from '../../knex';
import { BookingParams, BookingService } from './bookings.service';
import { isDateThreeDaysAhead } from '../../utils/dates';
import { getBikePrice } from '../../utils/getBikePrice';
import { Booking } from '../../models/booking';

const bookingService = new BookingService();

const createBookingHandler: RequestHandler<
  unknown,
  unknown,
  BookingParams,
  unknown
> = asyncHandler(async (req, res, next) => {
  try {
    const result = bookingService.validateBookingData(req.body);

    if (!result.success) {
      res.status(400).json({ error: result.error });
      return;
    }

    const { start_time, end_time, user_id, bike_id, location_id } = result.data;

    const user = await bookingService.getUserById(user_id);
    const bike = await bookingService.getBikeById(bike_id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (!bike) {
      res.status(404).json({ error: 'Bike not found' });
      return;
    }

    if (!isDateThreeDaysAhead(start_time)) {
      res.status(400).json({
        error: 'The reservation must be made at least 3 days in advance',
      });
      return;
    }

    const isBikeAvailable = await bookingService.checkBikeAvailability(
      bike_id,
      location_id,
      start_time,
      end_time
    );

    if (!isBikeAvailable) {
      res.status(400).json({
        error: 'Bike is not available in selected location in this time frame',
      });
      return;
    }

    const bikePrice = getBikePrice({
      start_time,
      end_time,
      price_per_day: bike?.price_per_day || 0,
    });

    if (!bookingService.checkUserCoins(user, bikePrice)) {
      res.status(400).json({ error: 'User does not have enough coins' });
      return;
    }

    const userReachedLimit = await bookingService.checkUserBookingsLimitCount(
      user_id
    );

    if (userReachedLimit) {
      res.status(400).json({ error: 'User has already 3 bookings' });
      return;
    }

    const userBookingConflict = await bookingService.checkUserBookingConflict(
      user_id,
      start_time,
      end_time
    );

    if (userBookingConflict) {
      res
        .status(400)
        .json({ error: 'User has another booking in this time frame' });
      return;
    }

    await bookingService.createBooking(result.data);

    await bookingService.updateCoinsAfterBooking(user_id, bikePrice);

    res.status(201).json({
      message: 'Booking created',
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

const getUnavailableDatesForBikeInLocationHandler = asyncHandler(
  async (req, res, next) => {
    try {
      const { bike_id, location_id } = req.params;

      const bike = await bookingService.getBikeById(Number(bike_id));

      if (!bike) {
        res.status(404).json({ error: 'Bike not found' });
        return;
      }

      const unavailableDates =
        await bookingService.getUnavailableDatesForBikeInLocation(
          Number(bike_id),
          Number(location_id)
        );

      res.status(200).json(unavailableDates);
    } catch (error) {
      if (error instanceof HttpError) {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
      }

      next(error);
    }
  }
);

const cancelBookingHandler = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await knex<Booking>('bookings')
      .where({ id: Number(id) })
      .first();

    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    const user = await bookingService.getUserById(booking.user_id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const bike = await bookingService.getBikeById(booking.bike_id);

    if (!bike) {
      res.status(404).json({ error: 'Bike not found' });
      return;
    }

    const bikePrice = getBikePrice({
      start_time: booking.start_time,
      end_time: booking.end_time,
      price_per_day: bike.price_per_day,
    });

    await bookingService.cancelBooking(Number(id), user.id, bikePrice);

    res.json({ message: 'Booking canceled' });
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

router.post('/', authMiddleware, createBookingHandler);

router.get(
  '/unavailable/:bike_id/:location_id',
  authMiddleware,
  getUnavailableDatesForBikeInLocationHandler
);

router.delete('/:id', authMiddleware, cancelBookingHandler);

export default router;
