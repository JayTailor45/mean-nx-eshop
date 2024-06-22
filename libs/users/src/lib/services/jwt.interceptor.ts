import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const localStorageService = inject(LocalstorageService);

  const token = localStorageService.getToken();

  const isAPIUrl = req.url.startsWith('http://localhost:3000/api/');

  if (token && isAPIUrl) {
    req = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
