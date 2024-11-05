'use server';
import { revalidatePath } from 'next/cache';
import { signIn, signOut, auth } from './auth';
import { updateGuest, deleteBooking, getBookings } from './data-service';
import { redirect } from 'next/navigation';
import { supabase } from './supabase';

// server actions can be called from the client but still executed on the server
// server actions must check if the login user is authorized to do the task and always treat the input as unsafe
// common practice not to use try/catch, use throw Error in server actions

export async function signInAction() {
  // first arg is provider
  // if multiple providers, fetch data from localhost:3000/api/auth/providers and loop thru them in Login page
  // 2rd arg is an object for successful signin from the auth.js
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function updateProfile(formData) {
  //console.log(formData)
  const session = await auth();
  if (!session) {
    throw new Error('You must log in');
  }
  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error('Please provide a valid national ID');
  }
  const updateData = { nationality, countryFlag, nationalID };
  //console.log(updateData)
  await updateGuest(session.user.guestId, updateData);
  revalidatePath('/account/profile'); // data in cache will stay for 30 seconds by default, in order to avoid the stale data
}

export async function deleteReservation(bookingId) {
  await new Promise((res) => setTimeout(res, 2000));

  const session = await auth();
  if (!session) {
    throw new Error('You must log in');
  }

  const guestBookings = await getBookings(session.user.guestId);
  // if (!bookings.some((el) => el.id === +bookingId)) // + to convert string to number
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error('You are not authorized to delete this booking');
  }

  await deleteBooking(bookingId);
  revalidatePath('/account/reservations');
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get('bookingId'));
  // authentication
  const session = await auth();
  if (!session) {
    throw new Error('You must log in');
  }

  // authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not allowed to update this booking');

  // mutation
  const updateData = {
    numOfGuests: Number(formData.get('numOfGuests')),
    observations: formData.get('observations').slice(0, 1000),
  };
  //await updateBooking(bookingId, updateData);
  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) throw new Error('Booking could not be updated');

  // revalidate to prevent stale data
  revalidatePath(`/account/reservations/edit/${bookingId}`); // child first
  revalidatePath('/account/reservations');

  // redirect
  redirect('/account/reservations');
}
