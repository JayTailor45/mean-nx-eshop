import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #http = inject(HttpClient);
  #localStorageService = inject(LocalstorageService);
  #router = inject(Router);

  readonly apiUrl = 'http://localhost:3000/api/';

  loginUser(email: string, password: string): Observable<User> {
    return this.#http.post<User>(`${this.apiUrl}v1/users/login`, { email, password });
  }

  logoutUser() {
    this.#localStorageService.removeToken();
    this.#router.navigate(['login']);
  }
}
