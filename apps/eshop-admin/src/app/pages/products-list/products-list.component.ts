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
import { finalize, first } from 'rxjs';
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
      .pipe(
        first(),
        finalize(() => this.isLoading = false)
      )
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
    this.#router.navigate(['/products/form/' + id]);
  }

  deleteProduct(id: string) {
    this.#confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'mx-4',
      accept: () => {
        this.#productService.deleteProduct(id)
          .pipe(first())
          .subscribe({
            next: value => {
              this.#messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Product is deleted'
              });
              this.#getProducts();
            },
            error: err => {
              this.#messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Something went wrong'
              });
            }
          });
      }
    });
  }
}
