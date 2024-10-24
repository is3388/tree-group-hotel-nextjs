'use server';
import { revalidatePath } from 'next/cache';
import { signIn, signOut, auth } from './auth';
import { updateGuest } from './data-service';

// server actions
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
  await signOut({redirectTo: '/'})
}

export async function updateProfile(formData) {
  //console.log(formData)
  const session = await auth();
  if (!session) {
    throw new Error('You must log in')
  }
  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
   throw new Error('Please provide a valid national ID')
  }
  const updateData = { nationality, countryFlag, nationalID }
  //console.log(updateData)
  await updateGuest(session.user.guestId, updateData)
  revalidatePath('/account/profile') // data in cache will stay for 30 seconds by default, in order to avoid the stale data
}