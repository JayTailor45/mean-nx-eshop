import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const localstorageService = inject(LocalstorageService);
  const router = inject(Router);

  const isExpired = (exp: number): boolean => {
    return Math.floor(new Date().getTime() / 1000) >= exp
  }

  const token = localstorageService.getToken();

  if (!token) {
    router.navigate(['login']);
  }

  const tokenDecode = JSON.parse(atob(token.split('.')[1]));

  if(tokenDecode.isAdmin && !isExpired(tokenDecode.exp)) return true;

  return false;
};
