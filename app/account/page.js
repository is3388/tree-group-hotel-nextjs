// http://localhost:3000/account - route

export const metadata = {
  title: 'Guest account',
  description: 'Your Account'
}

export default function Page() {
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, Jonas
      </h2>
    </div>
  );
}
