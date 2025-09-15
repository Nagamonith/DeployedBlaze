import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DeviceDetails {
  manufacturerName: string;
  processor: string;
  installedRAM: string;
  deviceID: string;
  productID: string;
  systemType: string;
  penAndTouch: string;
  edition: string;
  version: string;
  installedOn: string;
  osBuild: string;
  experience: string;
  assignedTo: string;
}

export interface LaptopDto {
  id: number;
  deviceDetails: DeviceDetails;
}

@Injectable({
  providedIn: 'root'
})
export class LaptopService {
  private get apiBaseUrl(): string {
    return JSON.parse(sessionStorage.getItem('config') || '{}').url || '';
  }
  constructor(private http: HttpClient) {}



  getAllLaptops(): Observable<LaptopDto[]> {
    return this.http.get<LaptopDto[]>(`${this.apiBaseUrl}/api/Device/GetAllLaptopDetails`);
  }

  getLaptopById(id: number): Observable<LaptopDto> {
    return this.http.get<LaptopDto>(`${this.apiBaseUrl}/api/Device/GetLaptopById/${id}`);
  }

  addLaptop(newLaptop: LaptopDto): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/api/Device/AddNewLaptopDetails`, newLaptop, { responseType: 'text' });
  }

  updateLaptop(updatedLaptop: LaptopDto): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/api/Device/UpdateLaptopDetails`, updatedLaptop, {
      responseType: 'text' as 'json'
    });
  }

  deleteLaptop(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/api/Device/${id}`, { responseType: 'text' });
  }
  addComment(commentPayload: any): Observable<any> {
  return this.http.post(`${this.apiBaseUrl}/api/Device/AddComment`, commentPayload, {
    responseType: 'text' as 'json'
  });
}

}


