import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductDetailsComponent, ProductsListComponent } from '@eshop/products';
import { ordersRoutes } from '@eshop/orders';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => HomePageComponent
  },
  ...ordersRoutes,
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
