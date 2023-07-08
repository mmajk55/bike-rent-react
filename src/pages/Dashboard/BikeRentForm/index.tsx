import { useNavigate, useParams } from 'react-router-dom';
import { BikeListProps } from '../DashboardRoutes';
import { BikeType } from '../../../types/bike';
import { LoadingSpinner } from '../../../components/Loader';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

type BikeRentForm = {
  bike: string;
  location: string;
  startDate: Date;
  endDate: Date;
};

const bikeFormSchema = z.object({
  bike: z.string().nonempty(),
  location: z.string().nonempty(),
  startDate: z.date(),
  endDate: z
    .instanceof(Date, { message: 'The Date field is required.' })
    .refine((date) => {
      return date >= new Date(Date.now());
    }, 'The date must be in the future.'),
});

function BikeRentForm({ groupedBikes, isLoadingBikes }: BikeListProps) {
  const { bikeType } = useParams<{ bikeType: BikeType }>();
  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm<BikeRentForm>({
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
      <div className="w-1/2">
        <h1 className="text-3xl font-semibold text-gray-800 text-center pb-8">
          Rent an {bikeType} bike
        </h1>
        {isLoadingBikes && <LoadingSpinner />}
        {!isLoadingBikes && !groupedBikes && (
          <h1 className="text-xl  text-gray-800 text-center">
            No bikes to rent
          </h1>
        )}
        {!isLoadingBikes && groupedBikes && (
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
                <option value="1">Location 1</option>
                <option value="2">Location 2</option>
              </select>
              <label htmlFor="startDate" className="mb-2">
                Start Date
              </label>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select date"
                    onChange={(date) => {
                      if (!date) return;
                      field.onChange(date);
                      console.log('DATE', date);
                    }}
                    selected={field.value}
                    className="w-56 px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                  />
                )}
              />
              <label htmlFor="startDate" className="mb-2">
                End Date
              </label>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select date"
                    onChange={(date) => {
                      if (!date) return;
                      field.onChange(date);
                      console.log('DATE', date);
                    }}
                    selected={field.value}
                    className="w-56 px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                  />
                )}
              />
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
