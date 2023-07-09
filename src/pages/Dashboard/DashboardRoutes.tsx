import { Route, Routes } from 'react-router-dom';
import BikeCategoryList from './BikeCategoryList/indext';
import { useQuery } from '@tanstack/react-query';
import { GET_BIKES_QUERY, getBikes } from '../../services/bikes';
import { GroupedBikes, groupBikesByType } from '../../utils/groupBikesByType';
import Navbar from '../../components/Navbar';
import BikeRentForm from './BikeRentForm';
import {
  GET_USER_BOOKINGS_QUERY,
  getUserBookings,
} from '../../services/bookings';
import { useAuth } from '../../context/AuthContext';

export interface BikeListProps {
  groupedBikes?: GroupedBikes;
  isLoadingBikes: boolean;
}

function DashboardRoutes() {
  const { isLoading: isLoadingBikes, data: bikes } = useQuery({
    queryKey: [GET_BIKES_QUERY],
    queryFn: getBikes,
  });

  const groupedBikes = groupBikesByType(bikes);

  const bikeListProps: BikeListProps = {
    groupedBikes,
    isLoadingBikes: isLoadingBikes,
  };

  return (
    <>
      <Navbar />
      <div className="2xl:container 2xl:mx-auto sm:px-7 px-4 pt-24 pb-12">
        <Routes>
          <Route index element={<BikeCategoryList {...bikeListProps} />} />
          <Route
            path=":bikeType"
            element={<BikeRentForm {...bikeListProps} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default DashboardRoutes;
