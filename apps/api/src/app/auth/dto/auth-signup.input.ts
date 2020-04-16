import { validEmail, validPassword, validUsername } from '@fullstack/data';
import { Matches } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AuthSignupInput {
  @Field()
  @Matches(validEmail.regexp, { message: validEmail.message })
  email: string;

  @Field()
  @Matches(validPassword.regexp, { message: validPassword.message })
  password: string;

  @Field()
  @Matches(validUsername.regexp, { message: validUsername.message })
  username: string;
}
