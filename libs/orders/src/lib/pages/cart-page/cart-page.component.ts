import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { CurrencyPipe, Location } from '@angular/common';
import { InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';
import { CartService } from '../../services/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrdersService } from '../../services/orders.service';
import { CartItemDetailed } from '../../models/cart';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'orders-cart-page',
  standalone: true,
  imports: [
    Button,
    CurrencyPipe,
    InputNumberModule,
    OrderSummaryComponent,
    FormsModule
  ],
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit {

  #locationService = inject(Location);
  #cartService = inject(CartService);
  #orderService = inject(OrdersService);
  #destroyRef = inject(DestroyRef);

  cartItemsDetailed: CartItemDetailed[] = [];

  ngOnInit() {
    this.getCartDetail();
  }

  getCartDetail() {
    this.#cartService.cart$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(cart => {
        this.cartItemsDetailed = [];
        cart.items?.forEach(item => {
          this.#orderService.getProduct(item.productId!)
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(product => {
              this.cartItemsDetailed.push({
                product,
                quantity: item.quantity
              });
            });
        });
      });
  }

  goBack() {
    this.#locationService.back();
  }

  deleteCartItem(item: CartItemDetailed) {
    this.#cartService.removeCartItem(item.product.id);
  }

  updateCartItemQuantity($event: InputNumberInputEvent, cartItem: CartItemDetailed) {
    this.#cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: +($event.value || 0)
    }, true);
  }
}
