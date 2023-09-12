'use client';

import LoginForm from '@/components/auth/forms/LoginForm';
import { LoginContext } from '@/context/LoginContext';
import { useContext } from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import { FORGOT_PASSWORD_FORM, LOGIN_FORM } from '@/constants';

export default function EmailLoginSystem() {
  const { formType } = useContext(LoginContext);

  if (formType === LOGIN_FORM) return <LoginForm />;
  if (formType === FORGOT_PASSWORD_FORM) return <ForgotPasswordForm />;

  return null;
}
