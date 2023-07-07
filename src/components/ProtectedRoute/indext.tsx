import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { PropsWithChildren } from 'react';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();

  if (!user) {
    toast.error('You must be logged in to access this page.');
    <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
