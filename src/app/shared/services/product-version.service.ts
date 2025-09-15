// product-version.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductVersion {
  id: string;
  version: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductVersionService {
  constructor(private http: HttpClient) {}

  getVersions(productId: string): Observable<ProductVersion[]> {
    return this.http.get<ProductVersion[]>(`/api/products/${productId}/versions`);
  }
}
