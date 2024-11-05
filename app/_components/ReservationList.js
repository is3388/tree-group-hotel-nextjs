'use client';

import { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';
import { deleteReservation } from '../_lib/actions';

export default function ReservationList({ bookings }) {
  // useOptimistic() hook for data intense app that makes it look fast and responsive
  // it assumes async operation will be successful while it is doing the async opeartion
  // if it fails, the state returns back to the current state - UI won't change
  // elminates cluster loading spinners
  // pass in 2 states - the current state (pre-optimistic state which is the actual bookings data and the value to determine the optimistic state
  // returns the optimistic state which removes the item and a function to perform optimistic delete
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      return currentBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId); // the optimistic operation
    await deleteReservation(bookingId); // the actual operation to delete the booking from supabase via the server action
  }

  return (
    <ul className='space-y-6'>
      {/*{bookings.map((booking) => (*/}
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
