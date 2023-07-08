import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../../../components/Loader';
import { BikeListProps } from '../DashboardRoutes';

const BikeCategoryList = ({ groupedBikes, isLoadingBikes }: BikeListProps) => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 text-center pb-10">
        Bikes to rent
      </h1>
      {isLoadingBikes && <LoadingSpinner />}
      {!groupedBikes && !isLoadingBikes && (
        <h1 className="text-xl  text-gray-800 text-center">No bikes to rent</h1>
      )}
      {groupedBikes && (
        <div
          className={`block md:grid grid-cols-${
            Object.keys(groupedBikes).length
          } gap-2`}
        >
          {Object.keys(groupedBikes)?.map((bikeType) => (
            <Link to={`/dashboard/${bikeType}`} key={bikeType}>
              <div
                key={bikeType}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-md shadow-md"
              >
                <img src={''} className="w-36 h-36 rounded-full" />
                <h3 className="mt-2 text-lg font-semibold text-gray-800">
                  {bikeType.toUpperCase()}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default BikeCategoryList;
