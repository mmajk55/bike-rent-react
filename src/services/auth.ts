import axios from 'axios';

export type LoginResponse = {
  token: string;
  userId: number;
};

export const loginUser = async (username: string) => {
  const { data } = await axios.post<LoginResponse>(
    'http://localhost:3300/auth',
    {
      username,
    }
  );

  return data;
};
