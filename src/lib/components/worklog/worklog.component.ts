// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import * as microsoftTeams from '@microsoft/teams-js';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-worklog',
//   templateUrl: './worklog.component.html',
//   styleUrls: ['./worklog.component.css']
// })
// export class WorklogComponent implements OnInit {

//   userId: string = '';
//   apiBaseUrl: string = '';

//   constructor(
//     private http: HttpClient,
//     private snackBar: MatSnackBar
//   ) { }

 
//   ngOnInit(): void {
//   // 1️⃣ Fetch base URL from sessionStorage
  
// this.apiBaseUrl = 'https://blazebackend.qualis40.io'; // replace with your backend



//   console.log('[Worklog] API Base URL:', this.apiBaseUrl);

//   // 2️⃣ Initialize Teams SDK
//   this.initializeTeams();
// }


//   initializeTeams() {
//   console.log('[Worklog] Initializing Teams SDK...');
//   microsoftTeams.app.initialize()
//     .then(() => microsoftTeams.app.getContext())
//     .then((context: any) => {
//       microsoftTeams.app.notifySuccess();

//       // Dump the full context object
//       console.log('[Worklog] Full Teams context:', context);

//       // Log user-related info
//       console.log('[Worklog] context.user:', context.user);
//       console.log('[Worklog] context.userPrincipalName:', context.userPrincipalName);
//       console.log('[Worklog] context.userObjectId:', context.userObjectId);

//       if (context.user) {
//         console.log('[Worklog] context.user.id:', context.user.id);
//         console.log('[Worklog] context.user.displayName:', context.user.displayName);
//         console.log('[Worklog] context.user.licenseType:', context.user.licenseType);
//       }

//       // Log app-related info
//       console.log('[Worklog] context.app:', context.app);
//       console.log('[Worklog] context.page:', context.page);

//       // Pick UserId with fallbacks
//       this.userId = context.user?.userPrincipalName
//                  || context.userPrincipalName
//                  || context.user?.id
//                  || context.userObjectId ;

//       console.log('[Worklog] Final Extracted UserId:', this.userId);

//       if (!this.userId) {
//         this.showMessage('⚠️ Could not extract UserId from Teams context');
//       }
//     })
//     .catch(err => {
//       console.error('[Worklog] Teams init error:', err);
//       this.showMessage('⚠️ Teams initialization failed');
//     });

// }

// logAction(actionType: 'Login' | 'Logout') {
//   console.log(`[Worklog] logAction called: ${actionType}`);

//   if (!this.userId) {
//     this.showMessage('⚠️ User not identified!');
//     return;
//   }

//   if (!this.apiBaseUrl) {
//     this.showMessage('⚠️ API base URL not configured!');
//     return;
//   }

//   // ✅ Generate IST timestamp
//   const istTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

//   const payload = {
//     employeeIdentifier: this.userId,
//     actionType: actionType,
//     actionTime: istTime   // ✅ Send IST timestamp to backend
//   };

//   console.log('[Worklog] Sending request to:', `${this.apiBaseUrl}/api/worklog/log-action`, payload);

//   this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
//     next: (res) => {
//       console.log('[Worklog] API response:', res);
//       this.showMessage(`${actionType} logged at ${istTime}`);
//     },
//     error: (err) => {
//       console.error('[Worklog] API error:', err);
//       this.showMessage('❌ Error logging action. Check console for details.');
//     }
//   });
// }



//   private showMessage(msg: string) {
//     this.snackBar.open(msg, 'Close', { duration: 4000 });
//   }
// }


// import { CommonModule } from '@angular/common';
// import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { interval, Subscription } from 'rxjs';
// import { DxTabPanelModule } from 'devextreme-angular';

// @Component({
//   selector: 'app-worklog',
//   standalone: true,
//   templateUrl: './worklog.component.html',
//   styleUrls: ['./worklog.component.css'],
//   imports: [CommonModule, DxTabPanelModule]
// })
// export class WorklogComponent implements OnInit, OnDestroy {

//   userId: string = 'adarsha.yh@datalyzerint.com';  // ✅ Hardcoded for local test
//   apiBaseUrl: string = 'https://localhost:7116';   // ✅ Point to local backend
//   currentTime: string = '';

//   sessionActive: boolean = false;
//   loginTime: string = '';
//   logoutTime: string = '';
//   sessionDuration: string = '';
//   logoutClicked: boolean = false;

