import { createContext } from 'react';

export type FormTypes = 'LOGIN_FORM' | 'FORGOT_PASSWORD_FORM';

type LoginPropsContext = {
  setFormType: React.Dispatch<React.SetStateAction<FormTypes>>;
  formType: FormTypes;
  dialog: boolean;
  setDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginContext = createContext<LoginPropsContext>({
  setFormType: () => {},
  formType: 'LOGIN_FORM',
  dialog: false,
  setDialog: () => {},
});
