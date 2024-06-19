import { Component, Input } from '@angular/core';
import { Button } from 'primeng/button';
import { Product } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'product-product-item',
  standalone: true,
  imports: [
    Button,
    CurrencyPipe
  ],
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent {
  @Input({ required: true }) product!: Product;

}
