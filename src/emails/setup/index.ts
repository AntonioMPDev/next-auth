'use strict';
import nodemailer from 'nodemailer';
import {
  confirmationEmailTemplate,
  forgotPasswordconfirmationEmailTemplate,
} from '../transportTemplates';

export function makeMail() {
  const USER = process.env.EMAIL_USER ?? null;
  const HOST = process.env.EMAIL_HOST ?? null;
  const PASS = process.env.EMAIL_PASS ?? null;

  if (!HOST || !USER || !PASS) {
    throw new Error('Necessary email credentials needed');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: USER,
      pass: PASS,
    },
  });
  return {
    sendConfirmation: async (
      email: string,
      activationToken: string,
      domain: string
    ) => {
      // send mail with defined transport object
      const info = await transporter.sendMail(
        confirmationEmailTemplate(email, USER, domain, activationToken)
      );
    },
    sendForgotPasswordConfirmation: async (
      email: string,
      token: string,
      domain: string
    ) => {
      // send mail with defined transport object
      const info = await transporter.sendMail(
        forgotPasswordconfirmationEmailTemplate(email, USER, domain, token)
      );
    },
  };
}
