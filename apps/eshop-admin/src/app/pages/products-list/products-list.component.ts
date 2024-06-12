import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService, PrimeTemplate } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Product, ProductsService } from '@eshop/products';
import { finalize } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'admin-products-list',
  standalone: true,
  imports: [
    Button,
    CardModule,
    ConfirmDialogModule,
    PrimeTemplate,
    RouterLink,
    TableModule,
    ToastModule,
    ToolbarModule,
    DatePipe
  ],
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {

  #productService = inject(ProductsService);
  #messageService = inject(MessageService);
  #confirmationService = inject(ConfirmationService);
  #router = inject(Router);

  products: Product[] = [];
  isLoading = false;

  ngOnInit() {
    this.#getProducts();
  }

  #getProducts() {
    this.#productService.getProducts()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: products => {
          this.products = products;
        },
        error: err => {
          {
            this.#messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong while retrieving products'
            });
          }
        }
      });
  }

  updateProduct(id: string) {

  }

  deleteProduct(id: string) {

  }
}
