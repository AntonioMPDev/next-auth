import { NextResponse } from 'next/server';
import { User } from '@/interfaces';

export const respondUser = (user: User) => {
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
    },
    ok: true,
    error: null,
  });
};

export const respondOk = () => {
  return NextResponse.json({
    ok: true,
    error: null,
  });
};

export const respondMissingFieldsError = () => {
  return NextResponse.json({
    status: 400,
    user: null,
    ok: false,
    error: 'Mising fields!',
  });
};

export const respondSomethingWentWrong = () => {
  return NextResponse.json({
    status: 400,
    user: null,
    ok: false,
    error: 'Something went wrong!',
  });
};

export const respondEmailProblemError = () => {
  return NextResponse.json({
    status: 400,
    user: null,
    ok: false,
    error: 'There was a problem with your email',
  });
};

export const respondEmailAlreadyExist = () => {
  return NextResponse.json(
    { error: 'Email already exist!', user: null, ok: false },
    { status: 400 }
  );
};
