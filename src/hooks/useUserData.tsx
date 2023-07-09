import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { GET_USER_DATA_QUERY, getUserData } from '../services/user';

const useUserData = () => {
  const { userId } = useAuth();

  const {
    isLoading: isLoadingUser,
    data: user,
    isError: userError,
  } = useQuery({
    queryKey: [GET_USER_DATA_QUERY, userId],
    queryFn: () => getUserData(userId || 0),
  });

  return { isLoadingUser, user, userError };
};

export default useUserData;
