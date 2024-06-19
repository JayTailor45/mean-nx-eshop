import { Component, inject, OnInit } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { finalize, first } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'product-featured-products',
  standalone: true,
  imports: [
    ProductItemComponent,
    ProgressSpinnerModule
  ],
  templateUrl: './featured-products.component.html'
})
export class FeaturedProductsComponent implements OnInit {

  #productService = inject(ProductsService);

  products: Product[] = [];

  isLoading = true;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.#productService.getFeaturedProducts(6)
      .pipe(
        first(),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: products => {
          this.products = products;
        },
        error: err => {
        }
      });
  }

}
