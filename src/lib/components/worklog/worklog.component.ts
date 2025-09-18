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

@Component({
  selector: 'app-worklog',
  templateUrl: './worklog.component.html',
  styleUrls: ['./worklog.component.css']
})
export class WorklogComponent implements OnInit {

  userId: string = '';
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('[Worklog] ngOnInit triggered');
    this.apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url || '';
    console.log('[Worklog] API Base URL from sessionStorage:', this.apiBaseUrl);
    this.initializeTeams();
  }

  initializeTeams() {
    console.log('[Worklog] Initializing Microsoft Teams SDK...');
    microsoftTeams.app.initialize()
      .then(() => {
        console.log('[Worklog] Teams SDK initialized successfully');
        return microsoftTeams.app.getContext();
      })
      .then((context: any) => {
        console.log('[Worklog] Teams context received:', context);
        this.userId = context.userPrincipalName || context.userObjectId || '';
        console.log('[Worklog] Extracted UserId:', this.userId);
        if (!this.userId) {
          alert('⚠️ UserId could not be extracted from Teams context!');
        }
      })
      .catch(err => {
        console.error('[Worklog] Error initializing Teams:', err);
        alert('⚠️ Teams initialization failed. See console for details.');
      });
  }

  logAction(actionType: 'Login' | 'Logout') {
    console.log(`[Worklog] logAction called with: ${actionType}`);

    if (!this.userId) {
      alert('⚠️ User not identified (userId is empty)!');
      console.error('[Worklog] UserId missing when logging action');
      return;
    }

    if (!this.apiBaseUrl) {
      alert('⚠️ API base URL not configured!');
      console.error('[Worklog] API base URL is missing');
      return;
    }

    const payload = {
      employeeIdentifier: this.userId,
      actionType: actionType
    };

    console.log('[Worklog] Sending POST request to:', `${this.apiBaseUrl}/api/worklog/log-action`);
    console.log('[Worklog] Payload:', payload);

    this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
      next: (res) => {
        console.log('[Worklog] API response:', res);
        alert(`${actionType} logged successfully at ${new Date().toLocaleTimeString()}`);
      },
      error: (err) => {
        console.error('[Worklog] API error:', err);
        alert('❌ Error logging action. Check console for details.');
      }
    });
  }

}
