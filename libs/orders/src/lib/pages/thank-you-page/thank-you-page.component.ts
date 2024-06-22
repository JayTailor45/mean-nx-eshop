import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-thank-you-page',
  standalone: true,
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './thank-you-page.component.html'
})
export class ThankYouPageComponent implements OnInit {

  #orderService = inject(OrdersService);
  #cartService = inject(CartService);

  ngOnInit() {
    this.#addOrder();
  }

  #addOrder() {
    const order = this.#orderService.getCachedOrderData();

    if (!order) return;

    this.#orderService.createOrder(order)
      .pipe(first())
      .subscribe({
        next: response => {
          this.#cartService.emptyCart();
          this.#orderService.clearCachedOrderData();
        }
      });
  }
}
