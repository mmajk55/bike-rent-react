export interface Booking {
  id: number;
  user_id: number;
  bike_id: number;
  location_id: number;
  start_time: Date;
  end_time: Date;
  created_at: Date;
  updated_at: Date;
}
