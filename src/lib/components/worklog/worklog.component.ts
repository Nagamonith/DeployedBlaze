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
    this.apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url || '';
    this.initializeTeams();
  }

  initializeTeams() {
    microsoftTeams.app.initialize().then(() => {
      microsoftTeams.app.getContext().then((context: any) => {
        this.userId = context.userPrincipalName || context.userObjectId;
      });
    });
  }

  logAction(actionType: 'Login' | 'Logout') {
    if (!this.userId) {
      alert('User not identified!');
      return;
    }

    if (!this.apiBaseUrl) {
      alert('API base URL not configured!');
      return;
    }

    const payload = {
      employeeIdentifier: this.userId,
      actionType: actionType
    };

    this.http.post(`${this.apiBaseUrl}/api/worklog/log-action`, payload).subscribe({
      next: (res) => alert(`${actionType} logged successfully at ${new Date().toLocaleTimeString()}`),
      error: (err) => {
        console.error(err);
        alert('Error logging action');
      }
    });
  }

}
