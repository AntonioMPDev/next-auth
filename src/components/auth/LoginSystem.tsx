'use client';

import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import Layout from './Layout';
import styles from './styles.module.css';
import useLogin from '@/hooks/useLogin';
import EmailLoginSystem from './forms/EmailLoginSystem';

export default function LoginSystem() {
  const [loginType, setLoginType] = useState<string | null>(null);

  const { googleLogin } = useLogin();
  if (loginType === 'EMAIL') {
    return <EmailLoginSystem />;
  }

  return (
    <Layout>
      <Grid item xs={12} className={styles.loginAuthenticationbuttons}>
        <Button variant='contained' onClick={() => setLoginType('EMAIL')}>
          Login with Email
        </Button>
        <Button variant='outlined' onClick={googleLogin}>
          Login with Goolge Account
        </Button>
      </Grid>
    </Layout>
  );
}
