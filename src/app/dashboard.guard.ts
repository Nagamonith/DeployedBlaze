import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DashboardGuard implements CanActivate {
  // private readonly ALLOWED_USERS = ['Jayanth Purushottam', 'Adarsha Y H', 'Bhanumathi subramani'];
    private readonly ALLOWED_USERS = ['adarsha.yh@datalyzerint.com','jayanth@datalyzerint.com','bhanumathi.s@datalyzerint.com'];


  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail');

    // First check if user is logged in
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if user is in the allowed list
    if (userEmail && this.ALLOWED_USERS.includes(userEmail)) {
      return true;
    }

    // User is logged in but not authorized for this dashboard
    console.warn(`Access denied: ${userRole} is not authorized for Dashboard`);
    this.router.navigate(['/assets/pre-dashboard']); // Redirect to default dashboard
    return false;
  }
}
