import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { ConfigService } from '../../app/services/config.service';
import { LoginAlertDialogComponent } from '../../app/shared/dialogs/login-alert-dialog/login-alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from '../../app/services/loader.service';
import { IdleTimeoutService } from '../../app/services/idle-timeout.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  message: string = '';
  private apiBaseUrl: string = '';
  private readonly _destroying$ = new Subject<void>();
  isLoggingIn = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private configService: ConfigService,
    private dialog: MatDialog,
    private loader: LoaderService,
    private idleTimeoutService: IdleTimeoutService
  ) {}

  async ngOnInit() {
    try {
      await this.configService.loadConfig();
      this.apiBaseUrl = this.configService.apiBaseUrl;

      if (!this.apiBaseUrl) {
        console.error('API base URL is not defined in config!');
      }
    } catch (err) {
      console.error('Failed to load configuration:', err);
    }
    localStorage.clear();

    // Handle redirect response from Microsoft login
    this.authService.handleRedirectObservable().subscribe({
      next: (result: AuthenticationResult | null) => {
        if (result) {
          this.handleLoginSuccess(result);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.message = 'Login failed. Please try again.';
      }
    });

    // Check if user is already logged in
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  checkAndSetActiveAccount() {
    const activeAccount = this.authService.instance.getActiveAccount();
    if (activeAccount) {
      // User is already logged in, redirect to dashboard
      this.router.navigate(['/assets/pre-dashboard']);
    }
  }

  loginWithMicrosoft() {
    if (this.isLoggingIn) {
      return; // Prevent multiple login attempts
    }

    this.isLoggingIn = true;
    this.message = 'Redirecting to Microsoft login...';
    
    this.authService.loginRedirect({
      scopes: ['User.Read', 'openid', 'profile', 'email']
    });
  }

  private handleLoginSuccess(result: AuthenticationResult) {
    this.isLoggingIn = false;
    console.log('Login successful:', result);

    // Set active account
    this.authService.instance.setActiveAccount(result.account);

    // Extract user information
    const account = result.account;
    const userEmail = account.username || account.name || 'user@example.com';
    const userName = account.name || userEmail;

    // Determine role based on email or claims
    // You can customize this logic based on your Azure AD setup
    let role = 'User';
    if (userEmail.toLowerCase().includes('admin')) {
      role = 'Admin';
    } else if (userEmail.toLowerCase().includes('manager')) {
      role = 'Manager';
    } else if (userEmail.toLowerCase().includes('tester')) {
      role = 'Tester';
    }
    // Alternative: You can also check Azure AD group membership or app roles
    // const roles = account.idTokenClaims?.roles || [];
    // if (roles.includes('Admin')) role = 'Admin';

    // Store user information
    localStorage.setItem('userRole', role);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userName', userName);
    localStorage.setItem('msalAccessToken', result.accessToken);

    // Show success dialog
    this.dialog.open(LoginAlertDialogComponent, {
      width: '420px',
      data: {
        title: 'Login Successful',
        message: `Welcome, ${userName}!`
      }
    });

    if (this.apiBaseUrl) {
      this.http.post(`${this.apiBaseUrl}/api/gantt/sync-from-mysql`, {}).subscribe({
        next: () => console.log('Gantt sync completed.'),
        error: (err) => console.error('Gantt sync failed:', err)
      });

      this.http.post(`${this.apiBaseUrl}/api/gantt/sync-time-from-mysql`, {}).subscribe({
        next: () => console.log('Time sync completed.'),
        error: (err) => console.error('Time sync failed:', err)
      });

       this.http.post(`${this.apiBaseUrl}/api/EmployeeDashboard/InsertDailyAttendanceSummary`, {}).subscribe({
        next: () => console.log('Attendance inserted successfully.'),
        error: (err) => console.error('Attendance Insertion failed:', err)
      });

    }

    this.router.navigate(['/assets/pre-dashboard']).then(() => {
      this.idleTimeoutService.startWatching();
    });
  }
}
