import { Route, Routes } from 'react-router-dom';
import BikeCategoryList from './BikeCategoryList/indext';
import { useQuery } from '@tanstack/react-query';
import { GET_BIKES_QUERY, getBikes } from '../../services/bikes';
import { groupBikesByType } from '../../utils/groupBikesByType';
import handleError from '../../utils/handleError';
import Navbar from '../../components/Navbar';

function DashboardRoutes() {
  const { isLoading, error, data } = useQuery({
    queryKey: [GET_BIKES_QUERY],
    queryFn: getBikes,
  });

  if (error) {
    handleError(error);
  }

  const groupedBikes = groupBikesByType(data);

  return (
    <>
      <Navbar />
      <div className="2xl:container 2xl:mx-auto sm:px-7 px-4 pt-32">
        <Routes>
          <Route
            index
            element={
              <BikeCategoryList
                groupedBikes={groupedBikes}
                isLoadingBikes={isLoading}
              />
            }
          />
          <Route path=":bikeType" element={<h1>BIKE TYPE</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default DashboardRoutes;
