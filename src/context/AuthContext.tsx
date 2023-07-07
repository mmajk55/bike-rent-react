import axios from 'axios';
import { ReactNode, createContext, useContext, useState } from 'react';
import handleError from '../utils/handleError';

export type User = {
  id: number;
  username: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  handleLogin: (username: string) => Promise<void>;
};

const defaultContext: AuthContextType = {
  user: null,
  handleLogin: () => Promise.resolve(),
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);

  const handleLogin = async (username: string) => {
    try {
      const { data } = await axios.post<User>('http://localhost:3300/auth', {
        username,
      });

      const user = data;

      if (user.token) {
        setUser(user);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AuthContext.Provider value={{ handleLogin, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
