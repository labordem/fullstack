import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSigninInput, validEmail } from '@fullstack/data';
import { take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'pwa-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../../auth.component.scss'],
})
export class SigninComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string;
  hidePassword: boolean;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hidePassword = true;

    this.formGroup = this.formBuilder.group(
      {
        email: [
          null,
          [Validators.required, Validators.pattern(validEmail.regexp)],
        ],
        password: [null, [Validators.required]],
      },
      {
        validators: this.mustNotBeRejectedValidator(),
      }
    );
  }

  async submit(formGroup: FormGroup): Promise<void> {
    const authSigninInput: AuthSigninInput = {
      email: formGroup.getRawValue().email,
      password: formGroup.getRawValue().password,
    };
    this.errorMessage = undefined;
    this.hidePassword = true;
    this.isLoading = true;
    this.formGroup.disable();
    this.authService
      .signin(authSigninInput)
      .pipe(take(1))
      .subscribe(
        (res) => this.router.navigate(['home']),
        (err) => {
          this.errorMessage = err?.graphQLErrors
            ? err?.graphQLErrors[0]?.message?.message
            : err?.networkError?.message;
          this.isLoading = false;
          this.formGroup.enable();
        }
      );
  }

  private mustNotBeRejectedValidator(): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      if (this.errorMessage === 'email not found') {
        formGroup.controls['email'].setErrors({ mustNotBeRejected: true });
        this.errorMessage = 'Please check your email';
      }
      if (this.errorMessage === 'incorrect password') {
        formGroup.controls['password'].setErrors({ mustNotBeRejected: true });
        this.errorMessage = 'Please check your password';
      }
      return;
    };
  }
}
