'use client';

import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import GridError from '../errors/GridError';
import { useCallback } from 'react';
import Layout from '../Layout';
import {
  registerEmail,
  registerPassword,
  registerRepeatPassword,
} from '@/libs/helpers/forms/reactHooksFormRegisters';
import useRegister from '@/hooks/useRegister';
import EmailConfirmationDialog from '../modals/EmailConfirmationDialog';

export default function RegisterForm() {
  const {
    register: signUp,
    loading,
    error: errorFromServer,
    setError: setErrorFromServer,
  } = useRegister();
  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: { email: '', password: '', repeatPassword: '' },
  });

  const { errors } = formState;

  const onSubmit = useCallback(
    async (data: {
      email: string;
      password: string;
      repeatPassword: string;
    }) => {
      await signUp(data);
    },
    [signUp]
  );

  const onChange = useCallback(() => {
    setErrorFromServer(null);
  }, [setErrorFromServer]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Layout>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              label='Email'
              variant='outlined'
              type='email'
              required
              fullWidth
              {...registerEmail(register, { onChange })}
            />
            <GridError error={errors.email?.message} />
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
                Register
              </Button>
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </Layout>
      </form>
      <EmailConfirmationDialog />
    </>
  );
}
