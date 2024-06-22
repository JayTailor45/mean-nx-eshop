import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  #http = inject(HttpClient);
  #localStorageService = inject(LocalstorageService);

  #currentUser$ = new BehaviorSubject<User | null>(null);
  readonly currentUser$ = this.#currentUser$.asObservable();

  #isAuthenticated$ = new BehaviorSubject<boolean>(false);
  readonly isAuthenticated$ = this.#isAuthenticated$.asObservable();

  readonly apiUrl = 'http://localhost:3000/api/';

  getUsers(): Observable<User[]> {
    return this.#http.get<User[]>(`${this.apiUrl}v1/users/`);
  }

  getUserCount(): Observable<number> {
    return this.#http.get<{ userCount: number }>(`${this.apiUrl}v1/users/count`)
      .pipe(map(result => result.userCount));
  }

  getUser(userId: string): Observable<User> {
    return this.#http.get<User>(`${this.apiUrl}v1/users/${userId}`);
  }

  createUser(userData: User): Observable<User> {
    return this.#http.post(`${this.apiUrl}v1/users/register`, userData);
  }

  deleteUser(userId: string): Observable<User> {
    return this.#http.delete<User>(`${this.apiUrl}v1/users/${userId}`);
  }

  editUser(userId: string, userData: User): Observable<User> {
    return this.#http.put<User>(`${this.apiUrl}v1/users/${userId}`, userData);
  }

  initAppSession() {
    if (this.#localStorageService.isValidToken()) {
      const userId = this.#localStorageService.getUserIdFromToken();
      if (userId) {
        this.getUser(userId)
          .pipe(first())
          .subscribe({
            next: user => {
              this.#currentUser$.next(user);
              this.#isAuthenticated$.next(true);
            },
            error: err => {
              this.unsetSession();
            }
          });
      }
      this.unsetSession();
    }
    this.unsetSession();
  }

  unsetSession() {
    this.#currentUser$.next(null);
    this.#isAuthenticated$.next(false);
  }

}
