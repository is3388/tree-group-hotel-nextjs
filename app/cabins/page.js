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

import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";
import { revalidatePath } from "next/cache";

  export default async function Page() {
    
    const cabins = await getCabins();
    revalidatePath('/cabins')
    
    return (
      <div>
        <h1 className="text-4xl mb-5 text-accent-400 font-medium">
          Our Luxury Cabins
        </h1>
        <p className="text-primary-200 text-lg mb-10">
          Cozy yet luxurious cabins, located right in the heart of German
          Calw. Imagine waking up to beautiful mountain views, spending your
          days exploring the black forests around, or just relaxing in your private
          hot tub under the stars. Enjoy nature's in your own little home
          away from home. The perfect spot for a peaceful, calm vacation. Welcome
          to paradise.
        </p>
  
        {cabins.length > 0 && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {cabins.map((cabin) => (
              <CabinCard cabin={cabin} key={cabin.id} />
            ))}
          </div>
        )}
      </div>
    );
  }
