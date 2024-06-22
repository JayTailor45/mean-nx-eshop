import { CanActivateFn } from '@angular/router';
import { ORDER_DATA } from '../constant/order.constant';

export const restrictThankYouGuard: CanActivateFn = (route, state) => {
  const orderData = localStorage.getItem(ORDER_DATA);
  return !!orderData;
};
