import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthSigninInput } from '../dto/auth-signin.input';
import { AuthSignupInput } from '../dto/auth-signup.input';
import { AuthService } from '../services/auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query((returns) => String)
  signin(@Args('authSigninInput') data: AuthSigninInput) {
    return this.authService.signin(data);
  }

  @Mutation((returns) => String)
  signup(@Args('authSignupInput') data: AuthSignupInput) {
    return this.authService.signup(data);
  }

  @Query((returns) => String)
  sendEmailConfirmation(@Args('currentUserId') data: number) {
    return this.authService.sendEmailConfirmation(data);
  }

  @Mutation((returns) => String)
  confirmEmail(@Args('emailToken') data: string) {
    return this.authService.confirmEmail(data);
  }
}
