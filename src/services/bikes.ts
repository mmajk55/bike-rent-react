import axios from 'axios';
import { Bike } from '../types/bike';

export const GET_BIKES_QUERY = 'GET_BIKES';
export const getBikes = async () => {
  const { data } = await axios.get<Bike[]>('http://localhost:3300/bikes');

  return data;
};
