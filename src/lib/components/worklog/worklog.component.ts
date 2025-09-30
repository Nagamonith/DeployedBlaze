// import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { interval, Subscription } from 'rxjs';
// import * as microsoftTeams from '@microsoft/teams-js';
// import { CommonModule } from '@angular/common';
// import { DxTabPanelModule } from 'devextreme-angular';
// import { LeaveComponent } from "../leave/leave.component";

// @Component({
//   selector: 'app-worklog',
//   standalone: true,
//   templateUrl: './worklog.component.html',
//   styleUrls: ['./worklog.component.css'],
//   imports: [CommonModule, DxTabPanelModule, LeaveComponent]
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
//  activeTab: string = 'wfh';
//   private timerSub!: Subscription;
//   private presenceSub!: Subscription;
//   private loginDate!: Date;
//   private lastPresenceFetch: number = Date.now();
//   private lastStatus: string = '';
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

//   private initializeTeams() {
//     microsoftTeams.app.initialize()
//       .then(() => microsoftTeams.app.getContext())
//       .then((context: any) => {
//         this.userId = context.user?.userPrincipalName || context.userPrincipalName || context.user?.id;
//         console.log('[Worklog] Teams initialized. UserId:', this.userId);

//         // Start presence polling via Teams SSO
//         this.startPresencePolling();
//       })
//       .catch(err => {
//         console.error('[Worklog] Teams init error:', err);
//         this.showMessage('⚠️ Teams init failed, using fallback user.');
//         this.userId = 'local.user@example.com';
//       });
//   }

//   private startPresencePolling() {
//     console.log('[Worklog] Starting presence polling every 2 minutes');

//     // Initial fetch immediately
//     this.fetchPresenceFromBackend();

//     // Poll every 2 minutes
//     this.presenceSub = interval(2 * 60 * 1000).subscribe(() => {
//       console.log('[Worklog] Polling presence...');
//       this.fetchPresenceFromBackend();
//     });
//   }

//   private fetchPresenceFromBackend() {
//     microsoftTeams.authentication.getAuthToken({
//       successCallback: async (teamsToken) => {
//         try {
//           const presence: any = await this.http.post(`${this.apiBaseUrl}/api/worklog/presence`, { token: teamsToken }).toPromise();
//           this.handlePresence(presence.availability);
//         } catch (err) {
//           console.error('[Worklog] Backend presence fetch error:', err);
//         }
//       },
//       failureCallback: (err) => {
//         console.error('[Worklog] Teams SSO token error:', err);
//       }
//     });
//   }

//   private handlePresence(status: string) {
//     if (!status) return;

//     const now = Date.now();
//     const elapsedSeconds = Math.floor((now - this.lastPresenceFetch) / 1000);
//     this.lastPresenceFetch = now;

//     if (status !== this.lastStatus) {
//       console.log(`[Worklog] Status changed: ${this.lastStatus} -> ${status} (+${elapsedSeconds}s)`);
//       this.lastStatus = status;
//     }

//     this.presenceSummary[status] = (this.presenceSummary[status] || 0) + elapsedSeconds;
//     console.log('[Worklog] Updated presenceSummary:', this.presenceSummary);
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
//       actionTime: actionTime,
//       deskTime: actionType === 'Logout' ? this.calculateDeskTime() : ''
//     };

//     console.log('[Worklog] Sending payload:', payload);

//     if (actionType === 'Login') this.startSession(actionTime);
//     else if (actionType === 'Logout') this.endSession(actionTime);

//     this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
//       next: () => this.showMessage(`${actionType} logged at ${actionTime}`),
//       error: err => {
//         console.warn('[Worklog] API error, continuing locally:', err);
//         this.showMessage(`(Local) ${actionType} logged at ${actionTime}`);
//       }
//     });
//   }

//   private startSession(istTime: string, restoring: boolean = false) {
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

//     if (!restoring) this.showMessage(`Session started at ${istTime}`);
//   }

//   private endSession(actionTime: string) {
//     this.logoutClicked = true;
//     this.sessionActive = false;
//     if (this.timerSub) this.timerSub.unsubscribe();
//     if (this.presenceSub) this.presenceSub.unsubscribe();

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

//   private calculateDeskTime(): string {
//     const totalSeconds =
//       (this.presenceSummary['Available'] || 0) +
//       (this.presenceSummary['Busy'] || 0) +
//       (this.presenceSummary['InAMeeting'] || 0) +
//       (this.presenceSummary['DoNotDisturb'] || 0);

//     if (totalSeconds === 0) return this.sessionDuration; // fallback

//     return this.formatDuration(totalSeconds * 1000);
//   }

