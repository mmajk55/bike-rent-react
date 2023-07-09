import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import handleError from '../utils/handleError';
import { User } from '../types/user';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/auth';
import axios from 'axios';

type AuthContextType = {
  user: User | null;
  isLoadingUser: boolean;
  handleLogin: (username: string) => Promise<User | void>;
  handleLogout: () => void;
  updateUserCoins: (coins: number) => void;
};

const defaultContext: AuthContextType = {
  user: null,
  isLoadingUser: false,
  handleLogin: () => Promise.resolve(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleLogout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateUserCoins: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.token) {
        setUser(data);

        axios.defaults.headers.common = {
          Authorization: `Bearer ${data.token}`,
        };
      }
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const updateUserCoins = useCallback((coins: number) => {
    setUser((prevUser) => {
      if (!prevUser) return null;

      return {
        ...prevUser,
        coins,
      };
    });
  }, []);

  const handleLogout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        handleLogin: mutateAsync,
        user,
        handleLogout,
        isLoadingUser: isLoading,
        updateUserCoins,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
