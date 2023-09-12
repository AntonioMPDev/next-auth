'use client';

import { Grid } from '@mui/material';
import Error from './Error';

export default function GridError({
  error,
}: {
  error: string | null | undefined;
}) {
  return error ? (
    <Grid item xs={12}>
      <Error error={error} />
    </Grid>
  ) : null;
}
