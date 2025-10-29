
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as microsoftTeams from '@microsoft/teams-js';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule]
})
export class LeaveComponent implements OnInit {
  userId: string = '';
  leaveForm: FormGroup;
  leaves: any[] = [];
  currentTime: string = '';
  private ssoToken: string = '';

  private apiUrl = 'https://blazebackend.qualis40.io/api/Teams';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.leaveForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  // ngOnInit() {
  //   this.updateCurrentTime();
  //   setInterval(() => this.updateCurrentTime(), 1000);

  //   microsoftTeams.app.initialize().then(() => {
  //     console.log('Teams app initialized');
  //     this.getUserContext();
  //   }).catch(err => {
  //     console.error('Error initializing Teams:', err);
  //     this.userId = 'test.employee@local';
  //     this.loadLeaves();
  //   });
  // }
ngOnInit() {
  console.log('LeaveComponent initialized'); // 🔹 log immediately
  this.updateCurrentTime();
  setInterval(() => this.updateCurrentTime(), 1000);

  microsoftTeams.app.initialize().then(() => {
    console.log('Teams app initialized'); 
    this.getUserContext();
  }).catch(err => {
    console.error('Error initializing Teams:', err);
    this.userId = 'test.employee@local';
    this.loadLeaves();
  });
}

getUserContext() {
  console.log('Fetching Teams context...');
  microsoftTeams.app.getContext().then((context: any) => {
    console.log('Teams context received:', context);
    this.userId = context.user?.userPrincipalName
               || context.userPrincipalName
               || context.user?.id
               || context.userObjectId;

    if (!this.userId) {
      console.warn('No Teams context, using fallback userId.');
      this.userId = 'test.employee@local';
    }

    console.log('Detected userId:', this.userId);

    try {
      microsoftTeams.authentication.getAuthToken({ resources: [this.apiUrl] }).then(token => {
        console.log('SSO token obtained:', token);
        this.ssoToken = token;
        alert();
      }).catch(err => {
        console.warn('Could not get SSO token', err);
      });
    } catch (ex) {
      console.error('Error while getting SSO token', ex);
    }

    this.loadLeaves();
  }).catch(err => {
    console.error('Error getting Teams context:', err);
    this.userId = 'test.employee@local';
    this.loadLeaves();
  });
}

 

  loadLeaves() {
    if (!this.userId) return;

    console.log('Loading leaves for:', this.userId);
    this.http.get<any[]>(`${this.apiUrl}/${this.userId}`).subscribe({
      next: (res) => {
        console.log('Leaves loaded:', res);
        this.leaves = res;
      },
      error: (err) => {
        console.error('Error fetching leaves:', err);
        this.snackBar.open('Error fetching leaves', 'Close', { duration: 3000 });
      }
    });
  }

  submitLeave() {
    if (this.leaveForm.invalid || !this.userId) {
      console.warn('Cannot submit leave, form invalid or userId missing', this.leaveForm.value, this.userId);
      return;
    }

    const leaveData = { employeeId: this.userId, ...this.leaveForm.value };
    console.log('Submitting leave:', leaveData);

    const headers = this.ssoToken
      ? new HttpHeaders().set('Authorization', `Bearer ${this.ssoToken}`)
      : new HttpHeaders();

    this.http.post(`${this.apiUrl}/apply`, leaveData, { headers }).subscribe({
      next: (res) => {
        console.log('Leave applied successfully, response:', res);
        this.snackBar.open('Leave applied successfully', 'Close', { duration: 3000 });
        this.leaveForm.reset();
        this.loadLeaves();
      },
      error: (err) => {
        console.error('Error applying leave:', err);
        this.snackBar.open('Error applying leave', 'Close', { duration: 3000 });
      }
    });
  }

  updateCurrentTime() {
    this.currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }
}

// import { Component, OnInit } from '@angular/core';
// import * as microsoftTeams from '@microsoft/teams-js';

// @Component({
//   selector: 'app-leave',
//   template: `
//     <div>
//       <h3>Leave Component</h3>
//       <p>UserId: {{ userId }}</p>
//       <p>SSO Token: {{ ssoToken }}</p>
//       <button (click)="getSSOToken()">Get SSO Token</button>
//     </div>
//   `
// })
// export class LeaveComponent implements OnInit {
//   userId: string = '';
//   ssoToken: string = '';

//   ngOnInit() {
//     console.log('LeaveComponent initialized');

//     microsoftTeams.app.initialize().then(() => {
//       console.log('Teams app initialized');
//       microsoftTeams.app.getContext().then((context: any) => {
//         console.log('Teams context received:', context);
//         this.userId = context.user?.userPrincipalName
//                    || context.userPrincipalName
//                    || context.user?.id
//                    || context.userObjectId
//                    || 'Unknown';
//         console.log('Detected userId:', this.userId);
//       }).catch(err => console.error('Error getting Teams context:', err));
//     }).catch(err => console.error('Error initializing Teams:', err));
//   }

//   getSSOToken() {
//     microsoftTeams.authentication.getAuthToken({
//       successCallback: (token) => {
//         console.log('SSO token obtained:', token);
//         this.ssoToken = token;
//       },
//       failureCallback: (err) => {
//         console.error('Auth failed', err);
//       }
//     });
//   }
// }
