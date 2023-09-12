'use client';

import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useSession, signOut } from 'next-auth/react';

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <Grid container md>
      <Grid margin={'auto'}>
        <Box>
          <Typography sx={{ paddingTop: '20px' }} variant='h3'>
            Dashboard
          </Typography>
          {session ? (
            <Typography
              sx={{ paddingTop: '20px' }}
              data-testid='user-dashboard'
            >
              Hi {session?.user?.email}
            </Typography>
          ) : (
            <CircularProgress />
          )}
        </Box>
        {<Button
          sx={{ marginTop: '20px' }}
          variant='outlined'
          onClick={() => signOut()}
        >
          Sign Out
        </Button>}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
