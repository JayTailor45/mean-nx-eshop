import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { APP_CONFIG, AppConfig } from '@eshop/app-config';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  #http = inject(HttpClient);

  #apiUrl !: string;

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {
    this.#apiUrl = appConfig.baseURL;
  }

  getProducts(categoriesId: string[]): Observable<Product[]> {
    return this.#http.get<Product[]>(`${this.#apiUrl}v1/products/`, {
      params: {
        categories: categoriesId.join(',')
      }
    });
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.#http.get<Product[]>(`${this.#apiUrl}v1/products/featured/${count}`);
  }

  getProductCount(): Observable<number> {
    return this.#http.get<{ productCount: number }>(`${this.#apiUrl}v1/products/count`)
      .pipe(map(result => result.productCount));
  }

  getProduct(productId: string): Observable<Product> {
    return this.#http.get<Product>(`${this.#apiUrl}v1/products/${productId}`);
  }

  createProduct(productFormData: FormData): Observable<Product> {
    return this.#http.post(`${this.#apiUrl}v1/products/`, productFormData);
  }

  deleteProduct(productId: string): Observable<Product[]> {
    return this.#http.delete<Product[]>(`${this.#apiUrl}v1/products/${productId}`);
  }

  editProduct(productId: string, productFormData: FormData): Observable<Product> {
    return this.#http.put<Product>(`${this.#apiUrl}v1/products/${productId}`, productFormData);
  }
}
