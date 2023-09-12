import { UseFormGetValues, UseFormRegister } from 'react-hook-form';

export type User = {
  email: string | null;
  id: string;
};

export type Register = UseFormRegister<
  | {
      email: string;
      password: string;
      repeatPassword: string;
    }
  | {
      email: string;
    }
  | {
      password: string;
      repeatPassword: string;
    }
  >;

export type GetValues =
  | UseFormGetValues<{
      email: string;
      password: string;
      repeatPassword: string;
    }>
  | UseFormGetValues<{
      password: string;
      repeatPassword: string;
    }>;