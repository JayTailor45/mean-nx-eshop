import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductsListComponent } from '@eshop/products';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => HomePageComponent
  },
  {
    path: 'products',
    loadComponent: () => ProductsListComponent
  }
];
