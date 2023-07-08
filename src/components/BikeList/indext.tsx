import { useQuery } from 'react-query';
import { GET_BIKES_QUERY, getBikes } from '../../services/bikes';
import { LoadingSpinner } from '../Loader';
import handleError from '../../utils/handleError';
import { groupBikesByType } from '../../utils/groupBikesByType';

const BikeList = () => {
  const { isLoading, error, data } = useQuery(GET_BIKES_QUERY, () =>
    getBikes()
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    handleError(error);
  }

  if (!data) {
    return null;
  }

  const groupedBikes = groupBikesByType(data);

  return (
    <div className={`grid grid-cols-${Object.keys(groupedBikes).length} gap-2`}>
      {Object.keys(groupedBikes)?.map((bikeType) => (
        <div
          key={bikeType}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-md shadow-md"
        >
          <img src={''} className="w-36 h-36 rounded-full" />
          <h3 className="mt-2 text-lg font-semibold text-gray-800">
            {bikeType.toUpperCase()}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default BikeList;
