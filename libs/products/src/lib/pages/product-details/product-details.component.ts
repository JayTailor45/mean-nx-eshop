import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, first } from 'rxjs';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgIf } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { Button } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'product-product-details',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    CurrencyPipe,
    PaginatorModule,
    Button,
    ProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {

  #route = inject(ActivatedRoute);
  #productService = inject(ProductsService);

  product!: Product;
  productId!: string;
  isLoading = true;
  quantity = 1;

  ngOnInit() {
    this.productId = this.#route.snapshot.params['productId'];
    this.getProductDetails();
  }

  getProductDetails() {
    if (!this.productId) return;

    this.isLoading = true;
    this.#productService.getProduct(this.productId)
      .pipe(
        first(),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: product => {
          this.product = product;
        },
        error: err => {
        }
      });
  }

  addToCart() {

  }
}
