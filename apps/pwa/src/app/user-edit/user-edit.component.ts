import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentUser } from '@fullstack/data';
import { take } from 'rxjs/operators';
import { CurrentUserService } from '../core/services/current-user.service';

@Component({
  selector: 'pwa-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string;
  isLoading: boolean;
  currentUser: CurrentUser;

  constructor(
    private formBuilder: FormBuilder,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.currentUserService
      .getCurrentUser$()
      .pipe(take(1))
      .subscribe((currentUser) => (this.currentUser = currentUser));
    this.formGroup = this.formBuilder.group({
      description: [null, [Validators.maxLength(190)]],
    });
  }

  async onImportImage(e): Promise<void> {
    e.preventDefault();
    const files = e.target?.files || e.dataTransfer?.files;
    Object.keys(files).forEach(async (key) => {
      const file = files[key];
      console.log('file: ', file);
      const avatar = (await this.readUrl(file)) as string;
      this.currentUser.avatar = avatar;
    });
  }

  private readUrl(file: File): Promise<unknown> {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e) => res(e.target.result);
      reader.onerror = (e) => rej(e);
      reader.readAsDataURL(file);
    });
  }

  async submit(formGroup: FormGroup): Promise<void> {
    this.currentUserService.setCurrentUser(this.currentUser);
  }
}
