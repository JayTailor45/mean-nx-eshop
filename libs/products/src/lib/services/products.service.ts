import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  #http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.#http.get<Product[]>('http://localhost:3000/api/v1/products/');
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.#http.get<Product[]>(`http://localhost:3000/api/v1/products/featured/${count}`);
  }

  getProductCount(): Observable<number> {
    return this.#http.get<{productCount: number}>('http://localhost:3000/api/v1/products/count')
      .pipe(map(result => result.productCount));
  }

  getProduct(productId: string): Observable<Product> {
    return this.#http.get<Product>(`http://localhost:3000/api/v1/products/${productId}`);
  }

  createProduct(productFormData: FormData): Observable<Product> {
    return this.#http.post('http://localhost:3000/api/v1/products/', productFormData);
  }

  deleteProduct(productId: string): Observable<Product[]> {
    return this.#http.delete<Product[]>(`http://localhost:3000/api/v1/products/${productId}`);
  }

  editProduct(productId: string, productFormData: FormData): Observable<Product> {
    return this.#http.put<Product>(`http://localhost:3000/api/v1/products/${productId}`, productFormData);
  }
}
