import { useParams } from 'react-router-dom';
import { BikeListProps } from '../DashboardRoutes';
import { BikeType } from 'types/bike';
import { LoadingSpinner } from 'components/Loader';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GET_LOCATIONS_QUERY, getLocations } from 'services/locations';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  GET_UNAVAILABlE_DATES,
  createBooking,
  getUnavailableDates,
} from 'services/bookings';
import { useAuth } from 'context/AuthContext';
import { toast } from 'react-hot-toast';
import handleError from 'utils/handleError';
import { GET_USER_DATA_QUERY } from 'services/user';
import { getThreeDaysFromNow } from 'utils/dates';
import { useMemo } from 'react';
import moment from 'moment';

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

  const { register, handleSubmit, control, reset, watch } =
    useForm<BikeRentForm>({
      resolver: zodResolver(bikeFormSchema),
    });

  const { userId } = useAuth();
  const { bikeType } = useParams<{ bikeType: BikeType }>();
  const queryClient = useQueryClient();

  const bikes = useMemo(
    () => groupedBikes?.[bikeType!],
    [bikeType, groupedBikes]
  );
  const selectedBike = watch('bike') || bikes?.[0].id.toString();
  const selectedLocation = watch('location') || locations?.[0].id.toString();

  const { isLoading: isLoadingUnavailableDates, data: unavailableDates } =
    useQuery({
      queryKey: [GET_UNAVAILABlE_DATES, selectedBike, selectedLocation],
      queryFn: () =>
        getUnavailableDates({
          bikeId: selectedBike,
          locationId: selectedLocation,
        }),
    });

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: async () => {
      toast.success('Booking created successfully');

      reset();

      await queryClient.invalidateQueries([GET_USER_DATA_QUERY, userId]);
      await queryClient.invalidateQueries([
        GET_UNAVAILABlE_DATES,
        selectedBike,
        selectedLocation,
      ]);
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const onSubmit = (data: BikeRentForm) => {
    const [startDate, endDate] = data.duration;

    const bookingData = {
      bike_id: Number(data.bike),
      location_id: Number(data.location),
      user_id: userId!,
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
    };

    bookingMutation.mutate(bookingData);
  };

  const isLoading = isLoadingLocations || isLoadingBikes;
  const hasRequiredFormData = !!locations && !!groupedBikes;

  return (
    <div className="w-full flex justify-center">
      <div className="md:w-1/2">
        <h1 className="text-3xl font-semibold text-gray-800 text-center pb-8">
          Rent a {bikeType} bike
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
                Date
              </label>
              {isLoadingUnavailableDates ? (
                <LoadingSpinner />
              ) : (
                <Controller
                  control={control}
                  name="duration"
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Select date"
                      onChange={(dates) => {
                        if (!dates.length) return;

                        field.onChange(dates as [Date, Date]);
                      }}
                      selectsRange
                      startDate={field.value?.[0]}
                      endDate={field.value?.[1]}
                      minDate={getThreeDaysFromNow()}
                      className="w-56 px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                      excludeDates={unavailableDates?.map((date) =>
                        moment(date).local().toDate()
                      )}
                    />
                  )}
                />
              )}
              <button
                disabled={
                  bookingMutation.isLoading || isLoadingUnavailableDates
                }
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
