import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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

  private apiUrl = 'https://localhost:7116/api/Leave';

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

  ngOnInit() {
    this.updateCurrentTime();
    setInterval(() => this.updateCurrentTime(), 1000);
    microsoftTeams.app.initialize().then(() => {
      microsoftTeams.app.getContext().then((context: any) => {
        this.userId = context.userPrincipalName || context.userObjectId || '';

        // fallback for local testing
        if (!this.userId) {
          console.warn('No Teams context, using fallback userId.');
          this.userId = 'test.employee@local';
        }

        this.loadLeaves();
      }).catch(() => {
        this.userId = 'test.employee@local';
        this.loadLeaves();
      });
    }).catch(() => {
      this.userId = 'test.employee@local';
      this.loadLeaves();
    });
  }

  loadLeaves() {
    if (!this.userId) return;
    this.http.get<any[]>(`${this.apiUrl}/${this.userId}`).subscribe({
      next: (res) => (this.leaves = res),
      error: (err) => this.snackBar.open('Error fetching leaves', 'Close', { duration: 3000 })
    });
  }

  submitLeave() {
    if (this.leaveForm.invalid || !this.userId) return;

    const leaveData = { employeeId: this.userId, ...this.leaveForm.value };

    this.http.post(`${this.apiUrl}/apply`, leaveData).subscribe({
      next: () => {
        this.snackBar.open('Leave applied successfully', 'Close', { duration: 3000 });
        this.leaveForm.reset();
        this.loadLeaves();
      },
      error: (err) => this.snackBar.open('Error applying leave', 'Close', { duration: 3000 })
    });
  }
   updateCurrentTime() {
    this.currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }
}