//   private timerSub!: Subscription;
//   private loginDate!: Date;
//   activeTab: any = 'wfh';

//   constructor(
//     private http: HttpClient,
//     private snackBar: MatSnackBar,
//     private ngZone: NgZone
//   ) {}

//   ngOnInit(): void {
//     this.updateCurrentTime();
//     setInterval(() => this.updateCurrentTime(), 1000);

//     // 🔄 Restore session state from localStorage
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
//   }

//   updateCurrentTime() {
//     this.currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
//   }

//   logAction(actionType: 'Login' | 'Logout') {
//     const istDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
//     const actionTime = istDate.toISOString();

//     const payload = {
//       employeeIdentifier: this.userId,
//       actionType: actionType,
//       actionTime: actionTime
//     };

//     console.log('[Worklog] Sending payload:', payload);

//     // ✅ Update UI immediately
//     this.handleSession(actionType, actionTime);

//     // ✅ Send backend request
//     this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
//       next: () => {
//         this.showMessage(`${actionType} logged at ${actionTime}`);
//       },
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

//       // 💾 Persist state
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

//     // 💾 Save logout state
//     localStorage.setItem('worklog-session', JSON.stringify({
//       sessionActive: false,
//       loginTime: this.loginTime,
//       logoutTime: this.logoutTime,
//       sessionDuration: this.sessionDuration,
//       logoutClicked: true
//     }));

//     // After 30s → clear session
//     setTimeout(() => {
//       this.loginTime = '';
//       this.logoutTime = '';
//       this.sessionDuration = '';
//       this.logoutClicked = false;
//       localStorage.removeItem('worklog-session');
//     }, 10000);
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

@Component({
  selector: 'app-worklog',
  standalone: true,
  templateUrl: './worklog.component.html',
  styleUrls: ['./worklog.component.css'],
  imports: [CommonModule, DxTabPanelModule]
})
export class WorklogComponent implements OnInit, OnDestroy {

  userId: string = '';  // ✅ Will be populated from Teams context
  apiBaseUrl: string = 'https://blazebackend.qualis40.io';   // ✅ Point to backend
  currentTime: string = '';

  sessionActive: boolean = false;
  loginTime: string = '';
  logoutTime: string = '';
  sessionDuration: string = '';
  logoutClicked: boolean = false;

  private timerSub!: Subscription;
  private loginDate!: Date;
  activeTab: any = 'wfh';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.updateCurrentTime();
    setInterval(() => this.updateCurrentTime(), 1000);

    // 1️⃣ Initialize Teams SDK and get userId
    this.initializeTeams();

    // 2️⃣ Restore session state from localStorage
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

  // =================== Teams SDK Integration ===================
  initializeTeams() {
    console.log('[Worklog] Initializing Teams SDK...');
    microsoftTeams.app.initialize()
      .then(() => microsoftTeams.app.getContext())
      .then((context: any) => {
        microsoftTeams.app.notifySuccess();

        // Extract UserId safely
        this.userId = context.user?.userPrincipalName
                   || context.userPrincipalName
                   || context.user?.id
                   || context.userObjectId;
                   

        console.log('[Worklog] Extracted UserId from Teams:', this.userId);
      })
      .catch(err => {
        console.error('[Worklog] Teams init error:', err);
        this.showMessage('⚠️ Teams initialization failed. Using fallback user.');
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

    const payload = {
      employeeIdentifier: this.userId,
      actionType: actionType,
      actionTime: actionTime
    };

    console.log('[Worklog] Sending payload:', payload);

    // ✅ Update UI immediately
    this.handleSession(actionType, actionTime);

    // ✅ Send backend request
    this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
      next: () => {
        this.showMessage(`${actionType} logged at ${actionTime}`);
      },
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

      // Persist state
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

    this.logoutTime = actionTime;
    const diff = new Date().getTime() - this.loginDate.getTime();
    this.sessionDuration = this.formatDuration(diff);

    // Save logout state
    localStorage.setItem('worklog-session', JSON.stringify({
      sessionActive: false,
      loginTime: this.loginTime,
      logoutTime: this.logoutTime,
      sessionDuration: this.sessionDuration,
      logoutClicked: true
    }));

    // After 30s → clear session
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

  private showMessage(msg: string) {
    this.snackBar.open(msg, 'Close', { duration: 4000 });
  }

}
