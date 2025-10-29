import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CoolSessionStorage } from '@angular-cool/storage';
import { ConfigService } from '../../app/services/config.service';
import { LoginAlertDialogComponent } from '../../app/shared/dialogs/login-alert-dialog/login-alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  message: string = '';
  private apiBaseUrl: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionStorage: CoolSessionStorage,
    private configService: ConfigService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    try {
      // Wait until config is loaded
      await this.configService.loadConfig();
      this.apiBaseUrl = this.configService.apiBaseUrl;

      if (!this.apiBaseUrl) {
        console.error('API base URL is not defined in config!');
      }
    } catch (err) {
      console.error('Failed to load configuration:', err);
    }
    localStorage.clear();

  }


  // onSubmit() {
  //   if (!this.apiBaseUrl) {
  //     this.message = 'Cannot login: API URL not loaded.';
  //     return;
  //   }

  //   const payload = {
  //     username: this.username,
  //     password: this.password
  //   };

  //   this.http.post(`${this.apiBaseUrl}/api/Auth/user-login`, payload, { responseType: 'text' })
  //     .subscribe({
  //       next: (response) => {
  //         this.message = response;

  //         // Show success dialog
  //         this.dialog.open(LoginAlertDialogComponent, {
  //           width: '420px',
  //           data: {
  //             title: 'Login Successful',
  //             message: 'You have been successfully logged in.'
  //           }
  //         });

  //         // Mark as logged in
  //         localStorage.setItem('isLoggedIn', 'true');

  //         // Optional: Gantt sync
  //         this.http.post(`${this.apiBaseUrl}/api/gantt/sync-from-mysql`, {}).subscribe({
  //           next: () => console.log('Gantt sync completed.'),
  //           error: (err) => console.error('Gantt sync failed:', err)
  //         });

  //          this.http.post(`${this.apiBaseUrl}/api/gantt/sync-time-from-mysql`, {}).subscribe({
  //           next: () => console.log('Gantt sync completed.'),
  //           error: (err) => console.error('Gantt sync failed:', err)
  //         });

  //         // Navigate to dashboard
  //         this.router.navigate(['/assets/pre-dashboard']);
  //       },
  //       error: (error) => {
  //         if (error.status === 401) {
  //           this.message = 'Invalid username or password.';
  //         } else {
  //           this.message = 'Login failed. Try again later.';
  //         }
  //       }
  //     });
  // }

  onSubmit() {
  if (!this.apiBaseUrl) {
    this.message = 'Cannot login: API URL not loaded.';
    return;
  }

  const payload = {
    username: this.username,
    password: this.password
  };

  this.http.post(`${this.apiBaseUrl}/api/Auth/user-login`, payload, { responseType: 'text' })
    .subscribe({
      next: (response) => {
        this.message = response;

        // ✅ Determine role based on username
        let role = '';
        if (this.username.toLowerCase() === 'admin') {
          role = 'Admin';
        } else if (this.username.toLowerCase() === 'manager') {
          role = 'Manager';
        } else if (this.username.toLowerCase() === 'tester') {
          role = 'Tester';
        } else {
          role = 'Unknown';
        }

        // ✅ Set userRole only after successful login
        localStorage.setItem('userRole', role);
        localStorage.setItem('isLoggedIn', 'true');

        // ✅ Optional success dialog
        this.dialog.open(LoginAlertDialogComponent, {
          width: '420px',
          data: {
            title: 'Login Successful',
            message: `Welcome, ${role}!`
          }
        });

        // Optional: Trigger your Gantt sync
        this.http.post(`${this.apiBaseUrl}/api/gantt/sync-from-mysql`, {}).subscribe({
          next: () => console.log('Gantt sync completed.'),
          error: (err) => console.error('Gantt sync failed:', err)
        });

        this.http.post(`${this.apiBaseUrl}/api/gantt/sync-time-from-mysql`, {}).subscribe({
          next: () => console.log('Time sync completed.'),
          error: (err) => console.error('Time sync failed:', err)
        });

        // ✅ Navigate to pre-dashboard
        this.router.navigate(['/assets/pre-dashboard']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.message = 'Invalid username or password.';
        } else {
          this.message = 'Login failed. Try again later.';
        }

        // ❌ Clear role if login failed
        localStorage.removeItem('userRole');
        localStorage.removeItem('isLoggedIn');
      }
    });
}

}
