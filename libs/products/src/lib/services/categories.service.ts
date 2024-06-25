import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '@eshop/app-config';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  #http = inject(HttpClient);

  readonly #apiUrl!: string;

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {
    this.#apiUrl = appConfig.baseURL;
  }

  getCategories(): Observable<Category[]> {
    return this.#http.get<Category[]>(`${this.#apiUrl}v1/categories/`);
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.#http.get<Category>(`${this.#apiUrl}v1/categories/${categoryId}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.#http.post(`${this.#apiUrl}v1/categories/`, category);
  }

  deleteCategory(categoryId: string): Observable<Category[]> {
    return this.#http.delete<Category[]>(`${this.#apiUrl}v1/categories/${categoryId}`);
  }

  editCategory(categoryId: string, category: Category): Observable<Category> {
    return this.#http.put<Category>(`${this.#apiUrl}v1/categories/${categoryId}`, category);
  }
}
