import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUser } from '@fullstack/data';
import { take } from 'rxjs/operators';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { DialogCheckMailboxComponent } from '../../../shared/components/dialog-check-mailbox/dialog-check-mailbox.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'pwa-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['../../auth.component.scss'],
})
export class EmailConfirmationComponent implements OnInit {
  isLoading: boolean;
  currentUser: CurrentUser;
  errorMessage: string;
  emailToken: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private currentUserService: CurrentUserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  async ngOnInit() {
    const params = await this.activatedRoute.paramMap.pipe(take(1)).toPromise();
    this.emailToken = params.get('emailToken');
    if (this.emailToken) {
      this.isLoading = true;
      this.authService
        .confirmEmail(this.emailToken)
        .pipe(take(1))
        .subscribe(
          (res) => (this.currentUser = res),
          (err) =>
            (this.errorMessage = err?.error?.message || err?.message || err)
        )
        .add(() => (this.isLoading = false));
    }
  }

  onSendEmailConfirmation() {
    this.isLoading = true;
    const currentUser = this.currentUserService.getCurrentUser();
    this.authService
      .sendEmailConfirmation(currentUser.id)
      .pipe(take(1))
      .subscribe(
        async (res) => {
          const dialog = this.dialog.open(DialogCheckMailboxComponent);
          await dialog.afterClosed().pipe(take(1)).toPromise();
          this.router.navigate(['/home']);
        },
        (err) =>
          (this.errorMessage = err?.error?.message || err?.message || err)
      )
      .add(() => (this.isLoading = false));
  }
}
