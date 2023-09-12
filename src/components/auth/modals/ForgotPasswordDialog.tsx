'use client';

import * as React from 'react';
import CommonDialog from './CommonDialog.tsx';

export default function ForgotPasswordDialog() {
  return (
    <div>
      <CommonDialog
        data={{
          title: 'Need confirmation',
          desc: 'We have sent you an email with a link to confirm your email, and procced change your password',
        }}
      />
    </div>
  );
}
