// React error boundary catches all errors and exception in the app but only in rendering.
// it doesn't cover errors in callback functions
// Create a global file called global-error.js with <html> and <body> tags that catch errors in the rootLayout.js
// To redirect to another page in .page, use import { redirect } from 'next/navigation'; redirect('/')
'use client';

import { useRouter } from 'next/navigation';

export default function Error({ error, reset }) {
  const { push } = useRouter();
  return (
    <main className='flex justify-center items-center flex-col gap-6'>
      <h1 className='text-3xl font-semibold'>Something went wrong!</h1>
      <p className='text-lg'>{error.message}</p>
      <button
        className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
        onClick={push('/')}
      >
        Try again
      </button>
    </main>
  );
}
