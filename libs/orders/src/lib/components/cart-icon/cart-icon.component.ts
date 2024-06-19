import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { BadgeModule } from 'primeng/badge';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'orders-cart-icon',
  standalone: true,
  imports: [
    BadgeModule,
    AsyncPipe
  ],
  templateUrl: './cart-icon.component.html'
})
export class CartIconComponent implements OnInit {

  #cartService = inject(CartService);

  cartItemCount$!: Observable<number>;

  ngOnInit() {
    this.cartItemCount$ = this.#cartService.cart$
      .pipe(map(cart => (cart.items || []).length));

  }

}
