import moment from 'moment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking } from '../../services/bookings';
import { GET_USER_DATA_QUERY } from '../../services/user';
import handleError from '../../utils/handleError';
import { UserBooking } from '../../types/user';

type BookingCardProps = {
  booking: UserBooking;
  userId: number;
};

const BookingCard = ({ booking, userId }: BookingCardProps) => {
  const queryClient = useQueryClient();

  const cancelBookingMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: async () => {
      toast.success('Booking cancelled successfully');

      await queryClient.invalidateQueries([GET_USER_DATA_QUERY, userId]);
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

  const isPastBooking =
    moment(booking.end_time).local().toDate() < moment().toDate();
  const cardClassName = isPastBooking ? 'bg-gray-300' : 'bg-white';

  return (
    <div
      key={booking.id}
      className={`rounded-lg shadow-md p-6 ${cardClassName}`}
    >
      <p className="text-lg font-semibold mb-2">Bike: {booking.bikeType}</p>
      <p className="text-gray-500 mb-2">Location: {booking.locationName}</p>
      <p className="text-gray-500 mb-2">
        Start Time: {moment(booking.start_time).local().format('LL')}
      </p>
      <p className="text-gray-500 mb-2">
        End Time: {moment(booking.end_time).local().format('LL')}
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
};

export default BookingCard;
