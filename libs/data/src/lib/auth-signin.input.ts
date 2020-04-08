import { Matches } from 'class-validator';
import { validEmail, validPassword } from './validation';

export class AuthSigninInput {
  @Matches(validEmail.regexp, { message: validEmail.message })
  email: string;

  @Matches(validPassword.regexp, { message: validPassword.message })
  password: string;
}
