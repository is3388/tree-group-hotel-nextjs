//import { revalidatePath } from 'next/cache';
//import { unstable_noStore as noStore } from 'next/cache';
import CabinCard from './CabinCard';
import { getCabins } from '@/app/_lib/data-service';

export default async function CabinList() {
  const cabins = await getCabins();
  // in case /cabins page is not use incremental static regeneration (neither static nor fully dynamic)
  // use the following two to revalidate data
  // revalidatePath('/cabins'); it turns on revaliate data and becomes dynamic rendering
  // opt out data caching for component, call noStore()
  //noStore()
 
  if (!cabins.length) return null;

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
