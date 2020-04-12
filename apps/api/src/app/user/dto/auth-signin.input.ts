import { validEmail, validPassword } from '@fullstack/data';
import { Matches } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AuthSigninInput {
  @Field()
  @Matches(validEmail.regexp, { message: validEmail.message })
  email: string;

  @Field()
  @Matches(validPassword.regexp, { message: validPassword.message })
  password: string;
}
