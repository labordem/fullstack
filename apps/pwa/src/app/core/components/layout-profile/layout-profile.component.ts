import { Component, Input, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurrentUser } from '@fullstack/data';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'pwa-layout-profile',
  templateUrl: './layout-profile.component.html',
  styleUrls: ['./layout-profile.component.scss']
})
export class LayoutProfileComponent {
  @Input() currentUser: CurrentUser;

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  onSignout() {
    this.authService.signout();
  }

  onOpenDialog(templateRef: TemplateRef<Component>) {
    this.dialog.open(templateRef);
  }

  onCloseDialog() {
    this.dialog.closeAll();
  }
}
