'use client';

import { CssBaseline } from '@mui/material';
import ThemeRegistry from '../app/ThemeRegistry';
import AuthProvider from './AuthProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeRegistry options={{ key: 'mui' }}>
        <CssBaseline />
        {children}
      </ThemeRegistry>
    </AuthProvider>
  );
}
