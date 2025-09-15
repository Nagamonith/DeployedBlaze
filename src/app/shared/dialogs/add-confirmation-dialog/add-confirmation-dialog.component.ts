// add-confirmation-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './add-confirmation-dialog.component.html',
  styleUrls: ['./add-confirmation-dialog.component.css']
})
export class AddConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message?: string }
  ) {}

  onAdd(): void {
    this.dialogRef.close(true); // Confirm add
  }

  onClose(): void {
    this.dialogRef.close(false); // Cancel
  }
}
