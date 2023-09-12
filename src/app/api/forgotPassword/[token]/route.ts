import { COMMON_URLS } from '@/constants';
import { getUserWhere } from '@/libs/helpers/routeHelpers/auth';
import { whereForgotPasswordTokenOfUser } from '@/libs/helpers/routeHelpers/auth/queries';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  const where = whereForgotPasswordTokenOfUser(token);
  const user = await getUserWhere(where);

  if (!user) {
    return NextResponse.redirect(new URL(COMMON_URLS.genericError, request.url));
  }

  return NextResponse.redirect(
    new URL(`${COMMON_URLS.forgotPassword}/${token}`, request.url)
  );
}
