import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface LogoutDialogData {
  title?: string;
  message: string;
}

@Component({
  standalone: true,
  selector: 'app-logout-alert',
  templateUrl: './logout-alert.dialog.component.html',
  styleUrls: ['./logout-alert.dialog.component.css']
})
export class LogoutAlertDialog {
  constructor(
    public dialogRef: MatDialogRef<LogoutAlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: LogoutDialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
