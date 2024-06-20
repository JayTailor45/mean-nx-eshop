import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductDetailsComponent, ProductsListComponent } from '@eshop/products';
import { ordersRoutes } from '@eshop/orders';
import { userRoutes } from '@eshop/users';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => HomePageComponent
  },
  ...userRoutes,
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
