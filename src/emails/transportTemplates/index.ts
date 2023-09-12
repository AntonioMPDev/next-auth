export const confirmationEmailTemplate = (
  email: string,
  USER: string,
  domain: string,
  activationToken: string
) => {
  return {
    from: `"modernX 👻" <${USER}>`, // sender address
    to: email, // list of receivers
    subject: 'Please activate your account ✔', // Subject line
    text: `Hello ${email}, please activate your account by clicking this link: ${domain}/api/activate/${activationToken}`, // plain text body
    html: `<p>
                Hello ${email}, please activate your account by clicking this link: <strong>${domain}/api/activate/${activationToken}</strong>
            </p>`, // html body
  };
};

export const forgotPasswordconfirmationEmailTemplate = (
  email: string,
  USER: string,
  domain: string,
  token: string
) => {
  return {
    from: `"modernX 👻" <${USER}>`, // sender address
    to: email, // list of receivers
    subject: 'Confirm email ✔', // Subject line
    text: `Hello ${email}, please confirm your email by clicking this link: ${domain}/api/forgotPassword/${token}`, // plain text body
    html: `<p>
                Hello ${email}, please confirm your email by clicking this link: <strong>${domain}/api/forgotPassword/${token}</strong>
            </p>`, // html body
  };
};
