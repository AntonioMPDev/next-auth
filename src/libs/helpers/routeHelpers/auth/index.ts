import {
  respondEmailAlreadyExist,
  respondEmailProblemError,
  respondMissingFieldsError,
  respondUser,
} from './responses';
import {
  existTheEmail,
  createUser,
  createActivationToken,
  createForgotPasswordToken,
  getUserWhere,
  whereActivationToken,
} from './queries';
import {
  sendConfirmationEmail,
  sendForgotPasswordConfirmationEmail,
} from './emailsUtils';

export {
  respondEmailAlreadyExist,
  respondEmailProblemError,
  respondMissingFieldsError,
  respondUser,
  existTheEmail,
  createUser,
  createActivationToken,
  createForgotPasswordToken,
  getUserWhere,
  whereActivationToken,
  sendConfirmationEmail,
  sendForgotPasswordConfirmationEmail,
};
