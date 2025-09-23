
// import { CommonModule } from '@angular/common';
// import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { interval, Subscription } from 'rxjs';
// import { DxTabPanelModule } from 'devextreme-angular';
// import * as microsoftTeams from '@microsoft/teams-js';

// @Component({
//   selector: 'app-worklog',
//   standalone: true,
//   templateUrl: './worklog.component.html',
//   styleUrls: ['./worklog.component.css'],
//   imports: [CommonModule, DxTabPanelModule]
// })
// export class WorklogComponent implements OnInit, OnDestroy {

//   userId: string = '';
//   apiBaseUrl: string = 'https://blazebackend.qualis40.io';
//   currentTime: string = '';

//   sessionActive: boolean = false;
//   loginTime: string = '';
//   logoutTime: string = '';
//   sessionDuration: string = '';
//   logoutClicked: boolean = false;

//   private timerSub!: Subscription;
//   private loginDate!: Date;
//   private presenceSub!: Subscription;
//   activeTab: any = 'wfh';

//   // ✅ Presence summary storage
//   private presenceSummary: Record<string, number> = {
//     Available: 0,
//     Busy: 0,
//     InAMeeting: 0,
//     DoNotDisturb: 0,
//     Away: 0,
//     Offline: 0
//   };

//   constructor(
//     private http: HttpClient,
//     private snackBar: MatSnackBar,
//     private ngZone: NgZone
//   ) {}

//   ngOnInit(): void {
//     this.updateCurrentTime();
//     setInterval(() => this.updateCurrentTime(), 1000);

//     this.initializeTeams();

//     const saved = localStorage.getItem('worklog-session');
//     if (saved) {
//       const session = JSON.parse(saved);
//       if (session.sessionActive) {
//         this.startSession(session.loginTime, true);
//       } else if (session.logoutClicked) {
//         this.loginTime = session.loginTime;
//         this.logoutTime = session.logoutTime;
//         this.sessionDuration = session.sessionDuration;
//         this.logoutClicked = true;
//       }
//     }
//   }

//   ngOnDestroy(): void {
//     if (this.timerSub) this.timerSub.unsubscribe();
//     if (this.presenceSub) this.presenceSub.unsubscribe();
//   }

//   // =================== Teams SDK Integration ===================
//   initializeTeams() {
//     microsoftTeams.app.initialize()
//       .then(() => microsoftTeams.app.getContext())
//       .then((context: any) => {
//         microsoftTeams.app.notifySuccess();

//         this.userId = context.user?.userPrincipalName
//                    || context.userPrincipalName
//                    || context.user?.id
//                    || context.userObjectId;

//         console.log('[Worklog] UserId:', this.userId);

//         // ✅ Start presence polling once Teams context is ready
//         this.startPresencePolling();
//       })
//       .catch(err => {
//         console.error('[Worklog] Teams init error:', err);
//         this.showMessage('⚠️ Teams init failed, using fallback user.');
//         this.userId = 'local.user@example.com';
//       });
//   }

//   updateCurrentTime() {
//     this.currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
//   }

//   logAction(actionType: 'Login' | 'Logout') {
//     if (!this.userId) {
//       this.showMessage('⚠️ User not identified yet!');
//       return;
//     }

//     const istDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
//     const actionTime = istDate.toISOString();

//     let payload: any = {
//       employeeIdentifier: this.userId,
//       actionType: actionType,
//       actionTime: actionTime
//     };

//     // ✅ At logout, include deskTime
//     if (actionType === 'Logout') {
//       payload.deskTime = this.calculateDeskTime();
//     }

//     console.log('[Worklog] Sending payload:', payload);

//     this.handleSession(actionType, actionTime);

//     this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
//       next: () => this.showMessage(`${actionType} logged at ${actionTime}`),
//       error: err => {
//         console.warn('[Worklog] API error, continuing locally:', err);
//         this.showMessage(`(Local) ${actionType} logged at ${actionTime}`);
//       }
//     });
//   }

