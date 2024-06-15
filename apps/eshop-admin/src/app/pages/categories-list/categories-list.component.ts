import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@eshop/products';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { Button } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  standalone: true,
  imports: [
    AsyncPipe,
    Button,
    ToolbarModule,
    CardModule,
    RouterLink,
    ToastModule,
    TableModule,
    NgClass,
    NgStyle,
    ConfirmDialogModule
  ],
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit {

  #categoryService = inject(CategoriesService);
  #messageService = inject(MessageService);
  #confirmationService = inject(ConfirmationService);
  #router = inject(Router);

  categories: Category[] = [];
  isLoading = false;

  ngOnInit() {
    this.#getCategories();
  }

  #getCategories() {
    this.isLoading = true;
    this.#categoryService.getCategories()
      .pipe(
        first(),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: categories => {
          this.categories = categories;
        },
        error: error => {
          {
            this.#messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong while retrieving categories'
            });
          }
        }
      });
  }

  updateCategory(categoryId: string) {
    this.#router.navigate(['/categories/form/' + categoryId]);
  }

  deleteCategory(categoryId: string) {
    this.#confirmationService.confirm({
      message: 'Are you sure you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'mx-4',
      accept: () => {
        this.#categoryService.deleteCategory(categoryId)
          .pipe(first())
          .subscribe({
            next: value => {
              this.#messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Category is deleted'
              });
              this.#getCategories();
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
