import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories-form/categories-form.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products-form/products-form.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UsersFormComponent } from './pages/users-form/users-form.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders-detail/orders-detail.component';
import { authGuard, userRoutes } from '@eshop/users';

export const appRoutes: Route[] = [
  ...userRoutes,
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadComponent: () => DashboardComponent
      },
      {
        path: 'categories',
        loadComponent: () => CategoriesListComponent
      },
      {
        path: 'categories/form',
        loadComponent: () => CategoriesFormComponent
      },
      {
        path: 'categories/form/:id',
        loadComponent: () => CategoriesFormComponent
      },
      {
        path: 'products',
        loadComponent: () => ProductsListComponent
      },
      {
        path: 'products/form',
        loadComponent: () => ProductsFormComponent
      },
      {
        path: 'products/form/:id',
        loadComponent: () => ProductsFormComponent
      },
      {
        path: 'users',
        loadComponent: () => UsersListComponent
      },
      {
        path: 'users/form',
        loadComponent: () => UsersFormComponent
      },
      {
        path: 'users/form/:id',
        loadComponent: () => UsersFormComponent
      },
      {
        path: 'orders',
        loadComponent: () => OrdersListComponent
      },
      {
        path: 'orders/:id',
        loadComponent: () => OrdersDetailComponent
      }
    ]
  }
];
