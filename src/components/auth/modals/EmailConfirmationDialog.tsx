'use client';

import * as React from 'react';
import CommonDialog from './CommonDialog.tsx';

export default function EmailConfirmationDialog() {
  return (
    <div>
      <CommonDialog
        data={{
          title: 'Need confirmation',
          desc: 'We have sent you an email with a link to confirm your account',
        }}
      />
    </div>
  );
}
