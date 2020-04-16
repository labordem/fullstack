import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'pwa-dialog-check-mailbox',
  templateUrl: './dialog-check-mailbox.component.html',
})
export class DialogCheckMailboxComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DialogCheckMailboxComponent>) {}

  ngOnInit(): void {}

  onClose() {
    this.dialogRef.close();
  }
}
