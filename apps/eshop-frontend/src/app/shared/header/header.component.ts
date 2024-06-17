import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RouterLink } from '@angular/router';
import { ProductsSearchComponent } from '@eshop/products';

@Component({
  selector: 'client-header',
  standalone: true,
  imports: [
    NavComponent,
    RouterLink,
    ProductsSearchComponent
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

}
