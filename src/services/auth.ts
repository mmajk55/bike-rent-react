import axios from 'axios';
import { User } from '../types/user';

export const loginUser = async (username: string) => {
  const { data: user } = await axios.post<User>('http://localhost:3300/auth', {
    username,
  });

  return user;
};
