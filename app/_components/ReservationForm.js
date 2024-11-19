'use client';

import { formatISO, isValid, differenceInDays } from 'date-fns';
import { useReservation } from './ReservationContext';
import { createBooking } from '../_lib/actions';
import SubmitButton from './SubmitButton';

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const isValidStartDate = range?.from && isValid(new Date(range.from));
  const isValidEndDate = range?.to && isValid(new Date(range.to));
  // prevent time zone issue
  const startDate = isValidStartDate
    ? formatISO(new Date(range.from), { representation: 'date' })
    : null;
  const endDate = isValidEndDate
    ? formatISO(new Date(range.to), { representation: 'date' })
    : null;
  const numOfNights =
    isValidStartDate && isValidEndDate
      ? differenceInDays(new Date(endDate), new Date(startDate))
      : 0;
  const cabinPrice = numOfNights * (regularPrice - discount);

  const bookingDetails = {
    startDate,
    endDate,
    numOfNights,
    cabinPrice,
    cabinId: id,
  };
  // since there are more than one pc of info, cannot use hidden field and pass to server action
  // use bind method - when you call it on a function, it set the disc keyword of that function
  // plus pass additional arguments into the function
  // first arg is the new value of the this keyword but we are not interested
  // returns a new function with the data and stores that as a form action
  // the second arg in bind will becomes the first arg in the createBooking function (action.js) which we pass to the form as server action
  const createBookingWithData = createBooking.bind(null, bookingDetails);

  return (
    <div className='scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>

        <div className='flex gap-4 items-center'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      {/*<form className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col' action={createBookingWithData}>
      or action={(formData) => createBooking(bookingData, formData)}*/}
      <form
        className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
      >
        <div className='space-y-2'>
          <label htmlFor='numOfGuests'>How many guests?</label>
          <select
            name='numOfGuests'
            id='numOfGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
          {!(startDate && endDate) ? (
            <p className='text-primary-300 text-base'>
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel='Reserving ...'>
              Reserve now
            </SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
