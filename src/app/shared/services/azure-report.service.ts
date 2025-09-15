import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, map } from 'rxjs'; // Added map import

@Injectable({ providedIn: 'root' })
export class AzureReportService {
  readonly apiUrl = 'http://localhost:5090/api/azure/report';

  constructor(private http: HttpClient) { }

  getReport(): Observable<string> {
    return this.http.get(this.apiUrl, { 
      responseType: 'text',
      headers: {
        'Accept': 'text/html',
        'Cache-Control': 'no-cache'
      }
    }).pipe(
      catchError(error => {
        console.error('API Error:', {
          status: error.status,
          message: error.message,
          url: this.apiUrl
        });
        // Throw the error to be handled by the component
        throw error;
      })
    );
  }
}