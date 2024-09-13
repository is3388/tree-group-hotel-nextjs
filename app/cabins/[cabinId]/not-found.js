// notFound is intended to be thrown within a route render component, not in data fetch function
// notFound() can be called in app/cabins/page.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='text-center space-y-6 mt-4'>
      <h1 className='text-3xl font-semibold'>
        This cabin could not be found :(
      </h1>
      <Link
        href='/cabins'
        className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
      >
        Go back to all cabins
      </Link>
    </main>
  );
}
