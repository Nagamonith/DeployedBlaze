import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<void> {
    return firstValueFrom(this.http.get('/assets/config/testcase-config.json'))
      .then(config => {
        this.config = config;
      });
  }

  get apiUrl(): string {
    return this.config?.testcaseApiUrl;
  }
}
