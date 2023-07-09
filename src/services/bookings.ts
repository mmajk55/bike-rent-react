import axios from 'axios';
import { Booking } from '../types/bookings';

export type GetUnavailableDatesParams = {
  bikeId?: string;
  locationId?: string;
};

export const GET_UNAVAILABlE_DATES = 'GET_UNAVAILABlE_DATES';
export const getUnavailableDates = async ({
  bikeId,
  locationId,
}: GetUnavailableDatesParams) => {
  if (!bikeId || !locationId) {
    return [];
  }

  const { data } = await axios.get<string[]>(
    `http://localhost:3300/bookings/unavailable/${bikeId}/${locationId}`
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

export const deleteBooking = async (id: number) => {
  await axios.delete(`http://localhost:3300/bookings/${id}`);
};
