// import { Injectable } from '@angular/core';
// import { CanActivate, CanActivateChild, Router } from '@angular/router';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate, CanActivateChild {
//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     return this.checkLogin();
//   }

//   canActivateChild(): boolean {
//     return this.checkLogin();
//   }

//   private checkLogin(): boolean {
//     const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

//     if (isLoggedIn) {
//       return true;
//     }

//     // 🚨 If not logged in → always go to login
//     this.router.navigate(['/login']);
//     return false;
//   }
// }
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.checkLogin(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    return this.checkLogin(route);
  }

  private checkLogin(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole'); // e.g. "Admin" or "Manager"
    const expectedRole = route.data?.['expectedRole']; // 👈 from route config

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    // ✅ Role-based restriction
    if (expectedRole && userRole !== expectedRole) {
      this.router.navigate(['/unauthorized']); // create this page or redirect to home
      return false;
    }

    return true;
  }
}
