import { emailValidator } from './formValidators';
import { GetValues, Register } from '@/interfaces';

export const registerEmail = (register: Register, extra?: object) => {
  return {
    ...register('email', {
      required: 'Email is required',
      validate: emailValidator,
      ...extra,
    }),
  };
};

export const registerPassword = (register: Register, extra?: object) => {
  return {
    ...register('password', {
      required: 'You must specify a password',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
      ...extra,
    }),
  };
};

export const registerRepeatPassword = (
  register: Register,
  getValues: GetValues,
  extra?: object
) => {
  return {
    ...register('repeatPassword', {
      required: 'You must specify a confirmation password',
      validate: (value) => {
        const { password } = getValues();
        if (password !== value) {
          return 'The passwords do not match';
        }
      },
      ...extra,
    }),
  };
};
