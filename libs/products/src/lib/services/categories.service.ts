import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  #http = inject(HttpClient);

  readonly apiUrl = 'http://localhost:3000/api/';

  getCategories(): Observable<Category[]> {
    return this.#http.get<Category[]>(`${this.apiUrl}v1/categories/`);
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.#http.get<Category>(`${this.apiUrl}v1/categories/${categoryId}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.#http.post(`${this.apiUrl}v1/categories/`, category);
  }

  deleteCategory(categoryId: string): Observable<Category[]> {
    return this.#http.delete<Category[]>(`${this.apiUrl}v1/categories/${categoryId}`);
  }

  editCategory(categoryId: string, category: Category): Observable<Category> {
    return this.#http.put<Category>(`${this.apiUrl}v1/categories/${categoryId}`, category);
  }
}
