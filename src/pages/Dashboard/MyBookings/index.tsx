import { Link } from 'react-router-dom';
import { UserBooking } from '../../../types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_BOOKINGS_QUERY, deleteBooking } from '../../../services/bookings';
import { useAuth } from '../../../context/AuthContext';
import { GET_USER_DATA_QUERY } from '../../../services/user';
import toast from 'react-hot-toast';
import handleError from '../../../utils/handleError';

type MyBookingsProps = {
  userBookings?: UserBooking[];
};

function MyBookings({ userBookings }: MyBookingsProps) {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const cancelBookingMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: async () => {
      toast.success('Booking cancelled successfully');

      await queryClient.invalidateQueries([GET_USER_DATA_QUERY, userId]);
      await queryClient.invalidateQueries([GET_BOOKINGS_QUERY]);
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const handleCancelBooking = async (bookingId: number) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this booking?'
    );

    confirmed && (await cancelBookingMutation.mutateAsync(bookingId));
  };

  if (!userBookings) {
    return (
      <div className="text-center">
        <p className="mb-8 text-xl">You don't have any bookings.</p>
        <Link
          className="bg-indigo-500 text-white py-4 px-12 rounded-full hover:bg-indigo-600"
          to="/dashboard"
        >
          Rent a bike
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Bookings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {userBookings.map((booking) => {
          const isPastBooking = new Date(booking.end_time) < new Date();
          const cardClassName = isPastBooking ? 'bg-gray-300' : 'bg-white';

          return (
            <div
              key={booking.id}
              className={`rounded-lg shadow-md p-6 ${cardClassName}`}
            >
              <p className="text-lg font-semibold mb-2">
                Bike: {booking.bikeType}
              </p>
              <p className="text-gray-500 mb-2">
                Location: {booking.locationName}
              </p>
              <p className="text-gray-500 mb-2">
                Start Time: {new Date(booking.start_time).toLocaleDateString()}
              </p>
              <p className="text-gray-500 mb-2">
                End Time: {new Date(booking.end_time).toLocaleDateString()}
              </p>
              {!isPastBooking && (
                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyBookings;
