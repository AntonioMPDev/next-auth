'use client';

import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import GridError from '../errors/GridError';
import { useCallback } from 'react';
import Layout from '../Layout';
import {
  registerPassword,
  registerRepeatPassword,
} from '@/libs/helpers/forms/reactHooksFormRegisters';
import { useParams } from 'next/navigation';
import useChangePassword from '@/hooks/useChangePassword';

export default function ChangePasswordForm() {
  const params = useParams();

  const {
    changePassword,
    loading,
    error: errorFromServer,
    setError: setErrorFromServer,
  } = useChangePassword();
  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: { password: '', repeatPassword: '' },
  });

  const { errors } = formState;

  const onSubmit = useCallback(
    async (data: { password: string; repeatPassword: string }) => {
      await changePassword({
        password: data.password,
        token: typeof params.token === 'string' ? params.token : '',
      });
    },
    [changePassword, params.token]
  );

  const onChange = useCallback(() => {
    setErrorFromServer(null);
  }, [setErrorFromServer]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Layout>
          <Grid>
            <Typography variant='h5' sx={{ padding: '20px' }}>
              Change Password.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              label='Password'
              variant='outlined'
              type='password'
              required
              {...registerPassword(register, { onChange })}
              fullWidth
            />
            <GridError error={errors.password?.message} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              label='Repeat Password'
              variant='outlined'
              type='password'
              required
              {...registerRepeatPassword(register, getValues, { onChange })}
              fullWidth
            />
            <GridError error={errors.repeatPassword?.message} />
          </Grid>
          <GridError error={errorFromServer} />
          <Grid item xs={12}>
            {!loading ? (
              <Button type='submit' variant='outlined'>
                submit
              </Button>
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </Layout>
      </form>
    </>
  );
}
