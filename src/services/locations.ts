import axios from 'axios';
import { Location } from 'types/locations';

export const GET_LOCATIONS_QUERY = 'GET_LOCATIONS_QUERY';
export const getLocations = async () => {
  const { data } = await axios.get<Location[]>(
    'http://localhost:3300/locations'
  );

  return data;
};
