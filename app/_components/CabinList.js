//import { revalidatePath } from 'next/cache';
//import { unstable_noStore as noStore } from 'next/cache';
import CabinCard from './CabinCard';
import { getCabins } from '@/app/_lib/data-service';

export default async function CabinList({ filter }) {
  const cabins = await getCabins();
  // in case /cabins page is not use incremental static regeneration (neither static nor fully dynamic)
  // use the following two to revalidate data
  // revalidatePath('/cabins'); it turns on revaliate data and becomes dynamic rendering
  // opt out data caching for component, call noStore()
  //noStore()

  if (!cabins.length) return null;

  let displayCabins;

  /*if (filter === 'all') displayedCabins = cabins;
  if (filter === 'small')
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === 'medium')
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === 'large')
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8); */
  /* 
  const displayedCabins = {
  all: cabins,
  small: cabins.filter((cabin) => cabin.maxCapacity <= 3),
  medium: cabins.filter((cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7),
  large: cabins.filter((cabin) => cabin.maxCapacity >= 8),
}[filter] || cabins;
  */

  switch (filter) {
    case "all":
      displayCabins = cabins;
      break;
    case "small":
      displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
      break;
    case "medium":
      displayCabins = cabins.filter(
        (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
      );
      break;
    case "large":
      displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
      break;
 
    default:
      displayCabins = cabins;
      break;
  }

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
