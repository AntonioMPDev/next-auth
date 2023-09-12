'use client';

import { useSession, signOut } from 'next-auth/react';

const Client = () => {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Protected Client</h1>
      <p>Hi {session?.user?.email ?? 'You are not logged in'}</p>
      {session?.user?.email && (
        <button onClick={() => signOut()}>Sign Out</button>
      )}
    </div>
  );
};

export default Client;
