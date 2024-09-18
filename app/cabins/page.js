// http://localhost:3000/cabins
// app folder is the root http://localhost:3000 cabins is the route
/*import Counter from '@/app/_components/Counter';

export const metadata = {
  title: 'Cabins',
  description: 'Spectacular cabins for you'
}

export default async function Page() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();
  console.log(data.length);

  return (
    <div>
      <h1>Cabins Page</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <Counter />
    </div>
  );
} */

import CabinList from '@/app/_components/CabinList';
import { Suspense } from 'react';
import Spinner from '@/app/_components/Spinner';

// opt out data caching and full route caching to use incremental static regeneration on page level
// to regenerate a static page but fetch data after the number of second specified which is still dynamic
export const revalidate = 3600; // 60 min x 60 sec

export const metadata = { title: 'Cabins'};

export default async function Page() {
  return (
    <div>
      <h1 className='text-4xl mb-5 text-accent-400 font-medium'>
        Our Luxury Cabins
      </h1>
      <p className='text-primary-200 text-lg mb-10'>
        Cozy yet luxurious cabins, located right in the heart of German Calw.
        Imagine waking up to beautiful mountain views, spending your days
        exploring the black forests around, or just relaxing in your private hot
        tub under the stars. Enjoy nature's in your own little home away from
        home. The perfect spot for a peaceful, calm vacation. Welcome to
        paradise.
      </p>
      {/* parital pre-rendering only CabinList is the dynamic part while the whole page is static */}
      <Suspense fallback={<Spinner />}><CabinList /></Suspense>
      
    </div>
  );
}
