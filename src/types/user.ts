import { BikeType } from './bike';

export type UserBooking = {
  id: number;
  bikeType: BikeType;
  start_time: string;
  end_time: string;
  locationName: string;
};

export type User = {
  id: number;
  name: string;
  token: string;
  coins: number;
  bookings?: UserBooking[];
};
