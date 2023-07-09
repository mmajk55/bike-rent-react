import { Navigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { PropsWithChildren } from 'react';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { userId } = useAuth();

  if (!userId) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
