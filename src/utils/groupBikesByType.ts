import { Bike } from '../types/bike';

export const groupBikesByType = (bikes: Bike[]) => {
  return bikes.reduce((acc, bike) => {
    if (!acc[bike.type]) {
      acc[bike.type] = [];
    }

    acc[bike.type].push(bike);

    return acc;
  }, {} as { [key: string]: Bike[] });
};
