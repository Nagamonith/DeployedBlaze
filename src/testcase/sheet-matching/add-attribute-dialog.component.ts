import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  MatDialogModule, 
  MatDialogRef, 
  MAT_DIALOG_DATA 
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-attribute-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule
  ],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title class="dialog-title">
        <mat-icon class="title-icon">add_circle</mat-icon>
        Add Custom Attribute
      </h2>
      
      <mat-dialog-content class="dialog-content">
        <mat-form-field appearance="outline" class="attribute-input">
          <mat-label>Attribute Name</mat-label>
          <input 
            matInput
            [(ngModel)]="attributeName" 
            placeholder="Enter attribute name"
            (keyup.enter)="save()"
            #attributeInput
            autofocus
          />
          <mat-hint>This will be added to all test cases</mat-hint>
        </mat-form-field>
        
        <div class="error-message" [class.visible]="error" [class.hidden]="!error">
          <mat-icon>error</mat-icon>
          <span>{{ error }}</span>
        </div>
      </mat-dialog-content>
      
      <mat-dialog-actions align="end" class="dialog-actions">
        <button 
          mat-button
          (click)="dialogRef.close()"
          class="cancel-btn"
        >
          Cancel
        </button>
        <button 
          mat-raised-button
          color="primary"
          (click)="save()"
          class="save-btn"
          [disabled]="!attributeName.trim()"
        >
          <span>Save</span>
          <mat-icon class="save-icon">save</mat-icon>
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      width: 400px;
      max-width: 90vw;
      border: 1px solid rgba(255, 255, 255, 0.3);
      animation: fadeIn 0.3s ease-out forwards;
      opacity: 0;
      transform: translateY(-20px);
    }

    @keyframes fadeIn {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dialog-title {
      display: flex;
      align-items: center;
      color: #2c3e50;
      font-weight: 600;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .title-icon {
      color: #3498db;
      margin-right: 10px;
      transform: scale(1.2);
    }

    .dialog-content {
      padding: 16px 0;
    }

    .attribute-input {
      width: 100%;
      margin-bottom: 16px;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #e74c3c;
      background: rgba(231, 76, 60, 0.1);
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      max-height: 0;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .error-message.visible {
      max-height: 100px;
      margin-top: 8px;
      opacity: 1;
    }

    .error-message.hidden {
      max-height: 0;
      margin-top: 0;
      opacity: 0;
      padding: 0;
    }

    .error-message mat-icon {
      font-size: 18px;
    }

    .dialog-actions {
      padding: 16px 0 0 0;
      margin: 0;
    }

    .cancel-btn {
      color: #7f8c8d;
      transition: all 0.3s ease;
      border-radius: 20px;
      padding: 0 16px;
    }

    .cancel-btn:hover {
      background: rgba(127, 140, 141, 0.1);
      color: #34495e;
      transform: translateY(-1px);
    }

    .save-btn {
      transition: all 0.3s ease;
      border-radius: 20px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 6px;
      background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
      box-shadow: 0 2px 10px rgba(52, 152, 219, 0.3);
    }

    .save-btn:hover:not([disabled]) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
    }

    .save-btn:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }

    .save-icon {
      font-size: 18px;
      transition: transform 0.3s ease;
    }

    .save-btn:hover:not([disabled]) .save-icon {
      transform: scale(1.1);
    }
  `]
})
export class AddAttributeDialogComponent {
  attributeName = '';
  error = '';

  constructor(
    public dialogRef: MatDialogRef<AddAttributeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { existing: string[] }
  ) {}

  save(): void {
    this.error = '';
    
    if (!this.attributeName.trim()) {
      this.error = 'Attribute name is required';
      return;
    }

    if (this.data.existing.includes(this.attributeName.trim())) {
      this.error = 'This attribute already exists';
      return;
    }

    this.dialogRef.close(this.attributeName.trim());
  }
}