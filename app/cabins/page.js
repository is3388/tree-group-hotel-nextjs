// http://localhost:3000/cabins
// app folder is the root http://localhost:3000 cabins is the route
import Counter from '@/app/_components/Counter';

export const metadata = {
  title: 'Cabins',
  description: 'Spectacular cabins for you'
}

export default async function Page() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();
  console.log(data.length);

  return (
    <div>
      <h1>Cabins Page</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <Counter />
    </div>
  );
}
