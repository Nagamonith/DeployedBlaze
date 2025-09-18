import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(): boolean {
    return this.checkLogin();
  }

  canActivateChild(): boolean {
    return this.checkLogin();
  }

  private checkLogin(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      return true;
    }

    // 🚨 If not logged in → always go to login
    this.router.navigate(['/login']);
    return false;
  }
}
