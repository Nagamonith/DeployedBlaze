import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { AppConfigService } from '../../services/app-config.service';
import { UploadResponse } from '../modles/upload.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl: string;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.apiUrl = `${this.appConfig.apiUrl}/api/uploads`;
  }

  uploadFile(file: File, testCaseId?: string): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('File', file);
    if (testCaseId) {
      formData.append('TestCaseId', testCaseId);
    }
    // Swagger: /api/uploads/file
    return this.http.post<UploadResponse>(`${this.apiUrl}/file`, formData);
  }

  getUpload(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}`, { responseType: 'blob' });
  }

  deleteUpload(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}