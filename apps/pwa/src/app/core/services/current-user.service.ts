import { Injectable } from '@angular/core';
import { CurrentUser } from '@fullstack/data';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private currentUserSubject: BehaviorSubject<CurrentUser>;

  constructor() {
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

  deleteCurrentUser(): void {
    this.setCurrentUser(undefined);
    localStorage.removeItem('currentUser');
  }
}
