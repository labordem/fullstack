import { Injectable } from '@angular/core';
import { AuthSigninInput, AuthSignupInput, CurrentUser } from '@fullstack/data';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentUserService } from '../../core/services/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  graphqlUrl: string;

  constructor(
    private currentUserService: CurrentUserService,
    private apollo: Apollo
  ) {}

  signin(authSigninInput: AuthSigninInput): Observable<CurrentUser> {
    const mutation = gql`
      query($authSigninInput: AuthSigninInput!) {
        signin(authSigninInput: $authSigninInput)
      }
    `;
    const variables = { authSigninInput };
    return this.apollo
      .mutate<any>({ mutation, variables })
      .pipe(map((res) => this.setCurrentUserFromUserToken(res.data.signin)));
  }

  signup(authSignupInput: AuthSignupInput): Observable<CurrentUser> {
    const mutation = gql`
      mutation($authSignupInput: AuthSignupInput!) {
        signup(authSignupInput: $authSignupInput)
      }
    `;
    const variables = { authSignupInput };
    return this.apollo
      .mutate<any>({ mutation, variables })
      .pipe(map((res) => this.setCurrentUserFromUserToken(res.data.signup)));
  }

  confirmEmail(emailToken: string): Observable<CurrentUser> {
    const mutation = gql`
      mutation($emailToken: String!) {
        confirmEmail(emailToken: $emailToken)
      }
    `;
    const variables = { emailToken };
    return this.apollo
      .mutate<any>({ mutation, variables })
      .pipe(
        map((res) => this.setCurrentUserFromUserToken(res.data.confirmEmail))
      );
  }

  sendEmailConfirmation(currentUserId: number): Observable<boolean> {
    const query = gql`
      query($currentUserId: Float!) {
        sendEmailConfirmation(currentUserId: $currentUserId)
      }
    `;
    const variables = { currentUserId };
    return this.apollo
      .query<any>({ query, variables })
      .pipe(map((res) => res.data.sendEmailConfirmation));
  }

  private setCurrentUserFromUserToken(userToken: string) {
    const newCurrentUser = JSON.parse(atob(userToken.split('.')[1]))
      .currentUser as CurrentUser;
    return this.currentUserService.setCurrentUser(newCurrentUser);
  }
}
