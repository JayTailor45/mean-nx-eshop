import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  #http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.#http.get<Product[]>('http://localhost:3000/api/v1/products/');
  }

  getProduct(productId: string): Observable<Product> {
    return this.#http.get<Product>(`http://localhost:3000/api/v1/products/${productId}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.#http.post('http://localhost:3000/api/v1/products/', product);
  }

  deleteProduct(productId: string): Observable<Product[]> {
    return this.#http.delete<Product[]>(`http://localhost:3000/api/v1/products/${productId}`);
  }

  editProduct(productId: string, category: Product): Observable<Product> {
    return this.#http.put<Product>(`http://localhost:3000/api/v1/products/${productId}`, category);
  }
}
