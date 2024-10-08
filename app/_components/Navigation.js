import Link from 'next/link';
import { auth } from '../_lib/auth';

export default async function Navigation() {
  // read cookies from incoming request (runtime not build time - dynamic route)
  // this component is within the header is for every route, so each route turns into dynamic and the entire website becomes dynamic
  // call the auth function only in specific components or pages where dynamic behavior is necessary if you don't want the entire site dynamic
  const session = await auth();
  console.log(session); //return user object with name, email and image from gmail a/c
  return (
    <nav className='z-10 text-xl'>
      <ul className='flex gap-16 items-center'>
        <li>
          <Link href='/' className='hover:text-accent-400 transition-colors'>
            Home
          </Link>
        </li>
        <li>
          <Link
            href='/cabins'
            className='hover:text-accent-400 transition-colors'
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href='/about'
            className='hover:text-accent-400 transition-colors'
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href='/account'
              className='hover:text-accent-400 transition-colors flex items-center gap-4'
            >              
                <img
                  className='h-8 rounded-full'
                  src={session.user.image}
                  alt={session.user.name}
                  referrerPolicy='no-referrer'
                />              
              <span>Guest account</span>
            </Link>
          ) : (
            <Link
              href='/account'
              className='hover:text-accent-400 transition-colors'
            >
              Guest account
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
