'use client';

import { Button, CircularProgress, Grid, Link, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import GridError from '../errors/GridError';
import useLogin from '@/hooks/useLogin';
import { useCallback, useContext } from 'react';
import Layout from '../Layout';
import { MouseEvent } from 'react';
import {
  registerEmail,
  registerPassword,
} from '@/libs/helpers/forms/reactHooksFormRegisters';
import { LoginContext } from '@/context/LoginContext';
import { FORGOT_PASSWORD_FORM } from '@/constants';

export default function LoginForm() {
  const { setFormType } = useContext(LoginContext);

  const {
    login,
    loading,
    error: errorFromServer,
    setError: setErrorFromServer,
    googleLogin,
  } = useLogin();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { email: '', password: '' },
  });
  const { errors } = formState;

  const onSubmit = useCallback(
    async (data: { email: string; password: string }) => {
      await login(data);
    },
    [login]
  );

  const loginWithGoogle = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      googleLogin();
    },
    [googleLogin]
  );

  const onChange = useCallback(
    () => setErrorFromServer(null),
    [setErrorFromServer]
  );

  return (
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
        <Grid item xs={12}>
          <Link
            underline='none'
            component='button'
            variant='body2'
            onClick={loginWithGoogle as () => void}
          >
            Login with Google account.
          </Link>
          <br />
          <Link href='/register' underline='none' variant='body2'>
            No account yet?
          </Link>
          <br />
          <Link
            underline='none'
            component='button'
            variant='body2'
            onClick={() => setFormType(FORGOT_PASSWORD_FORM)}
          >
            Forgot password?
          </Link>
        </Grid>
      </Layout>
    </form>
  );
}
