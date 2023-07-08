export type BikeType = 'modern' | 'classic' | 'electric';

export type Bike = {
  id: number;
  type: BikeType;
  price_per_day: number;
};
