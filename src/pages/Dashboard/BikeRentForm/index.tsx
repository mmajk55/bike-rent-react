import { useNavigate, useParams } from 'react-router-dom';
import { BikeListProps } from '../DashboardRoutes';
import { BikeType } from '../../../types/bike';
import { LoadingSpinner } from '../../../components/Loader';

function BikeRentForm({ groupedBikes, isLoadingBikes }: BikeListProps) {
  const { bikeType } = useParams<{ bikeType: BikeType }>();
  const navigate = useNavigate();

  if (!bikeType) {
    navigate('/dashboard');
    return;
  }

  const bikes = groupedBikes?.[bikeType];

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 text-center pb-10">
        Type: {bikeType.toUpperCase()}
      </h1>
      {isLoadingBikes && <LoadingSpinner />}
      {!isLoadingBikes && !groupedBikes && (
        <h1 className="text-xl  text-gray-800 text-center">No bikes to rent</h1>
      )}
      {!isLoadingBikes && groupedBikes && (
        <form>
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-md shadow-md">
            <label htmlFor="bike">Bike</label>
            <select name="bike" id="bike">
              {bikes?.map((bike) => (
                <option value={bike.id}>{bike.id}</option>
              ))}
            </select>
            <label htmlFor="location">Location</label>
            <select name="location" id="location">
              <option value="1">Location 1</option>
              <option value="2">Location 2</option>
            </select>
            <label htmlFor="start-date">Start Date</label>
            <input type="date" name="start-date" id="start-date" />
            <label htmlFor="end-date">End Date</label>
            <input type="date" name="end-date" id="end-date" />
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </>
  );
}

export default BikeRentForm;
