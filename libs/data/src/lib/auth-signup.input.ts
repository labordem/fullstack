import { Matches } from 'class-validator';
import { validEmail, validPassword, validUsername } from './validation';

export class AuthSignupInput {
  @Matches(validEmail.regexp, { message: validEmail.message })
  email: string;

  @Matches(validPassword.regexp, { message: validPassword.message })
  password: string;

  @Matches(validUsername.regexp, { message: validUsername.message })
  username: string;
}
