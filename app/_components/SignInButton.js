import Image from 'next/image';
import { signInAction } from '../_lib/actions';
// this is server component so cannot use onClick
// create server actions in app/_lib/actions.js which has signIn, signOut functions
// this button will be hosted in a form to submit the action

export const metadata = {
  title: 'Login',
};

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className='flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium'>
        <Image
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
          height='24'
          width='24'
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
