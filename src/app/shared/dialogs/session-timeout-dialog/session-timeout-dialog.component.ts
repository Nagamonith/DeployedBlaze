import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-session-timeout-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="session-timeout-dialog">
      <h2 mat-dialog-title>Session Timeout Warning</h2>
      <mat-dialog-content>
        <div class="warning-icon">⚠️</div>
        <p class="warning-message">
          Your session will expire in <strong>{{ remainingMinutes }} minutes</strong> due to inactivity.
        </p>
        <p class="sub-message">
          Click "Continue Session" to stay logged in, or you will be automatically logged out.
        </p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="logout()" class="btn-logout">
          Logout Now
        </button>
        <button mat-raised-button color="primary" (click)="continueSession()" class="btn-continue">
          Continue Session
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .session-timeout-dialog {
      padding: 20px;
      min-width: 400px;
    }

    h2 {
      color: #f44336;
      margin: 0 0 20px 0;
      font-size: 20px;
      font-weight: 600;
    }

    mat-dialog-content {
      text-align: center;
      padding: 20px 0;
    }

    .warning-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .warning-message {
      font-size: 16px;
      color: #333;
      margin: 0 0 12px 0;
    }

    .warning-message strong {
      color: #f44336;
      font-weight: 600;
    }

    .sub-message {
      font-size: 14px;
      color: #666;
      margin: 0;
    }

    mat-dialog-actions {
      padding: 20px 0 0 0;
      gap: 12px;
    }

    .btn-logout {
      color: #666;
    }

    .btn-continue {
      background-color: #00a4e4 !important;
      color: white !important;
    }

    @media (max-width: 500px) {
      .session-timeout-dialog {
        min-width: 300px;
        padding: 16px;
      }

      mat-dialog-actions {
        flex-direction: column;
        gap: 8px;
      }

      button {
        width: 100%;
      }
    }
  `]
})
export class SessionTimeoutDialogComponent {
  remainingMinutes: number = 5;

  constructor(
    public dialogRef: MatDialogRef<SessionTimeoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { remainingTime: number }
  ) {
    this.remainingMinutes = Math.ceil(data.remainingTime / 60);
  }

  continueSession() {
    this.dialogRef.close({ action: 'continue' });
  }

  logout() {
    this.dialogRef.close({ action: 'logout' });
  }
}
