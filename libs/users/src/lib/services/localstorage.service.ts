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

}
