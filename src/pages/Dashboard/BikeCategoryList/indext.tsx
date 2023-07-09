import { Link } from 'react-router-dom';
import { LoadingSpinner } from 'components/Loader';
import { BikeListProps } from '../DashboardRoutes';
import { BikeType } from 'types/bike';
import { ReactComponent as ClassicBike } from 'assets/classic.svg';
import { ReactComponent as ElectricBike } from 'assets/electric.svg';
import { ReactComponent as ModernBike } from 'assets/modern.svg';

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
          className={`block md:grid grid-cols-3 gap-2`}
        >
          {Object.keys(groupedBikes)?.map((bikeType) => (
            <Link to={`/dashboard/${bikeType}`} key={bikeType}>
              <div
                key={bikeType}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-md shadow-md hover:shadow-xl transition duration-300 ease-in-out"
              >
                {getBikeIcon(bikeType as BikeType)}
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


function getBikeIcon (bikeType: BikeType) {
  switch (bikeType) {
    case 'classic':
      return <ClassicBike className='w-36 h-36' />;
    case 'modern':
      return <ModernBike className='w-36 h-36' />;
    case 'electric':
      return <ElectricBike className='w-36 h-36' />;
  }
}

export default BikeCategoryList;
