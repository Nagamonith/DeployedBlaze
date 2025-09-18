// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import * as microsoftTeams from '@microsoft/teams-js';

// @Component({
//   selector: 'app-worklog',
//   templateUrl: './worklog.component.html',
//   styleUrls: ['./worklog.component.css']
// })
// export class WorklogComponent implements OnInit {

//   userId: string = '';
//   apiBaseUrl: string = '';

//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//     this.apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url || '';
//     this.initializeTeams();
//   }

//   initializeTeams() {
//     microsoftTeams.app.initialize().then(() => {
//       microsoftTeams.app.getContext().then((context: any) => {
//         this.userId = context.userPrincipalName || context.userObjectId;
//       });
//     });
//   }

//   logAction(actionType: 'Login' | 'Logout') {
//     if (!this.userId) {
//       alert('User not identified!');
//       return;
//     }

//     if (!this.apiBaseUrl) {
//       alert('API base URL not configured!');
//       return;
//     }

//     const payload = {
//       employeeIdentifier: this.userId,
//       actionType: actionType
//     };

//     this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
//       next: (res) => alert(`${actionType} logged successfully at ${new Date().toLocaleTimeString()}`),
//       error: (err) => {
//         console.error(err);
//         alert('Error logging action');
//       }
//     });
//   }

// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as microsoftTeams from '@microsoft/teams-js';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-worklog',
  templateUrl: './worklog.component.html',
  styleUrls: ['./worklog.component.css']
})
export class WorklogComponent implements OnInit {

  userId: string = '';
  apiBaseUrl: string = '';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  // ngOnInit(): void {
  //   console.log('[Worklog] ngOnInit triggered');
  //   this.apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url || '';
  //   console.log('[Worklog] API Base URL:', this.apiBaseUrl);
  //   this.initializeTeams();
  //    this.http.post(`${this.apiBaseUrl}/api/gantt/sync-from-mysql`, {}).subscribe({
  //           next: () => console.log('Gantt sync completed.'),
  //           error: (err) => console.error('Gantt sync failed:', err)
  //         });
  // }
  ngOnInit(): void {
  // 1️⃣ Fetch base URL from sessionStorage
  
this.apiBaseUrl = 'https://blazebackend.qualis40.io'; // replace with your backend



  console.log('[Worklog] API Base URL:', this.apiBaseUrl);

  // 2️⃣ Initialize Teams SDK
  this.initializeTeams();
}


  // initializeTeams() {
  //   console.log('[Worklog] Initializing Teams SDK...');
  //  microsoftTeams.app.initialize()
  // .then(() => microsoftTeams.app.getContext())
  // .then((context: any) => {
  //   console.log('[Worklog] Teams context:', context);
  //   this.userId = context.userPrincipalName || context.userObjectId || context.user.id;
    
  //   console.log('[Worklog] Extracted UserId:', this.userId);
  // })
  // .catch(err => {
  //   console.error('[Worklog] Teams init error:', err);
  //   this.userId = 'test.user@company.com'; // fallback
  // });

  // }
  initializeTeams() {
  console.log('[Worklog] Initializing Teams SDK...');
  microsoftTeams.app.initialize()
    .then(() => microsoftTeams.app.getContext())
    .then((context: any) => {
      microsoftTeams.app.notifySuccess();

      // Dump the full context object
      console.log('[Worklog] Full Teams context:', context);

      // Log user-related info
      console.log('[Worklog] context.user:', context.user);
      console.log('[Worklog] context.userPrincipalName:', context.userPrincipalName);
      console.log('[Worklog] context.userObjectId:', context.userObjectId);

      if (context.user) {
        console.log('[Worklog] context.user.id:', context.user.id);
        console.log('[Worklog] context.user.displayName:', context.user.displayName);
        console.log('[Worklog] context.user.licenseType:', context.user.licenseType);
      }

      // Log app-related info
      console.log('[Worklog] context.app:', context.app);
      console.log('[Worklog] context.page:', context.page);

      // Pick UserId with fallbacks
      this.userId = context.user?.userPrincipalName
                 || context.userPrincipalName
                 || context.user?.id
                 || context.userObjectId ;

      console.log('[Worklog] Final Extracted UserId:', this.userId);

      if (!this.userId) {
        this.showMessage('⚠️ Could not extract UserId from Teams context');
      }
    })
    .catch(err => {
      console.error('[Worklog] Teams init error:', err);
      this.showMessage('⚠️ Teams initialization failed');
    });

}


  logAction(actionType: 'Login' | 'Logout') {
    console.log(`[Worklog] logAction called: ${actionType}`);

    if (!this.userId) {
      this.showMessage('⚠️ User not identified!');
      return;
    }

    if (!this.apiBaseUrl) {
      this.showMessage('⚠️ API base URL not configured!');
      return;
    }

    const payload = {
      employeeIdentifier: this.userId,
      actionType: actionType
    };

    console.log('[Worklog] Sending request to:', `${this.apiBaseUrl}/api/worklog/log-action`, payload);

    this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
      next: (res) => {
        console.log('[Worklog] API response:', res);
        this.showMessage(`${actionType} logged at ${new Date().toLocaleTimeString()}`);
      },
      error: (err) => {
        console.error('[Worklog] API error:', err);
        this.showMessage('❌ Error logging action. Check console for details.');
      }
    });
  }

  private showMessage(msg: string) {
    this.snackBar.open(msg, 'Close', { duration: 4000 });
  }
}
