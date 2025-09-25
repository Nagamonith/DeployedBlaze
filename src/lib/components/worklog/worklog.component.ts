


// import { MsalService } from '@azure/msal-angular';
// import { AuthenticationResult } from '@azure/msal-browser';
// import { CommonModule } from '@angular/common';
// import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { interval, Subscription } from 'rxjs';
// import { DxTabPanelModule } from 'devextreme-angular';
// import * as microsoftTeams from '@microsoft/teams-js';
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
//     // apiBaseUrl: string = 'https://localhost:7116';

//   currentTime: string = '';

//   sessionActive: boolean = false;
//   loginTime: string = '';
//   logoutTime: string = '';
//   sessionDuration: string = '';
//   logoutClicked: boolean = false;

//   private timerSub!: Subscription;
//   private loginDate!: Date;
//   private presenceSub!: Subscription;
//   private lastPresenceFetch: number = Date.now();
//   activeTab: any = 'wfh';

//   // Real presence summary in seconds
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
//     private ngZone: NgZone,
//     private msalService: MsalService
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

//         // ✅ Start real presence polling
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

//     // ✅ At logout, include DeskTime
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

//   // =================== Presence Handling ===================
//   private startPresencePolling() {
//     // Poll every minute
//     this.fetchPresenceFromTeams(); // first fetch
//     this.presenceSub = interval(60 * 1000).subscribe(() => this.fetchPresenceFromTeams());
//   }

 
// //   private fetchPresenceFromTeams() {
// //   this.msalService.loginPopup({
// //     scopes: ["User.Read", "Presence.Read", "Presence.Read.All"]
// //   }).then((res: AuthenticationResult) => {
// //     this.fetchPresenceFromGraph(res.accessToken);
// //   }).catch(err => {
// //     console.error('[Worklog] MSAL login error:', err);
// //   });
// // }
// private fetchPresenceFromTeams() {
//   this.msalService.loginPopup({
//     scopes: ["User.Read", "Presence.Read", "Presence.Read.All"]
//   }).subscribe({
//     next: (res: AuthenticationResult) => {
//       this.fetchPresenceFromGraph(res.accessToken);
//     },
//     error: (err) => {
//       console.error('[Worklog] MSAL login error:', err);
//     }
//   });
// }

//   private fetchPresenceFromGraph(token: string) {
//     this.http.get(`https://graph.microsoft.com/v1.0/me/presence`, {
//       headers: { Authorization: `Bearer ${token}` }
//     }).subscribe({
//       next: (presence: any) => {
//         const status = presence.availability as keyof typeof this.presenceSummary;
//         if (this.presenceSummary[status] !== undefined) {
//           const now = Date.now();
//           const elapsedSeconds = Math.floor((now - this.lastPresenceFetch) / 1000);
//           this.lastPresenceFetch = now;

//           this.presenceSummary[status] += elapsedSeconds;
//         }
//         console.log('[Worklog] Real Presence update:', presence.availability, this.presenceSummary);
//       },
//       error: (err) => console.error('[Worklog] Graph API error:', err)
//     });
//   }

//   private calculateDeskTime(): string {
//     const totalSeconds =
//       (this.presenceSummary['Available'] || 0) +
//       (this.presenceSummary['Busy'] || 0) +
//       (this.presenceSummary['InAMeeting'] || 0) +
//       (this.presenceSummary['DoNotDisturb'] || 0);

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


