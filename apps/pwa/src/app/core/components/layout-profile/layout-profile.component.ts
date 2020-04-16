import { Component, Input, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurrentUser } from '@fullstack/data';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'pwa-layout-profile',
  templateUrl: './layout-profile.component.html',
  styleUrls: ['./layout-profile.component.scss'],
})
export class LayoutProfileComponent {
  @Input() currentUser: CurrentUser;

  constructor(
    private currentUserService: CurrentUserService,
    public dialog: MatDialog
  ) {}

  onSignout() {
    this.currentUserService.deleteCurrentUser();
  }

  onOpenDialog(templateRef: TemplateRef<Component>) {
    this.dialog.open(templateRef);
  }

  onCloseDialog() {
    this.dialog.closeAll();
  }
}
