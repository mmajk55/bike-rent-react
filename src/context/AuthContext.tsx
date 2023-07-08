import { ReactNode, createContext, useContext, useState } from 'react';
import handleError from '../utils/handleError';
import { User } from '../types/user';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/auth';

type AuthContextType = {
  user: User | null;
  isLoadingUser: boolean;
  handleLogin: (username: string) => Promise<User | void>;
  handleLogout: () => void;
};

const defaultContext: AuthContextType = {
  user: null,
  isLoadingUser: false,
  handleLogin: () => Promise.resolve(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleLogout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const handleLogout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        handleLogin: mutateAsync,
        user,
        handleLogout,
        isLoadingUser: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
