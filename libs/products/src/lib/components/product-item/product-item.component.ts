import { Component, inject, Input } from '@angular/core';
import { Button } from 'primeng/button';
import { Product } from '../../models/product.model';
import { CurrencyPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CartItem, CartService } from '@eshop/orders';

@Component({
  selector: 'product-product-item',
  standalone: true,
  imports: [
    Button,
    CurrencyPipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent {
  @Input({ required: true }) product!: Product;

  #cartService = inject(CartService);

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    };
    this.#cartService.setCartItem(cartItem);
  }
}
