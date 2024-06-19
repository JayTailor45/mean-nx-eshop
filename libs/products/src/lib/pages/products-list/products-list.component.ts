import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { ProductsService } from '../../services/products.service';
import { finalize, first, Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-products-list',
  standalone: true,
  imports: [
    ProductItemComponent,
    CheckboxModule,
    FormsModule,
    ProgressSpinnerModule,
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit, OnDestroy {

  #route = inject(ActivatedRoute);
  #productService = inject(ProductsService);
  #categoryService = inject(CategoriesService);

  #destroySub = new Subject<void>();

  isCategoriesPage = false;

  isProductListLoading = true;
  products: Product[] = [];

  isCategoryListLoading = true;
  categories: Category[] = [];

  ngOnInit() {
    this.#route.params
      .pipe(
        takeUntil(this.#destroySub)
      )
      .subscribe(params => {
        params['categoryId'] ?
          this.loadProducts([params['categoryId']]) : this.loadProducts([]);
        this.isCategoriesPage = Boolean(params['categoryId']);
      });
    this.loadCategories();
  }

  loadCategories() {
    this.isCategoryListLoading = true;
    this.#categoryService.getCategories()
      .pipe(
        first(),
        finalize(() => this.isCategoryListLoading = false)
      )
      .subscribe({
        next: categories => {
          this.categories = categories;
        }
      });
  }

  loadProducts(categoriesId: string[]) {
    this.isProductListLoading = true;
    this.#productService.getProducts(categoriesId)
      .pipe(
        first(),
        finalize(() => this.isProductListLoading = false)
      )
      .subscribe({
        next: (products) => {
          this.products = products;
        },
        error: err => {
        }
      });
  }

  applyCategoryFilter($event: CheckboxChangeEvent) {
    const selectedCategories = this.categories
      .filter(category => Boolean(category.checked))
      .map(category => category.id) as string[];

    this.loadProducts(selectedCategories);
  }

  ngOnDestroy() {
    this.#destroySub.next();
    this.#destroySub.complete();
  }
}
