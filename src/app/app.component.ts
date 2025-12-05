import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IdleTimeoutService } from './services/idle-timeout.service';
import { MatDialog } from '@angular/material/dialog';
import { SessionTimeoutDialogComponent } from './shared/dialogs/session-timeout-dialog/session-timeout-dialog.component';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FrontendApplication';
  private subscriptions = new Subscription();
  private warningDialogOpen = false;

  constructor(
    private idleTimeoutService: IdleTimeoutService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if user is logged in and start idle timeout
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const isLoginPage = event.url.includes('/login');

        if (isLoggedIn && !isLoginPage) {
          this.idleTimeoutService.startWatching();
        } else if (isLoginPage) {
          this.idleTimeoutService.stopWatching();
        }
      });

    // Subscribe to timeout warnings
    this.subscriptions.add(
      this.idleTimeoutService.onWarning.subscribe(remainingTime => {
        if (!this.warningDialogOpen) {
          this.showWarningDialog(remainingTime);
        }
      })
    );

    // Subscribe to timeout events
    this.subscriptions.add(
      this.idleTimeoutService.onTimeout.subscribe(() => {
        console.log('User logged out due to inactivity');
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.idleTimeoutService.stopWatching();
  }

  private showWarningDialog(remainingTime: number) {
    this.warningDialogOpen = true;
    const dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
      width: '450px',
      disableClose: true,
      data: { remainingTime }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.warningDialogOpen = false;
      if (result?.action === 'continue') {
        this.idleTimeoutService.extendSession();
      } else if (result?.action === 'logout') {
        this.idleTimeoutService.stopWatching();
        // The service will handle the logout
      }
    });
  }
}


// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router'; // Required for <router-outlet>
// import { CommonModule } from '@angular/common'; // Optional but useful
// import { Observable } from 'rxjs';
// import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-root',
//   standalone: true, 
//   imports: [CommonModule, RouterModule], 
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'FrontendApplication';
//   constructor(private http: HttpClient) {
//       this.getjsonData('./assets/config/config.json').subscribe(data => {
//       console.log(data);
//       sessionStorage.setItem('config', JSON.stringify(data.body));
//     });
//   }
//    getjsonData(e: any): Observable<HttpResponse<any>> {
//        try {  
//             return this.http.get < any > (e, {
//                 headers: new HttpHeaders({
//                     'Content-Type': 'application/json'
//                 }),
//                 observe: 'response'
//             });
//         } catch (ex) {
//             throw new Error("ServerService:getMethod() " + ex);
//         }
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { ConfigLoaderService } from './services/config-loader.service';
// import { RouterOutlet } from '@angular/router';

// @Component({
//    selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   constructor(private configLoader: ConfigLoaderService) {}

//   ngOnInit() {
//     this.configLoader.loadConfig();
//   }
// }