import { User } from '@/interfaces';
import prisma from '../../../prismadb';
import { randomUUID } from 'crypto';

/**
 *
 * Queries
 */
export const existTheEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = async (email: string, hashedPassword: string) => {
  return await prisma.user.create({
    data: {
      email,
      hashedPassword,
    },
  });
};

export const updateUserPassword = async (
  id: string,
  hashedPassword: string
) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      hashedPassword,
    },
  });
};

export const createActivationToken = async (user: User) => {
  return await prisma.activateToken.create({
    data: {
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
      userId: user.id,
      activatedAt: null,
    },
  });
};

export const createForgotPasswordToken = async (user: User) => {
  return await prisma.forgotPasswordToken.create({
    data: {
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
      userId: user.id,
    },
  });
};

export const getUserWhere = async (where: object) => {
  return await prisma.user.findFirst({
    where,
  });
};

export const getForgotPasswordWhere = async (where: object) => {
  return await prisma.forgotPasswordToken.findFirst({
    where,
  });
};

/**
 *
 * Where queries
 */
export const whereActivationToken = (token: string) => {
  return {
    ActivateToken: {
      some: {
        AND: [
          {
            activatedAt: null,
          },
          {
            createdAt: {
              gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
            },
          },
          {
            token,
          },
        ],
      },
    },
  };
};

export const whereForgotPasswordToken = (token: string) => {
  return {
    token,
    AND: [
      {
        createdAt: {
          gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
        },
      },
    ],
  };
};

export const whereForgotPasswordTokenOfUser = (token: string) => {
  return {
    ForgotPasswordToken: {
      some: {
        AND: [
          {
            createdAt: {
              gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
            },
          },
          {
            token,
          },
        ],
      },
    },
  };
};
