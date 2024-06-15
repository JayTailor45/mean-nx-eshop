import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const user_routes: Routes = [
  {
    path: 'login',
    loadComponent: () => LoginComponent
  }
]
