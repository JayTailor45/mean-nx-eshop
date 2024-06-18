import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { finalize, first } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-categories-banner',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    NgStyle,
    RouterLink
  ],
  templateUrl: './categories-banner.component.html'
})
export class CategoriesBannerComponent implements OnInit {

  #categoryService = inject(CategoriesService);

  isLoading = true;
  categories: Category[] = [];

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.#categoryService.getCategories()
      .pipe(
        finalize(() => this.isLoading = false),
        first()
      )
      .subscribe({
        next: categories => this.categories = categories,
        error: err => {
        }
      });
  }

}
