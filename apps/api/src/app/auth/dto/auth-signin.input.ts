import { Field, InputType } from 'type-graphql';

@InputType()
export class AuthSigninInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