//   private handleSession(actionType: 'Login' | 'Logout', actionTime: string) {
//     if (actionType === 'Login') {
//       this.startSession(actionTime);
//     } else if (actionType === 'Logout') {
//       this.endSession(actionTime);
//     }
//   }

//   startSession(istTime: string, restoring: boolean = false) {
//     this.sessionActive = true;
//     this.logoutClicked = false;
//     this.loginTime = istTime;
//     this.logoutTime = '';
//     this.loginDate = new Date(istTime);

//     this.timerSub = interval(1000).subscribe(() => {
//       const diff = new Date().getTime() - this.loginDate.getTime();
//       this.sessionDuration = this.formatDuration(diff);

//       localStorage.setItem('worklog-session', JSON.stringify({
//         sessionActive: true,
//         loginTime: this.loginTime,
//         sessionDuration: this.sessionDuration,
//         logoutClicked: false
//       }));
//     });

//     if (!restoring) {
//       this.showMessage(`Session started at ${istTime}`);
//     }
//   }

//   endSession(actionTime: string) {
//     this.logoutClicked = true;
//     this.sessionActive = false;
//     if (this.timerSub) this.timerSub.unsubscribe();

//     this.logoutTime = actionTime;
//     const diff = new Date().getTime() - this.loginDate.getTime();
//     this.sessionDuration = this.formatDuration(diff);

//     localStorage.setItem('worklog-session', JSON.stringify({
//       sessionActive: false,
//       loginTime: this.loginTime,
//       logoutTime: this.logoutTime,
//       sessionDuration: this.sessionDuration,
//       logoutClicked: true
//     }));

//     setTimeout(() => {
//       this.loginTime = '';
//       this.logoutTime = '';
//       this.sessionDuration = '';
//       this.logoutClicked = false;
//       localStorage.removeItem('worklog-session');
//     }, 10000);
//   }

//   // =================== Presence Handling ===================
//   private startPresencePolling() {
//     // Poll every 5 minutes
//     this.presenceSub = interval(5 * 60 * 1000).subscribe(() => {
//       this.fetchPresence();
//     });
//     // Do first fetch immediately
//     this.fetchPresence();
//   }

//   private fetchPresence() {
//     // TODO: replace with Graph API call using Teams SSO token
//     // Mock presence for now
//     const statuses = ['Available', 'Busy', 'InAMeeting', 'DoNotDisturb', 'Away', 'Offline'];
//     const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

//     this.presenceSummary[randomStatus] += 300; // 5 min in seconds

//     console.log('[Worklog] Presence update:', randomStatus, this.presenceSummary);
//   }

//   private calculateDeskTime(): string {
//    const totalSeconds =
//   (this.presenceSummary['Available'] || 0) +
//   (this.presenceSummary['Busy'] || 0) +
//   (this.presenceSummary['InAMeeting'] || 0) +
//   (this.presenceSummary['DoNotDisturb'] || 0) -
//   (this.presenceSummary['Away'] || 0) -
//   (this.presenceSummary['Offline'] || 0);

//     return this.formatDuration(totalSeconds * 1000);
//   }

//   // =================== Helpers ===================
//   private formatDuration(ms: number): string {
//     const hours = Math.floor(ms / 1000 / 60 / 60);
//     const minutes = Math.floor((ms / 1000 / 60) % 60);
//     const seconds = Math.floor((ms / 1000) % 60);
//     return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
//   }

//   private pad(num: number) {
//     return num.toString().padStart(2, '0');
//   }

