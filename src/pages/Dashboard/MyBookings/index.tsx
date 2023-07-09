import { Link } from 'react-router-dom';
import { UserBooking } from 'types/user';
import { useAuth } from 'context/AuthContext';
import BookingCard from 'components/BookingCard';

type MyBookingsProps = {
  userBookings?: UserBooking[];
};

function MyBookings({ userBookings }: MyBookingsProps) {
  const { userId } = useAuth();

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
        {userBookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} userId={userId!} />
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
