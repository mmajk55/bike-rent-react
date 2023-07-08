import { Route, Routes } from 'react-router-dom';
import BikeCategoryList from './BikeCategoryList/indext';
import { useQuery } from '@tanstack/react-query';
import { GET_BIKES_QUERY, getBikes } from '../../services/bikes';
import { GroupedBikes, groupBikesByType } from '../../utils/groupBikesByType';
import handleError from '../../utils/handleError';
import Navbar from '../../components/Navbar';
import BikeRentForm from './BikeRentForm';

export interface BikeListProps {
  groupedBikes?: GroupedBikes;
  isLoadingBikes: boolean;
}

function DashboardRoutes() {
  const { isLoading, error, data } = useQuery({
    queryKey: [GET_BIKES_QUERY],
    queryFn: getBikes,
  });

  if (error) {
    handleError(error);
  }

  const groupedBikes = groupBikesByType(data);

  const bikeListProps: BikeListProps = {
    groupedBikes,
    isLoadingBikes: isLoading,
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
