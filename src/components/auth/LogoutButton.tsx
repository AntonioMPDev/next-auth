'use client';

import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <div>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default LogoutButton;
