import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  #http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.#http.get<User[]>('http://localhost:3000/api/v1/users/');
  }

  getUser(userId: string): Observable<User> {
    return this.#http.get<User>(`http://localhost:3000/api/v1/users/${userId}`);
  }

  createUser(userData: User): Observable<User> {
    return this.#http.post('http://localhost:3000/api/v1/users/register', userData);
  }

  deleteUser(userId: string): Observable<User> {
    return this.#http.delete<User>(`http://localhost:3000/api/v1/users/${userId}`);
  }

  editUser(userId: string, userData: User): Observable<User> {
    return this.#http.put<User>(`http://localhost:3000/api/v1/users/${userId}`, userData);
  }
}
