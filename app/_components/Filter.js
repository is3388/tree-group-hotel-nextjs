'use client';
/*
searchParams is typically available in dynamic pages, 
where the parameters are directly tied to the URL structure provided by the framework. 
In static or normal page components, searchParams might not automatically reflect the URL's query parameters
 unless specifically handled. If you need to access search parameters in a static component, 
 consider using a different method, such as the useRouter hook from Next.js or window.location.search 
 in a React app
*/
import { usePathname, useRouter, useSearchParams } from 'next/navigation'; // app router

export default function Filter() {
  const searchParams = useSearchParams(); // get the current searchParams from the URL eg. ?capacity=all
  const router = useRouter(); // perform programmatic between routes
  const pathname = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';

  function handleFilter(filter) {
    // get the data into the url - interactive to change the searchParams
    // use web API called URLSearchParams
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter); // build the URL but not navigate to it
    // replace the current route in the browser route stack and cannot get back to the previous route in your browser
    // router.push() add to browser route stack and can go back to the previous route
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // not scroll to the top
  }

  return (
    <div className='border border-primary-800 flex'>
      <Button
        filter='all'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter='small'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter='medium'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter='large'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}
function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

/*  if only one filter term (one field)to the url, use Link instead of Button
<Link
      href={`/cabins?capacity=${filter}`}
      scroll={false}
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeLink ? " bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </Link>
  */
