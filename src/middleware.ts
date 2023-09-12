import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COMMON_URLS, SLUGS_TO_DASHBOARD, SLUGS_TO_LOGIN } from './constants';

const redirect = (req: NextRequest, slug: string) =>
  NextResponse.redirect(new URL(slug, req.url));

const startsWith = (request: NextRequest, slug: string) =>
  request.nextUrl.pathname.startsWith(slug);

function hasASlugMatch(request: NextRequest, slugs: string[]) {
  let hasAMatch = false;
  for (const slug in slugs) {
    if (startsWith(request, slugs[slug])) {
      hasAMatch = true;
      break;
    }
  }
  return hasAMatch;
}

async function isValidForgotPasswordToken(request: NextRequest) {
  const urlParts = request.nextUrl.pathname.split('/');
  const res = await fetch(
    `${request.nextUrl.origin}/api${COMMON_URLS.apiForgotPassword}/${
      urlParts[urlParts.length - 1]
    }`
  );
  const data = await res.json();
  if (data.isValidToken) {
    return true;
  }

  return false;
}

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.SECRET });

  if (session) {
    if (hasASlugMatch(request, SLUGS_TO_DASHBOARD))
      return redirect(request, COMMON_URLS.dashboard);
  } else {
    if (hasASlugMatch(request, SLUGS_TO_LOGIN))
      return redirect(request, COMMON_URLS.login);
  }

  if (startsWith(request, COMMON_URLS.forgotPassword)) {
    const isValidForgotPasswordToken_ = await isValidForgotPasswordToken(
      request
    );
    if (!isValidForgotPasswordToken_) {
      return redirect(request, COMMON_URLS.login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    COMMON_URLS.login,
    COMMON_URLS.register,
    `${COMMON_URLS.dashboard}/:path*`,
    `${COMMON_URLS.forgotPassword}/:path*`,
  ],
};
