import { User } from '@/interfaces';
import {
  createActivationToken,
  createUser,
  existTheEmail,
  respondEmailAlreadyExist,
  respondMissingFieldsError,
  respondUser,
  sendConfirmationEmail,
} from '@/libs/helpers/routeHelpers/auth';
import bcrypt from 'bcrypt';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;
  const webDomain = new URL('/dashboard', request.url);

  if (!email || !password) return respondMissingFieldsError();

  const exist = await existTheEmail(email);
  if (exist) return respondEmailAlreadyExist();

  const hashedPassword = await bcrypt.hash(password, 10);
  const user: User = await createUser(email, hashedPassword);

  const activationToken = await createActivationToken(user);
  await sendConfirmationEmail(email, activationToken.token, webDomain.origin);

  return respondUser(user);
}
