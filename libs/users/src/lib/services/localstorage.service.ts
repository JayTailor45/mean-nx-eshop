import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  setToken(data: string): void {
    localStorage.setItem('token', data);
  }

  getToken(): string {
    return localStorage.getItem('token')!;
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  isValidToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this.#tokenExpired(tokenDecode.exp);
    }
    return false;
  }

  #tokenExpired(expiration: string) {
    return Math.floor(new Date().getTime() / 1000) >= +expiration;
  }

  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode) {
        return tokenDecode.userId;
      }
      return null;
    }
    return null;
  }

}
