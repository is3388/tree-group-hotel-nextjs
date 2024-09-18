// http://localhost:3000/about - route
import Image from 'next/image';
import image1 from '@/public/about-1.jpg'
import { getCabins } from '../_lib/data-service';

export const revalidate = 86400; // 60 x 60 x 24 = 1 day

export const metadata = {
  title: 'About',
  description: 'Brief Introduction',
};

export default async function Page() {
  const numOfCabins = await getCabins();
  return (
    <div className='grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center'>
      <div className='col-span-3'>
        <h1 className='text-4xl mb-10 text-accent-400 font-medium'>
          Welcome to Tree Group Hotel
        </h1>

        <div className='space-y-8'>
          <p>
            Where nature's beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the German Calw, this is your paradise
            away from home. But 'it's not just about the luxury cabins.
            It's about the experience of reconnecting with nature and
            enjoying simple pleasures with family.
          </p>
          <p>
            Our {numOfCabins.length} luxury cabins provide a cozy base, but the real freedom and
            peace you'll find in the surrounding mountains. Wander through
            lush forests, breathe in the fresh air, and watch the stars twinkle
            above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by nature's
            splendor. It's a place to slow down, relax, and feel the joy of
            being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className='col-span-2'>
        <Image
          src={image1}
          placeholder='blur'
          quality={80}
          alt='Family sitting around a fire pit in front of cabin'
        />
      </div>

      <div className='relative aspect-square col-span-2'>
        <Image src='/about-2.jpg' fill className='object-cover' alt='Family that manages The Wild Oasis' />
      </div>

      <div className='col-span-3'>
        <h1 className='text-4xl mb-10 text-accent-400 font-medium'>
          Managed by our family since 1962
        </h1>

        <div className='space-y-8'>
          <p>
            Since 1962, The Tree Group Hotel has been a cherished family-run
            retreat. Started by our grandparents, this haven has been nurtured
            with love and care, passing down through our family as a testament
            to our dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we've maintained the essence of the hotel,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you're not just a
            guest; you're part of our extended family. So join us at the
            Tree Group soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div>
            <a
              href='/cabins'
              className='inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all'
            >
              Explore our luxury cabins
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
