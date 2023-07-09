import axios from 'axios';
import { Location } from '../types/locations';
import { Booking } from '../types/bookings';

export const GET_BOOKINGS_QUERY = 'GET_BOOKINGS_QUERY';
export const getBookings = async () => {
  const { data } = await axios.get<Location[]>(
    'http://localhost:3300/bookings'
  );

  return data;
};

export const GET_USER_BOOKINGS_QUERY = 'GET_USER_BOOKINGS_QUERY';
export const getUserBookings = async (userId: number) => {
  const { data } = await axios.get<Booking[]>(
    `http://localhost:3300/bookings/${userId}`
  );

  return data;
};

export const createBooking = async (params: Omit<Booking, 'id'>) => {
  const { data } = await axios.post<{ coins: number }>(
    'http://localhost:3300/bookings',
    params
  );

  return data.coins;
};
