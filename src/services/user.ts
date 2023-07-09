import axios from 'axios';
import { User } from 'types/user';

export const GET_USER_DATA_QUERY = 'GET_USER_DATA_QUERY';
export const getUserData = async (id: number) => {
  const { data: user } = await axios.get<User>(
    `http://localhost:3300/user/${id}`
  );

  return user;
};
