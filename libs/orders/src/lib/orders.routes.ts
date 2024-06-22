import { Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouPageComponent } from './pages/thank-you-page/thank-you-page.component';
import { authGuard } from '@eshop/users';
import { restrictThankYouGuard } from './services/restrict-thank-you.guard';

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
    canActivate: [authGuard],
    loadComponent: () => CheckoutPageComponent
  },
  {
    path: 'success',
    loadComponent: () => ThankYouPageComponent,
    canActivate: [authGuard, restrictThankYouGuard]
  }
];
