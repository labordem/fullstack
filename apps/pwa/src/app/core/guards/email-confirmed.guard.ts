import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class EmailConfirmedGuard implements CanActivate {
  constructor(
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  canActivate() {
    const currentUser = this.currentUserService.getCurrentUser();

    if (currentUser?.isConfirmed) {
      return true;
    } else {
      this.router.navigate(['auth/email-verification']);
      return false;
    }
  }
}
