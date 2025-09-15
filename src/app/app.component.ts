import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontendApplication';
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