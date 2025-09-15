import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../services/app-config.service';
import { Product, CreateProductRequest, UpdateProductRequest, IdResponse, ProductVersionRequest, ProductVersionResponse } from '../modles/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  getProducts(): Observable<Product[]> {
    const url = `${this.appConfig.apiUrl}/api/Products`;
    return this.http.get<Product[]>(url);
  }

  getProductById(id: string): Observable<Product> {
    const url = `${this.appConfig.apiUrl}/api/Products/${id}`;
    return this.http.get<Product>(url);
  }

  createProduct(product: CreateProductRequest): Observable<IdResponse> {
    const url = `${this.appConfig.apiUrl}/api/Products`;
    return this.http.post<IdResponse>(url, product);
  }

  updateProduct(id: string, product: UpdateProductRequest): Observable<void> {
    const url = `${this.appConfig.apiUrl}/api/Products/${id}`;
    return this.http.put<void>(url, product);
  }

  deleteProduct(id: string): Observable<void> {
    const url = `${this.appConfig.apiUrl}/api/Products/${id}`;
    return this.http.delete<void>(url);
  }
  addProductVersion(productId: string, request: ProductVersionRequest): Observable<IdResponse> {
    const url = `${this.appConfig.apiUrl}/api/products/${productId}/versions`;
    return this.http.post<IdResponse>(url, request);
  }

  removeProductVersion(productId: string, versionId: string): Observable<void> {
    const url = `${this.appConfig.apiUrl}/api/products/${productId}/versions/${versionId}`;
    return this.http.delete<void>(url);
  }
}

export type { Product };
