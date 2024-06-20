import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import { CartService } from '../../services/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrdersService } from '../../services/orders.service';
import { first } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'orders-order-summary',
  standalone: true,
  imports: [
    CurrencyPipe,
    Button,
    AsyncPipe,
    RouterLink,
    NgIf
  ],
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent implements OnInit {

  #cartService = inject(CartService);
  #orderService = inject(OrdersService);
  #destroyRef = inject(DestroyRef);

  totalPrice = signal<number>(0);
  @Input() displayAction = true;

  ngOnInit() {
    this.#getOrderSummary();
  }

  #getOrderSummary() {
    this.totalPrice.set(0);
    this.#cartService.cart$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(cart => {
        let total = 0;
        (cart.items || []).forEach(item => {
          this.#orderService.getProduct(item.productId!)
            .pipe(first())
            .subscribe(product => {
              total += ((product.price || 0) * (item.quantity || 0));
              this.totalPrice.set(total);
            });
        });
      });
  }

}
