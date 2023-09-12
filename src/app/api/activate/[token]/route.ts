import {
  getUserWhere,
  whereActivationToken,
} from '@/libs/helpers/routeHelpers/auth';
import client from '@/libs/prismadb';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  const where = whereActivationToken(token);
  const user = await getUserWhere(where);

  if (!user) {
    throw new Error('Invalid token');
  }

  await client.user.update({
    where: {
      id: user.id,
    },
    data: {
      active: true,
    },
  });

  await client.activateToken.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  });

  return NextResponse.redirect(new URL('/login', request.url));
}
