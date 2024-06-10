import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => HomePageComponent
  },
  {
    path: 'products',
    loadComponent: () => ProductListComponent
  }
];
