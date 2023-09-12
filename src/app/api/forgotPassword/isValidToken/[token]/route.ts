import {
  getForgotPasswordWhere,
  whereForgotPasswordToken,
} from '@/libs/helpers/routeHelpers/auth/queries';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  const existToken = await getForgotPasswordWhere(
    whereForgotPasswordToken(token)
  );

  return NextResponse.json({
    isValidToken: existToken ? true : false,
    ok: true,
    error: null,
  });
}
