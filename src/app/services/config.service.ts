// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// @Injectable({ providedIn: 'root' })
// export class ConfigService {
//   config: any;

//   constructor(private http: HttpClient) {}

//   loadConfig(): Promise<void> {
//     return this.http.get<any>('assets/config/config.json')
//       .toPromise()
//       .then(data => {
//         this.config = data;
//         sessionStorage.setItem('config', JSON.stringify(data));
//       })
//       .catch(err => {
//         console.error('Failed to load config:', err);
//         return Promise.resolve(); // fail silently or handle gracefully
//       });
//   }

//   get apiBaseUrl(): string {
//     return this.config?.url || '';
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<void> {
    return firstValueFrom(this.http.get('/assets/config/config.json'))
      .then(data => {
        this.config = data;
        sessionStorage.setItem('config', JSON.stringify(data));
      })
      .catch(err => {
        console.error('Failed to load config:', err);
        return Promise.resolve(); // Fails gracefully
      });
  }

  get apiBaseUrl(): string {
    return this.config?.url?.replace(/\/+$/, '') || '';
  }

  getConfig(): any {
    return this.config;
  }
}
