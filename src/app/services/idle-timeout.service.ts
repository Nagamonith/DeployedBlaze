import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdleTimeoutService {
  private idleTimer: any;
  private readonly IDLE_TIMEOUT = 240 * 60 * 1000; 
  private readonly WARNING_TIME = 5 * 60 * 1000; 
  private warningTimer: any;
  
  public onWarning = new Subject<number>(); // Emits remaining time
  public onTimeout = new Subject<void>();

  private events = [
    'mousedown',
    'mousemove',
    'keypress',
    'scroll',
    'touchstart',
    'click',
    'keydown'
  ];

  constructor(
    private router: Router,
    private authService: MsalService,
    private ngZone: NgZone
  ) {}

  /**
   * Start watching for user idle time
   */
  public startWatching() {
    // Run outside Angular zone for better performance
    this.ngZone.runOutsideAngular(() => {
      this.events.forEach(event => {
        window.addEventListener(event, () => this.resetTimer(), true);
      });
    });

    this.resetTimer();
  }

  /**
   * Stop watching for idle time
   */
  public stopWatching() {
    this.clearTimers();
    this.events.forEach(event => {
      window.removeEventListener(event, () => this.resetTimer(), true);
    });
  }

  /**
   * Reset the idle timer
   */
  private resetTimer() {
    this.clearTimers();

    // Set warning timer (5 minutes before logout)
    this.warningTimer = setTimeout(() => {
      this.ngZone.run(() => {
        const remainingTime = 5 * 60; // 5 minutes in seconds
        this.onWarning.next(remainingTime);
      });
    }, this.IDLE_TIMEOUT - this.WARNING_TIME);

    // Set logout timer (60 minutes)
    this.idleTimer = setTimeout(() => {
      this.ngZone.run(() => {
        this.handleTimeout();
      });
    }, this.IDLE_TIMEOUT);
  }

  /**
   * Clear all timers
   */
  private clearTimers() {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }
    if (this.warningTimer) {
      clearTimeout(this.warningTimer);
    }
  }

  /**
   * Handle timeout - logout user
   */
  private handleTimeout() {
    console.log('Session timeout - logging out user');
    this.onTimeout.next();
    
    // Clear local storage
    localStorage.clear();
    
    // Clear session storage
    sessionStorage.clear();
    
    // Clear cookies
    this.clearAllCookies();
    
    // Logout from Microsoft
    this.authService.logoutRedirect({
      postLogoutRedirectUri: window.location.origin + '/login'
    });
  }

  /**
   * Clear all cookies
   */
  private clearAllCookies() {
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    });
  }

  /**
   * Manually extend the session
   */
  public extendSession() {
    this.resetTimer();
  }
}
