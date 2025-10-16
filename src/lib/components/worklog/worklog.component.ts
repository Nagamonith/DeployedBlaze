import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  // ✅ Only initializes Teams and gets user info
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

  // ✅ Logs user login/logout actions
  logAction(actionType: 'Login' | 'Logout') {
    if (!this.userId) {
      this.showMessage('⚠️ User not identified yet!');
      return;
    }

    const istDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const actionTime = istDate.toISOString();

    const payload: any = {
      employeeIdentifier: this.userId,
      actionType: actionType,
      actionTime: actionTime
    };

    console.log('[Worklog] Sending payload:', payload);

    if (actionType === 'Login') this.startSession(actionTime);
    else if (actionType === 'Logout') this.endSession(actionTime);

    this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
      next: () => this.showMessage(`${actionType} logged at ${actionTime}`),
      error: err => {
        console.warn('[Worklog] API error, continuing locally:', err);
        this.showMessage(`(Local) ${actionType} logged at ${actionTime}`);
      }
    });
  }

  // ✅ Start and track session time
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

    if (!restoring) this.showMessage(`Session started at ${istTime}`);
  }

  // ✅ End session and clear timer
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

    // Reset after 10 seconds
    setTimeout(() => {
      this.loginTime = '';
      this.logoutTime = '';
      this.sessionDuration = '';
      this.logoutClicked = false;
      localStorage.removeItem('worklog-session');
    }, 10000);
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
