'use server';
import { signIn, signOut } from './auth';

// server actions
// server actions can be called from the client but still executed on the server

export async function signInAction() {
  // first arg is provider
  // if multiple providers, fetch data from localhost:3000/api/auth/providers and loop thru them in Login page
  // 2rd arg is an object for successful signin from the auth.js
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({redirectTo: '/'})
}