import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';
import { APP_CONFIG, AppConfig } from '@eshop/app-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #http = inject(HttpClient);
  #localStorageService = inject(LocalstorageService);
  #router = inject(Router);

  #apiUrl!: string;

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {
    this.#apiUrl = appConfig.baseURL;
  }

  loginUser(email: string, password: string): Observable<User> {
    return this.#http.post<User>(`${this.#apiUrl}v1/users/login`, { email, password });
  }

  logoutUser() {
    this.#localStorageService.removeToken();
    this.#router.navigate(['login']);
  }
}
