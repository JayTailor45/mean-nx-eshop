import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductDetailsComponent, ProductsListComponent } from '@eshop/products';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => HomePageComponent
  },
  {
    path: 'products',
    loadComponent: () => ProductsListComponent
  },
  {
    path: 'products/:productId',
    loadComponent: () => ProductDetailsComponent
  },
  {
    path: 'category/:categoryId',
    loadComponent: () => ProductsListComponent
  }
];
