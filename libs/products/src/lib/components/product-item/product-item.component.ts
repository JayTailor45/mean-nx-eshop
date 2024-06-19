import { Component, Input } from '@angular/core';
import { Button } from 'primeng/button';
import { Product } from '../../models/product.model';
import { CurrencyPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

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

}
