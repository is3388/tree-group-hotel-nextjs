import Image from 'next/image';
import Link from 'next/link';
import bg from '@/public/bg.png'; // not specify width and height to be more responsive

export default function Page() {
  return (
    <>
      <Image
        src={bg}
        fill
        className='object-cover object-top'
        placeholder='blur'
        quality={80}
        alt='Mountains and forests with two cabins'
      />

      <div className='relative z-10 text-center mt-11'>
        <h1
          className='text-6xl text-primary-50 mb-10 tracking-tight font-normal'
          
        >
          Welcome to paradise
        </h1>
        <Link
          href='/cabins'
          className='bg-accent-500 px-8 py-6 text-primary-800 text-md font-semibold hover:bg-accent-600 transition-all'
        >
          Explore luxury cabins
        </Link>
      </div>
  </>
  );
}
