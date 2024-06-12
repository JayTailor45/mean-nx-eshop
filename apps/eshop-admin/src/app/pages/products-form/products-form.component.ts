import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgIf } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriesService, Category, ProductsService } from '@eshop/products';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  standalone: true,
  imports: [
    Button,
    CardModule,
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
    ToastModule,
    ToolbarModule,
    RouterLink,
    InputTextareaModule,
    InputSwitchModule,
    EditorModule
  ],
  templateUrl: './products-form.component.html'
})
export class ProductsFormComponent implements OnInit {

  #fb = inject(FormBuilder);
  #productService = inject(ProductsService);
  #categoryService = inject(CategoriesService);
  #messageService = inject(MessageService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);

  productId!: string;
  isSubmitting = false;
  isSubmitted = false;

  displayImage!: string | ArrayBuffer | null | undefined;

  categories: Category[] = [];

  form!: FormGroup;

  get productForm() {
    return this.form.controls;
  }

  ngOnInit() {
    this.productId = this.#route.snapshot.params['id'];

    this.#initForm();
    this.#getCategories();
    this.#getProductDetail();
  }

  #initForm() {
    this.form = this.#fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [null, Validators.required],
      isFeatured: [false]
    });
  }

  #getCategories() {
    this.#categoryService.getCategories().subscribe({
      next: categories => this.categories = categories,
      error: err => {
        this.#messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong while retrieving categories'
        });
      }
    });
  }

  #getProductDetail() {
    if (!this.productId) return;

    this.#productService.getProduct(this.productId)
      .subscribe({
        next: product => {
          this.form.controls['name'].patchValue(product?.name);
          this.form.controls['brand'].patchValue(product?.brand);
          this.form.controls['description'].patchValue(product?.description);
          this.form.controls['richDescription'].patchValue(product?.richDescription);
          this.form.controls['countInStock'].patchValue(product?.countInStock);
          this.form.controls['price'].patchValue(product?.price);
          this.form.controls['category'].patchValue(product?.category?.id);
          this.form.controls['isFeatured'].patchValue(product?.isFeatured);
          this.displayImage = product?.image;
          this.form.controls['image'].setValidators([]);
          this.form.controls['image'].updateValueAndValidity();
        },
        error: err => {
          this.#messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong while retrieving product detail'
          });
        }
      });
  }

  onImageUpload(event: Event) {
    const file = ((event.target as HTMLInputElement).files as FileList)[0] as File;
    if (file) {
      this.form.controls['image'].patchValue(file);
      this.form.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.displayImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();

    Object.keys(this.form.controls).forEach(key => {
      formData.append(key, this.form.value[key]);
    });

    const request = this.productId ?
      this.#productService.editProduct(this.productId, formData) :
      this.#productService.createProduct(formData);

    request
      .subscribe({
        next: result => {
          this.#messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.productId ? 'Product is updated' : 'Product is created'
          });

          timer(2000).toPromise().then(() => {
            this.#router.navigate(this.productId ? ['../..'] : ['../'], { relativeTo: this.#route });
          });
        },
        error: err => {
          this.#messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong'
          });
          this.isSubmitting = false;
        }
      });

  }

}
