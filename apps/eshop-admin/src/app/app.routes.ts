import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories-form/categories-form.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
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
    ]
  }
];
