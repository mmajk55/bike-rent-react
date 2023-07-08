import { useNavigate, useParams } from 'react-router-dom';
import { BikeListProps } from '../DashboardRoutes';
import { BikeType } from '../../../types/bike';
import { LoadingSpinner } from '../../../components/Loader';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GET_LOCATIONS_QUERY, getLocations } from '../../../services/locations';
import { useQuery } from '@tanstack/react-query';
import { GET_BOOKINGS_QUERY, getBookings } from '../../../services/bookings';

type BikeRentForm = {
  bike: string;
  location: string;
  duration: [Date, Date];
};

const bikeFormSchema = z.object({
  bike: z.string().nonempty(),
  location: z.string().nonempty(),
  duration: z.date().array().length(2),
});

function BikeRentForm({ groupedBikes, isLoadingBikes }: BikeListProps) {
  const { isLoading: isLoadingLocations, data: locations } = useQuery({
    queryKey: [GET_LOCATIONS_QUERY],
    queryFn: getLocations,
  });

  const { isLoading: isLoadingBookings, data: bookings } = useQuery({
    queryKey: [GET_BOOKINGS_QUERY],
    queryFn: getBookings,
  });

  const isLoading = isLoadingLocations || isLoadingBookings || isLoadingBikes;
  const hasRequiredFormData = !!locations && !!bookings && !!groupedBikes;

  const { bikeType } = useParams<{ bikeType: BikeType }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BikeRentForm>({
    resolver: zodResolver(bikeFormSchema),
  });

  if (!bikeType) {
    navigate('/dashboard');
    return;
  }

  const bikes = groupedBikes?.[bikeType];

  const onSubmit = (data: BikeRentForm) => {
    console.log('DATA', data);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="md:w-1/2">
        <h1 className="text-3xl font-semibold text-gray-800 text-center pb-8">
          Rent an {bikeType} bike
        </h1>
        {isLoading && <LoadingSpinner />}
        {!isLoading && !hasRequiredFormData && (
          <h1 className="text-xl  text-gray-800 text-center">
            No bikes to rent
          </h1>
        )}
        {!isLoading && hasRequiredFormData && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center justify-start p-4 bg-white rounded-md shadow-xl">
              <label htmlFor="bike" className="mb-2 text-left">
                Bike
              </label>
              <select
                {...register('bike')}
                name="bike"
                id="bike"
                className="w-56 px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-300"
              >
                {bikes?.map((bike) => (
                  <option value={bike.id} key={bike.id}>
                    {bike.id}
                  </option>
                ))}
              </select>
              <label htmlFor="location" className="mb-2">
                Location
              </label>
              <select
                {...register('location')}
                name="location"
                id="location"
                className="w-56 px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-300"
              >
                {locations?.map((location) => (
                  <option value={location.id} key={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              <label htmlFor="startDate" className="mb-1">
                Duration
              </label>
              <Controller
                control={control}
                name="duration"
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select date"
                    onChange={(date) => {
                      if (!date) return;

                      field.onChange(date as [Date, Date]);
                    }}
                    selectsRange
                    startDate={field.value[0]}
                    endDate={field.value[1]}
                    minDate={new Date()}
                    className="w-56 px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                  />
                )}
              />
              {errors.duration && (
                <p className="text-red-500 mb-2">{errors.duration.message}</p>
              )}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-2 text-white rounded-md bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Rent
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default BikeRentForm;