//   private formatDuration(ms: number): string {
//     const hours = Math.floor(ms / 1000 / 60 / 60);
//     const minutes = Math.floor((ms / 1000 / 60) % 60);
//     const seconds = Math.floor((ms / 1000) % 60);
//     return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
//   }

//   private pad(num: number) {
//     return num.toString().padStart(2, '0');
//   }

//   private updateCurrentTime() {
//     this.currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
//   }

//   private showMessage(msg: string) {
//     this.snackBar.open(msg, 'Close', { duration: 4000 });
//   }
// }


// import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { interval, Subscription } from 'rxjs';
// import * as microsoftTeams from '@microsoft/teams-js';
// import { CommonModule } from '@angular/common';
// import { DxTabPanelModule } from 'devextreme-angular';
// import { LeaveComponent } from "../leave/leave.component";

// @Component({
//   selector: 'app-worklog',
//   standalone: true,
//   templateUrl: './worklog.component.html',
//   styleUrls: ['./worklog.component.css'],
//   imports: [CommonModule, DxTabPanelModule, LeaveComponent]
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
//   activeTab: string = 'wfh';

//   private timerSub!: Subscription;
//   private presenceSub!: Subscription;
//   private loginDate!: Date;
//   private lastPresenceFetch: number = Date.now();
//   private lastStatus: string = '';

//   // Track time in seconds per status
//   private presenceSummary: Record<string, number> = {
//     Available: 0,
//     Busy: 0,
//     InAMeeting: 0,
//     DoNotDisturb: 0
//   };

//   private productiveStatuses = ['Available', 'Busy', 'InAMeeting', 'DoNotDisturb'];

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

//   private initializeTeams() {
//     microsoftTeams.app.initialize()
//       .then(() => microsoftTeams.app.getContext())
//       .then((context: any) => {
//         this.userId = context.user?.userPrincipalName || context.userPrincipalName || context.user?.id;
//         console.log('[Worklog] Teams initialized. UserId:', this.userId);
//         this.startPresencePolling();
//       })
//       .catch(err => {
//         console.error('[Worklog] Teams init error:', err);
//         this.showMessage('⚠️ Teams init failed, using fallback user.');
//         this.userId = 'local.user@example.com';
//       });
//   }

//   private startPresencePolling() {
//     console.log('[Worklog] Starting presence polling every 2 minutes');

//     // Initial fetch immediately
//     this.fetchPresenceFromBackend();

//     // Poll every 2 minutes
//     this.presenceSub = interval(2 * 60 * 1000).subscribe(() => {
//       console.log('[Worklog] Polling presence...');
//       this.fetchPresenceFromBackend();
//     });
//   }

//   private fetchPresenceFromBackend() {
//     microsoftTeams.authentication.getAuthToken({
//       successCallback: async (teamsToken) => {
//         try {
//           const response: any = await this.http.post(`${this.apiBaseUrl}/api/worklog/presence`, { token: teamsToken }).toPromise();
//           // Use availability from Graph response
//           const status = response?.presence?.availability;
//           this.handlePresence(status);
//         } catch (err) {
//           console.error('[Worklog] Backend presence fetch error:', err);
//         }
//       },
//       failureCallback: (err) => {
//         console.error('[Worklog] Teams SSO token error:', err);
//       }
//     });
//   }

//   private handlePresence(status: string) {
//     if (!status) return;

//     const now = Date.now();
//     const elapsedSeconds = Math.floor((now - this.lastPresenceFetch) / 1000);
//     this.lastPresenceFetch = now;

//     if (status !== this.lastStatus) {
//       console.log(`[Worklog] Status changed: ${this.lastStatus} -> ${status} (+${elapsedSeconds}s)`);
//       this.lastStatus = status;
//     }

//     // Only count productive statuses
//     if (this.productiveStatuses.includes(status)) {
//       this.presenceSummary[status] = (this.presenceSummary[status] || 0) + elapsedSeconds;
//     }

//     console.log('[Worklog] Updated presenceSummary:', this.presenceSummary);
//   }

//   logAction(actionType: 'Login' | 'Logout') {
//     if (!this.userId) {
//       this.showMessage('⚠️ User not identified yet!');
//       return;
//     }

//     const istDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
//     const actionTime = istDate.toISOString();

//     const payload: any = {
//       employeeIdentifier: this.userId,
//       actionType: actionType,
//       actionTime: actionTime,
//       deskTime: actionType === 'Logout' ? this.calculateDeskTime() : ''
//     };

//     console.log('[Worklog] Sending payload:', payload);

