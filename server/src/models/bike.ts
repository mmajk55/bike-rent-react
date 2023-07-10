export type BikeType = 'modern' | 'classic' | 'electric';

export interface Bike {
  id: number;
  type: BikeType;
  price_per_day: number;
}
