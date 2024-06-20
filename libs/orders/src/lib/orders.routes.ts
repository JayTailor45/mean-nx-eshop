import { Routes } from '@angular/router';
import { CartPageComponent } from '@eshop/orders';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouPageComponent } from './pages/thank-you-page/thank-you-page.component';

export const ordersRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cart'
  },
  {
    path: 'cart',
    loadComponent: () => CartPageComponent
  },
  {
    path: 'checkout',
    loadComponent: () => CheckoutPageComponent
  },
  {
    path: 'success',
    loadComponent: () => ThankYouPageComponent
  }
];
