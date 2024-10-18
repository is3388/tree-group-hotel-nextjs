import SignInButton from '../_components/SignInButton';

// signInButton is a server component, so need server actions to connect
// when the form is submitted, file off app/_lib/actions.js
export default function Page() {
  return (    
      <div className='flex flex-col gap-10 mt-10 items-center'>
        <h2 className='text-3xl font-semibold'>
          Sign in to access your account
        </h2>
        <SignInButton />
      </div>    
  );
}
