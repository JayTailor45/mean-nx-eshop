import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { APP_CONFIG } from '@eshop/app-config';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const localStorageService = inject(LocalstorageService);

  const token = localStorageService.getToken();

  const isAPIUrl = req.url.startsWith(inject(APP_CONFIG)?.baseURL);

  if (token && isAPIUrl) {
    req = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
