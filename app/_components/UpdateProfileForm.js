'use client'; // store state

//import SelectCountry from "@/app/_components/SelectCountry";
import Image from 'next/image';
import { updateProfile } from '../_lib/actions';
import { useFormStatus } from 'react-dom';

export default function UpdateProfileForm({ guest, children }) {
  const { fullName, email, nationality, nationalID, countryFlag } = guest;
  //const [count, setCount] = useState();
  //const countryFlag = "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg";
  // formData will be passed to the server action updateProfile
  // since this is a client component, form.reset() to clear the form after submission
  return (
    <form
      className='bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col'
      action={updateProfile}
    >
      <div className='space-y-2'>
        <label>Full name</label>
        <input
          defaultValue={fullName}
          name='fullName'
          disabled
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
        />
      </div>

      <div className='space-y-2'>
        <label>Email address</label>
        <input
          defaultValue={email}
          name='email'
          disabled
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
        />
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <label htmlFor='nationality'>What country do you reside?</label>
          <Image
            src={countryFlag}
            alt='Country flag'
            width={50}
            height={50}
            className='h-5 rounded-sm'
          />
        </div>
        {/* client component renders server component via prop */}
        {children}
      </div>

      <div className='space-y-2'>
        <label htmlFor='nationalID'>National ID number</label>
        <input
          defaultValue={nationalID}
          name='nationalID'
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
        />
      </div>

      <div className='flex justify-end items-center gap-6'>
        <Button />
      </div>
    </form>
  );
}
// useFormStatus is react-dom hook to show the form status on the button
// it must be used in a component that is rendered inside the form
function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className='bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'
    >
      {pending ? 'Updating...' : 'Update profile'}
    </button>
  );
}
