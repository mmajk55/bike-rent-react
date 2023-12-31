import { ReactNode, createContext, useContext, useState } from 'react';
import handleError from 'utils/handleError';
import { useMutation } from '@tanstack/react-query';
import { LoginResponse, loginUser } from 'services/auth';
import axios from 'axios';

type AuthContext = {
  userId: number | null;
  isLoadingUser: boolean;
  handleLogin: (username: string) => Promise<LoginResponse> | void;
  handleLogout: () => void;
};

const defaultContext: AuthContext = {
  userId: null,
  isLoadingUser: false, // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleLogin: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleLogout: () => {},
};

const AuthContext = createContext<AuthContext>(defaultContext);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);

  if (!userId) {
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      };

      setUserId(Number(localStorage.getItem('userId')));
    }
  }

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.token && data.userId) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId.toString());

        axios.defaults.headers.common = {
          Authorization: `Bearer ${data.token}`,
        };

        setUserId(data.userId);

        return data.userId;
      }
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const handleLogout = () => {
    setUserId(null);
    axios.defaults.headers.common = {};
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin: mutateAsync,
        handleLogout,
        isLoadingUser: isLoading,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
