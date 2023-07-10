import { z } from 'zod';
import { Bike } from '../../models/bike';
import { Booking } from '../../models/booking';
import { User } from '../../models/user';
import knex from '../../knex';

const BookingSchema = z.object({
  user_id: z.number(),
  bike_id: z.number(),
  location_id: z.number(),
  start_time: z.string(),
  end_time: z.string(),
});

export type BookingParams = z.infer<typeof BookingSchema>;

export class BookingService {
  public validateBookingData(data: unknown) {
    const result = BookingSchema.safeParse(data);
    return result;
  }

  public async getUserById(userId: number) {
    const user = await knex<User>('users').where({ id: userId }).first();
    return user;
  }

  public async getBikeById(bikeId: number) {
    const bike = await knex<Bike>('bikes').where({ id: bikeId }).first();
    return bike;
  }

  public async checkBikeAvailability(
    bikeId: number,
    locationId: number,
    startTime: string,
    endTime: string
  ) {
    const bikeBookings = await knex<Booking>('bookings')
      .where({ bike_id: bikeId })
      .where({ location_id: locationId })
      .where('start_time', '<=', endTime)
      .where('end_time', '>=', startTime);

    return bikeBookings.length === 0;
  }

  public checkUserCoins(user: User, bikePrice: number) {
    return Number(user?.coins || 0) >= bikePrice;
  }

  public async checkUserBookingsLimitCount(userId: number) {
    const userBookingsTotal = await knex('bookings').where({
      user_id: userId,
    });

    return userBookingsTotal.length >= 3;
  }

  public async checkUserBookingConflict(
    userId: number,
    startTime: string,
    endTime: string
  ) {
    const userBookings = await knex('bookings')
      .where({ user_id: userId })
      .where('start_time', '<=', endTime)
      .where('end_time', '>=', startTime);

    return userBookings.length !== 0;
  }

  public async createBooking(bookingData: BookingParams) {
    await knex('bookings').insert(bookingData);
  }

  public async updateCoinsAfterBooking(userId: number, bikePrice: number) {
    await knex<User>('users')
      .where({ id: userId })
      .update({ coins: knex.raw(`coins - ${bikePrice}`) });
  }

  public async getUnavailableDatesForBikeInLocation(
    bikeId: number,
    locationId: number
  ) {
    const bookings = await knex<Booking>('bookings')
      .where({ bike_id: bikeId })
      .where({ location_id: locationId });

    const unavailableDates = bookings.reduce((acc, booking) => {
      const startDate = new Date(booking.start_time);
      const endDate = new Date(booking.end_time);

      while (startDate <= endDate) {
        acc.push(startDate.toISOString());
        startDate.setDate(startDate.getDate() + 1);
      }

      return acc;
    }, [] as string[]);

    return unavailableDates;
  }

  public async cancelBooking(
    bookingId: number,
    userId: number,
    bikePrice: number
  ) {
    await knex('bookings').where({ id: bookingId }).del();

    await knex<User>('users')
      .where({ id: userId })
      .update({ coins: knex.raw(`coins + ${bikePrice}`) });
  }
}
