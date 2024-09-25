import { getCabin } from '@/app/_lib/data-service';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCabins } from '@/app/_lib/data-service';
import TextExpander from '@/app/_components/TextExpander';

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
  const ids = cabins.map((cabin) => {
    cabinId: String(cabin.id);
  });
  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);
  if (!cabin) notFound();
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <div className='grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24'>
        <div className='relative scale-[1.15] -translate-x-3'>
          <Image
            fill
            className='object-cover'
            quality={80}
            src={image}
            alt={`Cabin ${name}`}
          />
        </div>

        <div>
          <h3 className='text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]'>
            Cabin {name}
          </h3>

          <p className='text-lg text-primary-300 mb-10'>
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className='flex flex-col gap-4 mb-7'>
            <li className='flex gap-3 items-center'>
              <UsersIcon className='h-5 w-5 text-primary-600' />
              <span className='text-lg'>
                For up to <span className='font-bold'>{maxCapacity}</span>{' '}
                guests
              </span>
            </li>
            <li className='flex gap-3 items-center'>
              <MapPinIcon className='h-5 w-5 text-primary-600' />
              <span className='text-lg'>
                Located in the heart of the{' '}
                <span className='font-bold'>Calw</span> (Germany)
              </span>
            </li>
            <li className='flex gap-3 items-center'>
              <EyeSlashIcon className='h-5 w-5 text-primary-600' />
              <span className='text-lg'>
                Privacy <span className='font-bold'>100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className='text-5xl font-semibold text-center'>
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}