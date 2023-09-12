'use client';

import { Box, Container, Grid } from '@mui/material';
import styles from './styles.module.css';
import Logo from '../generic/Logo';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Box className={styles.formbox}>
        <Grid container spacing={2} sx={{ maxWidth: '600px' }}>
        <Grid item xs={12}>
          <Logo />
        </Grid>
          {children}
        </Grid>
      </Box>
    </Container>
  );
}
