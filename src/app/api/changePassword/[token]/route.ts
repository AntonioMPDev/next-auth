import { getUserWhere } from '@/libs/helpers/routeHelpers/auth';
import {
  updateUserPassword,
  whereForgotPasswordTokenOfUser,
} from '@/libs/helpers/routeHelpers/auth/queries';
import {
  respondOk,
  respondSomethingWentWrong,
} from '@/libs/helpers/routeHelpers/auth/responses';
import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;
  const body = await request.json();
  const { password } = body;

  const where = whereForgotPasswordTokenOfUser(token);
  const user = await getUserWhere(where);

  if (!user) {
    return respondSomethingWentWrong();
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await updateUserPassword(user.id, hashedPassword);

  return respondOk();
}
