import { makeMail } from '../../../../emails/setup';
import { respondEmailProblemError } from '.';

export const sendConfirmationEmail = async (
  email: string,
  token: string,
  domain: string
) => {
  let mail;
  try {
    mail = makeMail();
  } catch (error) {
    console.log(error);
  }

  await mail?.sendConfirmation(email, token, domain).catch((e) => {
    console.log(e);
    respondEmailProblemError();
  });
};

export const sendForgotPasswordConfirmationEmail = async (
  email: string,
  token: string,
  domain: string
) => {
  let mail;
  try {
    mail = makeMail();
  } catch (error) {
    console.log(error);
  }

  await mail?.sendForgotPasswordConfirmation(email, token, domain).catch((e) => {
    console.log(e);
    respondEmailProblemError();
  });
};
