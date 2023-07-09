import { Route, Routes, useNavigate } from 'react-router-dom';
import BikeCategoryList from './BikeCategoryList/indext';
import { useQuery } from '@tanstack/react-query';
import { GET_BIKES_QUERY, getBikes } from '../../services/bikes';
import { GroupedBikes, groupBikesByType } from '../../utils/groupBikesByType';
import Navbar from '../../components/Navbar';
import BikeRentForm from './BikeRentForm';
import MyBookings from './MyBookings';
import { LoadingPage } from '../../components/Loader';
import useUserData from '../../hooks/useUserData';

export interface BikeListProps {
  groupedBikes?: GroupedBikes;
  isLoadingBikes: boolean;
}

function DashboardRoutes() {
  const { isLoading: isLoadingBikes, data: bikes } = useQuery({
    queryKey: [GET_BIKES_QUERY],
    queryFn: getBikes,
  });

  const { isLoadingUser, user, userError } = useUserData();

  const naviate = useNavigate();

  const groupedBikes = groupBikesByType(bikes);

  const bikeListProps: BikeListProps = {
    groupedBikes,
    isLoadingBikes: isLoadingBikes,
  };

  if (userError) {
    naviate('/auth');
  }

  return (
    <>
      {isLoadingUser && <LoadingPage />}
      {user && (
        <>
          <Navbar userName={user.name} coins={user.coins} />
          <div className="2xl:container 2xl:mx-auto sm:px-7 px-4 pt-24 pb-12">
            <Routes>
              <Route index element={<BikeCategoryList {...bikeListProps} />} />
              <Route
                path=":bikeType"
                element={<BikeRentForm {...bikeListProps} />}
              />
              <Route
                path="/my-bookings"
                element={<MyBookings userBookings={user.bookings} />}
              />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}

export default DashboardRoutes;
