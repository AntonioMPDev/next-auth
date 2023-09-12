import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LogoutButton from '@/components/auth/LogoutButton';

export default async function Server() {
  const session = await getServerSession(authOptions);

  return (
    <section>
      <h1>Protected Server</h1>
      <pre>{session ? JSON.stringify(session) : 'You are not logged in'}</pre>
      {session && <LogoutButton />}
    </section>
  );
}
