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


//   // logAction(actionType: 'Login' | 'Logout') {
//   //   console.log(`[Worklog] logAction called: ${actionType}`);

//   //   if (!this.userId) {
//   //     this.showMessage('⚠️ User not identified!');
//   //     return;
//   //   }

//   //   if (!this.apiBaseUrl) {
//   //     this.showMessage('⚠️ API base URL not configured!');
//   //     return;
//   //   }

//   //   const payload = {
//   //     employeeIdentifier: this.userId,
//   //     actionType: actionType
//   //   };

//   //   console.log('[Worklog] Sending request to:', `${this.apiBaseUrl}/api/worklog/log-action`, payload);

//   //   this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
//   //     next: (res) => {
//   //       console.log('[Worklog] API response:', res);
//   //       this.showMessage(`${actionType} logged at ${new Date().toLocaleTimeString()}`);
//   //     },
//   //     error: (err) => {
//   //       console.error('[Worklog] API error:', err);
//   //       this.showMessage('❌ Error logging action. Check console for details.');
//   //     }
//   //   });
//   // }
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

import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as microsoftTeams from '@microsoft/teams-js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-worklog',
  standalone:true,
  templateUrl: './worklog.component.html',
  styleUrls: ['./worklog.component.css'],
  imports:[CommonModule]
})
export class WorklogComponent implements OnInit, OnDestroy {

  userId: string = '';
  apiBaseUrl: string = '';
  currentTime: string = '';
  
  sessionActive: boolean = false;
  loginTime: string = '';
  sessionDuration: string = '';
  logoutClicked: boolean = false;

  private timerSub!: Subscription;
  private loginDate!: Date;

  constructor(private http: HttpClient, private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.apiBaseUrl = 'https://blazebackend.qualis40.io';
    this.updateCurrentTime();
    setInterval(() => this.updateCurrentTime(), 1000); // live clock

    this.initializeTeams();
  }

  ngOnDestroy(): void {
    if (this.timerSub) this.timerSub.unsubscribe();
  }

  updateCurrentTime() {
    this.currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }

  initializeTeams() {
    microsoftTeams.app.initialize()
      .then(() => microsoftTeams.app.getContext())
      .then((context: any) => {
        this.userId = context.user?.userPrincipalName || context.userPrincipalName || context.user?.id || context.userObjectId;
        if (!this.userId) this.showMessage('⚠️ Could not extract UserId from Teams context');
      })
      .catch(err => this.showMessage('⚠️ Teams initialization failed'));
  }

  logAction(actionType: 'Login' | 'Logout') {
    if (!this.userId) {
      this.showMessage('⚠️ User not identified!');
      return;
    }

    const istTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const payload = {
      employeeIdentifier: this.userId,
      actionType: actionType,
      actionTime: istTime
    };

    // Send API request
    this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
      next: () => {
        if (actionType === 'Login') {
          this.startSession(istTime);
        } else if (actionType === 'Logout') {
          this.endSession();
        }
      },
      error: err => {
        console.error('[Worklog] API error:', err);
        this.showMessage('❌ Error logging action. Check console for details.');
      }
    });
  }

  startSession(istTime: string) {
    this.sessionActive = true;
    this.logoutClicked = false;
    this.loginTime = istTime;
    this.loginDate = new Date(); // store exact login time

    // Start session timer
    this.timerSub = interval(1000).subscribe(() => {
      const diff = new Date().getTime() - this.loginDate.getTime();
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      this.sessionDuration = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    });
  }

  endSession() {
    this.logoutClicked = true;
    if (this.timerSub) this.timerSub.unsubscribe();
    this.sessionActive = false;

    // Show total session duration in same div
    const diff = new Date().getTime() - this.loginDate.getTime();
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    this.sessionDuration = `Total Time: ${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number) {
    return num.toString().padStart(2, '0');
  }

  private showMessage(msg: string) {
    this.snackBar.open(msg, 'Close', { duration: 4000 });
  }
}
