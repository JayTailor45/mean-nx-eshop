import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type NavItem = {
  id: number;
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  navigations: NavItem[] = [
    { id: 1, label: 'Dashboard', route: '/', icon: 'pi-home' },
    { id: 2, label: 'Products', route: '/products', icon: 'pi-briefcase' },
    { id: 3, label: 'Categories', route: '/categories', icon: 'pi-list' },
    { id: 4, label: 'Orders', route: '/orders', icon: 'pi-shopping-cart' },
    { id: 5, label: 'Users', route: '/users', icon: 'pi-users' },
  ]
}