import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscription } from 'rxjs';
import * as microsoftTeams from '@microsoft/teams-js';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
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

  private timerSub!: Subscription;
  private presenceSub!: Subscription;
  private loginDate!: Date;
  private lastPresenceFetch: number = Date.now();
  private msalToken: string | null = null;
  private lastStatus: string = '';

  activeTab: any = 'wfh';

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
    private ngZone: NgZone,
    private msalService: MsalService
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

  // =================== Teams + MSAL Integration ===================
  initializeTeams() {
    microsoftTeams.app.initialize()
      .then(() => microsoftTeams.app.getContext())
      .then((context: any) => {
        this.userId = context.user?.userPrincipalName || context.userPrincipalName || context.user?.id;
        console.log('[Worklog] Teams initialized. UserId:', this.userId);

        // Try silent token first
        this.acquireMsalToken();
      })
      .catch(err => {
        console.error('[Worklog] Teams init error:', err);
        this.showMessage('⚠️ Teams init failed, using fallback user.');
        this.userId = 'local.user@example.com';
      });
  }

  private acquireMsalToken() {
    this.msalService.acquireTokenSilent({
      scopes: ["User.Read", "Presence.Read", "Presence.Read.All"]
    }).subscribe({
      next: (res: AuthenticationResult) => {
        console.log('[Worklog] Silent token acquired');
        this.msalToken = res.accessToken;
        this.startPresencePolling();
      },
      error: (err) => {
        console.warn('[Worklog] Silent token failed, trying loginPopup', err);
        this.msalService.loginPopup({
          scopes: ["User.Read", "Presence.Read", "Presence.Read.All"]
        }).subscribe({
          next: (res: AuthenticationResult) => {
            console.log('[Worklog] MSAL loginPopup success, token acquired');
            this.msalToken = res.accessToken;
            this.startPresencePolling();
          },
          error: (err) => {
            console.error('[Worklog] MSAL login failed', err);
            this.showMessage('⚠️ MSAL login failed. Presence tracking unavailable.');
          }
        });
      }
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

    console.log(`[Worklog] Session ended at ${actionTime} Duration: ${this.sessionDuration}`);
    console.log(`[Worklog] Final DeskTime: ${this.calculateDeskTime()}`);

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
    console.log('[Worklog] Starting presence polling every 2 minutes');
    if (!this.msalToken) return;

    // first fetch immediately
    this.fetchPresenceFromGraph();

    this.presenceSub = interval(2 * 60 * 1000).subscribe(() => {
      console.log('[Worklog] Polling presence...');
      this.fetchPresenceFromGraph();
    });
  }

  // private fetchPresenceFromGraph() {
  //   if (!this.msalToken) {
  //     console.warn('[Worklog] MSAL token not available, cannot fetch presence');
  //     return;
  //   }

  //   this.http.get(`https://graph.microsoft.com/v1.0/me/presence`, {
  //     headers: { Authorization: `Bearer ${this.msalToken}` }
  //   }).subscribe({
  //     next: (presence: any) => {
  //       const status = presence?.availability;
  //       console.log('[Worklog] Graph presence status:', status);

  //       if (status && ['Available','Busy','InAMeeting','DoNotDisturb'].includes(status)) {
  //         const now = Date.now();
  //         const elapsedSeconds = Math.floor((now - this.lastPresenceFetch) / 1000);
  //         this.lastPresenceFetch = now;

  //         if (status !== this.lastStatus) {
  //           console.log(`[Worklog] Status changed: ${this.lastStatus} -> ${status} (+${elapsedSeconds}s)`);
  //           this.lastStatus = status;
  //         }

  //         this.presenceSummary[status] = (this.presenceSummary[status] || 0) + elapsedSeconds;
  //         console.log('[Worklog] Updated presenceSummary:', this.presenceSummary);
  //       }
  //     },
  //     error: err => console.error('[Worklog] Graph API error:', err)
  //   });
  // }
  private fetchPresenceFromGraph() {
  if (!this.msalToken) {
    console.warn('[Worklog] MSAL token not available, cannot fetch presence');
    return;
  }

  this.http.get(`https://graph.microsoft.com/v1.0/me/presence`, {
    headers: { Authorization: `Bearer ${this.msalToken}` }
  }).subscribe({
    next: (presence: any) => {
      console.log('[Worklog] Graph raw presence:', presence);

      const status = presence?.availability;
      if (!status) {
        console.warn('[Worklog] Presence is null/empty');
        return;
      }

      const now = Date.now();
      const elapsedSeconds = Math.floor((now - this.lastPresenceFetch) / 1000);
      this.lastPresenceFetch = now;

      if (status !== this.lastStatus) {
        console.log(`[Worklog] Status changed: ${this.lastStatus} -> ${status} (+${elapsedSeconds}s)`);
        this.lastStatus = status;
      }

      // track all statuses, not just "productive" ones
      this.presenceSummary[status] = (this.presenceSummary[status] || 0) + elapsedSeconds;
      console.log('[Worklog] Updated presenceSummary:', this.presenceSummary);
    },
    error: err => console.error('[Worklog] Graph API error:', err)
  });
}


  private calculateDeskTime(): string {
    const totalSeconds =
      (this.presenceSummary['Available'] || 0) +
      (this.presenceSummary['Busy'] || 0) +
      (this.presenceSummary['InAMeeting'] || 0) +
      (this.presenceSummary['DoNotDisturb'] || 0);

    if (totalSeconds === 0) {
      console.log('[Worklog] Presence data empty, using fallback session duration:', (new Date().getTime() - this.loginDate.getTime()) / 1000, 'seconds');
      return this.sessionDuration; // fallback
    }

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
