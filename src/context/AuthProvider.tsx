'use client';

import { SessionProvider } from 'next-auth/react';
import { FormTypes, LoginContext } from './LoginContext';
import { useState } from 'react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formType, setFormType] = useState<FormTypes>('LOGIN_FORM');
  const [dialog, setDialog] = useState<boolean>(false);
  return (
    <SessionProvider>
      <LoginContext.Provider
        value={{ formType, setFormType, dialog, setDialog }}
      >
        {children}
      </LoginContext.Provider>
    </SessionProvider>
  );
}
