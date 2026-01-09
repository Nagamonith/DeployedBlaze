
import { Component, OnInit, OnDestroy, NgZone, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { interval, Subscription } from 'rxjs';
import * as microsoftTeams from '@microsoft/teams-js';
import { CommonModule } from '@angular/common';
import { DxTabPanelModule } from 'devextreme-angular';
import { LeaveComponent } from "../leave/leave.component";

@Component({
  selector: 'app-worklog',
  standalone: true,
  templateUrl: './worklog.component.html',
  styleUrls: ['./worklog.component.css'],
  imports: [CommonModule, DxTabPanelModule, LeaveComponent]
})
export class WorklogComponent implements OnInit, OnDestroy {
  userId: string = '';
  apiBaseUrl: string = 'https://blazebackend.qualis40.io';
  currentTime: string = '';
  sessionActive: boolean = false;
  loginTime: string = '';
  logoutTime: string = '';
  sessionDuration: string = '';
  logoutClicked: boolean = false;
  activeTab: string = 'wfh';

  private timerSub!: Subscription;
  private loginDate!: Date;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.updateCurrentTime();
    setInterval(() => this.updateCurrentTime(), 1000);
    this.initializeTeams();

    // Restore local session
    const saved = localStorage.getItem('worklog-session');
    if (saved) {
      const session = JSON.parse(saved);
      if (session.sessionActive) {
        this.startSession(session.loginTime, true);
      } else if (session.logoutClicked) {
        this.loginTime = session.loginTime;
        this.logoutTime = session.logoutTime;
        this.sessionDuration = session.sessionDuration;
        this.logoutClicked = true;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.timerSub) this.timerSub.unsubscribe();
  }

  private initializeTeams() {
    microsoftTeams.app.initialize()
      .then(() => microsoftTeams.app.getContext())
      .then((context: any) => {
        this.userId = context.user?.userPrincipalName || context.userPrincipalName || context.user?.id;
        console.log('[Worklog] Teams initialized. UserId:', this.userId);
      })
      .catch(err => {
        console.error('[Worklog] Teams init error:', err);
        this.showMessage('⚠️ Teams initialization failed, using fallback user.');
        this.userId = 'local.user@example.com';
      });
  }

  logAction(actionType: 'Login' | 'Logout') {
    const actionLabel = actionType === 'Login' ? 'login' : 'logout';

    const snackRef = this.snackBar.openFromComponent(ConfirmSnackBarComponent, {
      data: { message: `Are you sure you want to ${actionLabel}?`, actionType },
      duration: 0, 
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['confirm-snackbar']
    });

    snackRef.instance.onDecision = (decision: 'yes' | 'no') => {
      snackRef.dismiss();

      if (decision === 'yes') {
        this.performAction(actionType);
      } else {
        this.showMessage(`${actionType} cancelled.`);
      }
    };
  }

  private performAction(actionType: 'Login' | 'Logout') {
    if (!this.userId) {
      this.showMessage(' User not identified yet!');
      return;
    }

   const actionTime = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' }).replace(' ', 'T') + '+05:30';


    const payload: any = {
      employeeIdentifier: this.userId,
      actionType: actionType,
      actionTime: actionTime
    };

    console.log('[Worklog] Sending payload:', payload);

    if (actionType === 'Login') this.startSession(actionTime);
    else if (actionType === 'Logout') this.endSession(actionTime);

    this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
      next: () => this.showMessage(`${actionType} at ${actionTime}`),
      error: err => {
        console.warn('[Worklog] API error, continuing locally:', err);
        this.showMessage(`${actionType} at ${actionTime}`);
      }
    });
  }


  private startSession(istTime: string, restoring: boolean = false) {
    this.sessionActive = true;
    this.logoutClicked = false;
    this.loginTime = istTime;
    this.logoutTime = '';
    this.loginDate = new Date(istTime);

    this.timerSub = interval(1000).subscribe(() => {
      const diff = new Date().getTime() - this.loginDate.getTime();
      this.sessionDuration = this.formatDuration(diff);
      localStorage.setItem('worklog-session', JSON.stringify({
        sessionActive: true,
        loginTime: this.loginTime,
        sessionDuration: this.sessionDuration,
        logoutClicked: false
      }));
    });

  }

  private endSession(actionTime: string) {
    this.logoutClicked = true;
    this.sessionActive = false;
    if (this.timerSub) this.timerSub.unsubscribe();

    this.logoutTime = actionTime;
    const diff = new Date().getTime() - this.loginDate.getTime();
    this.sessionDuration = this.formatDuration(diff);

    localStorage.setItem('worklog-session', JSON.stringify({
      sessionActive: false,
      loginTime: this.loginTime,
      logoutTime: this.logoutTime,
      sessionDuration: this.sessionDuration,
      logoutClicked: true
    }));

    setTimeout(() => {
      this.loginTime = '';
      this.logoutTime = '';
      this.sessionDuration = '';
      this.logoutClicked = false;
      localStorage.removeItem('worklog-session');
    },);
  }

  private formatDuration(ms: number): string {
    const hours = Math.floor(ms / 1000 / 60 / 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number) {
    return num.toString().padStart(2, '0');
  }

  private updateCurrentTime() {
    this.currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }

  private showMessage(msg: string) {
    this.snackBar.open(msg, 'Close', { duration: 4000 });
  }
}


@Component({
  selector: 'app-confirm-snackbar',
  template: `
    <div class="confirm-snackbar-content">
      <span>{{ data.message }}</span>
      <div class="confirm-buttons">
        <button mat-button color="primary" (click)="choose('yes')">Yes</button>
        <button mat-button color="warn" (click)="choose('no')">No</button>
      </div>
    </div>
  `,
  styles: [`
    .confirm-snackbar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      width: 100%;
    }
    .confirm-buttons {
      display: flex;
      gap: 8px;
    }
    button {
      font-weight: 600;
      text-transform: uppercase;
    }
  `]
})
export class ConfirmSnackBarComponent {
  onDecision!: (decision: 'yes' | 'no') => void;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<ConfirmSnackBarComponent>
  ) {}

  choose(decision: 'yes' | 'no') {
    if (this.onDecision) this.onDecision(decision);
  }
}
