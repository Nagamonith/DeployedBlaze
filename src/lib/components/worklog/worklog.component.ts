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

  ngOnInit(): void {
    console.log('[Worklog] ngOnInit triggered');
    this.apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url || '';
    console.log('[Worklog] API Base URL:', this.apiBaseUrl);
    this.initializeTeams();
  }

  initializeTeams() {
    console.log('[Worklog] Initializing Teams SDK...');
    microsoftTeams.app.initialize()
      .then(() => microsoftTeams.app.getContext())
      .then((context: any) => {
        console.log('[Worklog] Teams context:', context);
        this.userId = context.userPrincipalName || context.userObjectId || '';
        console.log('[Worklog] Extracted UserId:', this.userId);

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
