import axios from 'axios';
import { Location } from '../types/locations';

export const GET_BOOKINGS_QUERY = 'GET_BOOKINGS_QUERY';
export const getBookings = async () => {
  const { data } = await axios.get<Location[]>(
    'http://localhost:3300/bookings'
  );

  return data;
};
