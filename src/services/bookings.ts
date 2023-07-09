import axios from 'axios';
import { Location } from '../types/locations';
import { Booking } from '../types/bookings';

export const GET_BOOKINGS_QUERY = 'GET_BOOKINGS_QUERY';
export const getBookings = async () => {
  const { data } = await axios.get<Booking[]>('http://localhost:3300/bookings');

  return data;
};

export const createBooking = async (params: Omit<Booking, 'id'>) => {
  const { data } = await axios.post<{ coins: number }>(
    'http://localhost:3300/bookings',
    params
  );

  return data.coins;
};

export const deleteBooking = async (id: number) => {
  await axios.delete(`http://localhost:3300/bookings/${id}`);
};
