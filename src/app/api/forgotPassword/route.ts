import { COMMON_URLS } from '@/constants';
import {
  createForgotPasswordToken,
  existTheEmail,
  getUserWhere,
  respondEmailProblemError,
  respondMissingFieldsError,
  respondUser,
  sendForgotPasswordConfirmationEmail,
} from '@/libs/helpers/routeHelpers/auth';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;
  const webDomain = new URL(COMMON_URLS.dashboard, request.url);

  if (!email) return respondMissingFieldsError();

  const exist = await existTheEmail(email);
  if (!exist) return respondEmailProblemError();

  const user = await getUserWhere({
    email,
  });

  if (!user) {
    throw new Error('Something went wrong with this user');
  }

  const forgotPasswordToken = await createForgotPasswordToken(user);
  await sendForgotPasswordConfirmationEmail(
    email,
    forgotPasswordToken.token,
    webDomain.origin
  );

  return respondUser(user);
}
