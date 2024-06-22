import { CanActivateFn } from '@angular/router';

export const restrictThankYouGuard: CanActivateFn = (route, state) => {
  const orderData = localStorage.getItem('orderData');
  return !!orderData;
};