//     if (actionType === 'Login') this.startSession(actionTime);
//     else if (actionType === 'Logout') this.endSession(actionTime);

//     this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
//       next: () => this.showMessage(`${actionType} logged at ${actionTime}`),
//       error: err => {
//         console.warn('[Worklog] API error, continuing locally:', err);
//         this.showMessage(`(Local) ${actionType} logged at ${actionTime}`);
//       }
//     });
//   }

//   private startSession(istTime: string, restoring: boolean = false) {
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

//     if (!restoring) this.showMessage(`Session started at ${istTime}`);
//   }

//   private endSession(actionTime: string) {
//     this.logoutClicked = true;
//     this.sessionActive = false;
//     if (this.timerSub) this.timerSub.unsubscribe();
//     if (this.presenceSub) this.presenceSub.unsubscribe();

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

//   private calculateDeskTime(): string {
//     let totalSeconds = 0;
//     for (const status of this.productiveStatuses) {
//       totalSeconds += this.presenceSummary[status] || 0;
//     }

//     if (totalSeconds === 0) return this.sessionDuration; // fallback

//     return this.formatDuration(totalSeconds * 1000);
//   }

//   private formatDuration(ms: number): string {
//     const hours = Math.floor(ms / 1000 / 60 / 60);
//     const minutes = Math.floor((ms / 1000 / 60) % 60);
//     const seconds = Math.floor((ms / 1000) % 60);
//     return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
//   }

//   private pad(num: number) {
//     return num.toString().padStart(2, '0');
//   }

//   private updateCurrentTime() {
//     this.currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
//   }

//   private showMessage(msg: string) {
//     this.snackBar.open(msg, 'Close', { duration: 4000 });
//   }
// }


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
  private presenceSub!: Subscription;
  private loginDate!: Date;
  private lastPresenceFetch: number = Date.now();
  private lastStatus: string = '';
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

  private initializeTeams() {
    microsoftTeams.app.initialize()
      .then(() => microsoftTeams.app.getContext())
      .then((context: any) => {
        this.userId = context.user?.userPrincipalName || context.userPrincipalName || context.user?.id;
        console.log('[Worklog] Teams initialized. UserId:', this.userId);

        // Start presence polling via Teams SSO
        this.startPresencePolling();
      })
      .catch(err => {
        console.error('[Worklog] Teams init error:', err);
        this.showMessage('⚠️ Teams init failed, using fallback user.');
        this.userId = 'local.user@example.com';
      });
  }

  private startPresencePolling() {
    console.log('[Worklog] Starting presence polling every 2 minutes');

    // Initial fetch immediately
    this.fetchPresenceFromBackend();

    // Poll every 2 minutes
    this.presenceSub = interval(2 * 60 * 1000).subscribe(() => {
      console.log('[Worklog] Polling presence...');
      this.fetchPresenceFromBackend();
    });
  }

  private fetchPresenceFromBackend() {
    microsoftTeams.authentication.getAuthToken({
      successCallback: async (teamsToken) => {
        try {
          const presence: any = await this.http.post(`${this.apiBaseUrl}/api/worklog/presence`, { token: teamsToken }).toPromise();
          this.handlePresence(presence.availability);
                    console.error('[Worklog] Backend presence called ');

        } catch (err) {
          console.error('[Worklog] Backend presence fetch error:', err);
        }
      },
      failureCallback: (err) => {
        console.error('[Worklog] Teams SSO token error:', err);
      }
    });
  }

  private handlePresence(status: string) {
    if (!status) return;

    const now = Date.now();
    const elapsedSeconds = Math.floor((now - this.lastPresenceFetch) / 1000);
    this.lastPresenceFetch = now;

    if (status !== this.lastStatus) {
      console.log(`[Worklog] Status changed: ${this.lastStatus} -> ${status} (+${elapsedSeconds}s)`);
      this.lastStatus = status;
    }

    this.presenceSummary[status] = (this.presenceSummary[status] || 0) + elapsedSeconds;
    console.log('[Worklog] Updated presenceSummary:', this.presenceSummary);
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
      actionTime: actionTime,
      deskTime: actionType === 'Logout' ? this.calculateDeskTime() : ''
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

  private endSession(actionTime: string) {
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

  private calculateDeskTime(): string {
    const totalSeconds =
      (this.presenceSummary['Available'] || 0) +
      (this.presenceSummary['Busy'] || 0) +
      (this.presenceSummary['InAMeeting'] || 0) +
      (this.presenceSummary['DoNotDisturb'] || 0);

    if (totalSeconds === 0) return this.sessionDuration; // fallback

    return this.formatDuration(totalSeconds * 1000);
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