//   private showMessage(msg: string) {
//     this.snackBar.open(msg, 'Close', { duration: 4000 });
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscription } from 'rxjs';
import { DxTabPanelModule } from 'devextreme-angular';
import * as microsoftTeams from '@microsoft/teams-js';
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

  private timerSub!: Subscription;
  private loginDate!: Date;
  private presenceSub!: Subscription;
  private lastPresenceFetch: number = Date.now();
  activeTab: any = 'wfh';

  // Presence summary in seconds
  private presenceSummary: Record<string, number> = {
    Available: 0,
    Busy: 0,
    InAMeeting: 0,
    DoNotDisturb: 0,
    Away: 0,
    Offline: 0
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.updateCurrentTime();
    setInterval(() => this.updateCurrentTime(), 1000);

    this.initializeTeams();

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
    if (this.presenceSub) this.presenceSub.unsubscribe();
  }

  // =================== Teams SDK Integration ===================
  initializeTeams() {
    microsoftTeams.app.initialize()
      .then(() => microsoftTeams.app.getContext())
      .then((context: any) => {
        microsoftTeams.app.notifySuccess();

        this.userId = context.user?.userPrincipalName
                   || context.userPrincipalName
                   || context.user?.id
                   || context.userObjectId;

        console.log('[Worklog] UserId:', this.userId);

        // ✅ Start presence polling once Teams context is ready
        this.startPresencePolling();
      })
      .catch(err => {
        console.error('[Worklog] Teams init error:', err);
        this.showMessage('⚠️ Teams init failed, using fallback user.');
        this.userId = 'local.user@example.com';
      });
  }

  updateCurrentTime() {
    this.currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }

  logAction(actionType: 'Login' | 'Logout') {
    if (!this.userId) {
      this.showMessage('⚠️ User not identified yet!');
      return;
    }

    const istDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const actionTime = istDate.toISOString();

    let payload: any = {
      employeeIdentifier: this.userId,
      actionType: actionType,
      actionTime: actionTime
    };

    // ✅ At logout, include DeskTime
    if (actionType === 'Logout') {
      payload.deskTime = this.calculateDeskTime();
    }

    console.log('[Worklog] Sending payload:', payload);

    this.handleSession(actionType, actionTime);

    this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
      next: () => this.showMessage(`${actionType} logged at ${actionTime}`),
      error: err => {
        console.warn('[Worklog] API error, continuing locally:', err);
        this.showMessage(`(Local) ${actionType} logged at ${actionTime}`);
      }
    });
  }

  private handleSession(actionType: 'Login' | 'Logout', actionTime: string) {
    if (actionType === 'Login') {
      this.startSession(actionTime);
    } else if (actionType === 'Logout') {
      this.endSession(actionTime);
    }
  }

  startSession(istTime: string, restoring: boolean = false) {
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

    if (!restoring) {
      this.showMessage(`Session started at ${istTime}`);
    }
  }

  endSession(actionTime: string) {
    this.logoutClicked = true;
    this.sessionActive = false;
    if (this.timerSub) this.timerSub.unsubscribe();
    if (this.presenceSub) this.presenceSub.unsubscribe();

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
    }, 10000);
  }

  // =================== Presence Handling ===================
  private startPresencePolling() {
    // First fetch immediately
    this.fetchPresence();

    // Poll every 5 minutes
    this.presenceSub = interval(5 * 60 * 1000).subscribe(() => {
      this.fetchPresence();
    });
  }

  private fetchPresence() {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - this.lastPresenceFetch) / 1000);
    this.lastPresenceFetch = now;

    // TODO: replace mock with Graph API call using Teams SSO token
    const statuses = ['Available', 'Busy', 'InAMeeting', 'DoNotDisturb', 'Away', 'Offline'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    if (this.presenceSummary[randomStatus] !== undefined) {
      this.presenceSummary[randomStatus] += elapsedSeconds;
    }

    console.log('[Worklog] Presence update:', randomStatus, this.presenceSummary);
  }

  private calculateDeskTime(): string {
    const totalSeconds =
      (this.presenceSummary['Available'] || 0) +
      (this.presenceSummary['Busy'] || 0) +
      (this.presenceSummary['InAMeeting'] || 0) +
      (this.presenceSummary['DoNotDisturb'] || 0) -
      (this.presenceSummary['Away'] || 0) -
      (this.presenceSummary['Offline'] || 0);

    return this.formatDuration(totalSeconds * 1000);
  }

  // =================== Helpers ===================
  private formatDuration(ms: number): string {
    const hours = Math.floor(ms / 1000 / 60 / 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number) {
    return num.toString().padStart(2, '0');
  }

  private showMessage(msg: string) {
    this.snackBar.open(msg, 'Close', { duration: 4000 });
  }
}
