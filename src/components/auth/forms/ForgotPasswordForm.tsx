'use client';

import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import GridError from '../errors/GridError';
import { useCallback } from 'react';
import Layout from '../Layout';
import { registerEmail } from '@/libs/helpers/forms/reactHooksFormRegisters';
import useForgotPassword from '@/hooks/useForgotPassword';
import ForgotPasswordDialog from '../modals/ForgotPasswordDialog';

export default function ForgotPasswordForm() {
  const {
    loading,
    error: errorFromServer,
    setError: setErrorFromServer,
    forgotPassword,
  } = useForgotPassword();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { email: '' },
  });
  const { errors } = formState;

  const onSubmit = useCallback(
    async (data: { email: string }) => {
      await forgotPassword(data);
    },
    [forgotPassword]
  );

  const onChange = useCallback(
    () => setErrorFromServer(null),
    [setErrorFromServer]
  );

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
          <GridError error={errorFromServer} />
          <Grid item xs={12}>
            {!loading ? (
              <Button type='submit' variant='outlined'>
                Submit
              </Button>
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </Layout>
      </form>
      <ForgotPasswordDialog />
    </>
  );
}
