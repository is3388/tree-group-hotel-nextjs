import { getCabin } from '@/app/_lib/data-service';
import { notFound } from 'next/navigation';
import { getCabins } from '@/app/_lib/data-service';
import Reservation from '@/app/_components/Reservation';
import Cabin from '@/app/_components/Cabin';
import { Suspense } from 'react';
import Spinner from '@/app/_components/Spinner';

export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);
  if (!cabin) notFound();
  const { name } = cabin;
  return { title: `Cabin ${name}` };
}

// an alternative to pre-generate dynamic URL segment at build time instead of request time
// export those pages as static pages and deploy to static hosting provider
// if not too many values such as only 10 different cabinIds
// run npm run build to see those static pages build
// use this function and return the ids, so that this is static page

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id)
  }));
  return ids;
}

export default async function Page({ params }) {
  // this approach takes longer to execute one by one
  const cabin = await getCabin(params.cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId)

  // second approach is faster but still blocking operation
  /*const [cabin, settings, bookedDates] = await Promise.all([
    getCabin(params.cabinId),
    getSettings(),
    getBookedDatesByCabinId(params.cabinId),
  ]); */

  // better approach is to create a new component that fetch data for settings and bookedDates

  if (!cabin) notFound();
  const { name } = cabin;

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      
      <Cabin cabin={cabin} />

      <div>
        <h2 className='text-5xl font-semibold text-center mb-10 text-accent-400'>
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
