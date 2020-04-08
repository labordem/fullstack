import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthSigninInput, AuthSignupInput, CurrentUser } from '@fullstack/data';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { environment } from 'apps/pwa/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<CurrentUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(
      JSON.parse(localStorage.getItem('currentUser')) || undefined
    );
  }

  getCurrentUser$(): Observable<CurrentUser> {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUser(): CurrentUser {
    return this.currentUserSubject.value;
  }

  setCurrentUser(newValue: CurrentUser): CurrentUser {
    this.currentUserSubject.next(newValue);
    localStorage.setItem('currentUser', JSON.stringify(newValue));
    return this.getCurrentUser();
  }

  async signin(signinForm: AuthSigninInput): Promise<CurrentUser> {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000);
    return this.setCurrentUser({
      id: 1,
      username: 'totolasticot',
      email: 'toto@lasticot.fr',
      created: new Date(),
      updated: new Date()
    });
  }

  async signup(signupForm: AuthSignupInput): Promise<CurrentUser> {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000);
    return this.http
      .post<CurrentUser>(
        `${environment.API_DOMAIN}/${environment.API_PREFIX}:${environment.API_PORT}/auth/signup`,
        signupForm
      )
      .toPromise();
  }

  signout(): void {
    this.setCurrentUser(undefined);
    localStorage.removeItem('currentUser');
  }
}
