import { UserProfile } from '@repo/types';

export default function Home() {
  const user: UserProfile = {
    id: 'abc123',
    name: 'Hemantha',
    email: 'hemantha@example.com',
  };

  return (
    <div>
      <h1>Welcome {user.name}</h1>
    </div>
  );
}
