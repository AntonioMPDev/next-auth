'use client';

import { Alert } from '@mui/material';

export default function Error({ error }: { error: string | null }) {
  return error ? <Alert severity='error'>{error}</Alert> : null;
}
