import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService, PrimeTemplate } from 'primeng/api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { CategoriesService, Category } from '@eshop/products';
import { ToastModule } from 'primeng/toast';
import { first, timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  standalone: true,
  imports: [
    AsyncPipe,
    Button,
    CardModule,
    PrimeTemplate,
    RouterLink,
    TableModule,
    ToolbarModule,
    InputTextModule,
    ReactiveFormsModule,
    ColorPickerModule,
    NgIf,
    ToastModule
  ],
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {

  #fb = inject(FormBuilder);
  #categoryService = inject(CategoriesService);
  #messageService = inject(MessageService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);

  isSubmitted = false;
  isSubmitting = false;
  categoryId!: string;

  form: FormGroup = this.#fb.group({
    name: [null, Validators.required],
    icon: [null, Validators.required],
    color: ['#fff']
  });

  get categoryForm() {
    return this.form.controls;
  }

  ngOnInit() {
    this.categoryId = this.#route.snapshot.params['id'];

    if (this.categoryId) {
      this.#getCategoryDetails();
    }
  }

  #getCategoryDetails() {
    this.#categoryService.getCategory(this.categoryId)
      .pipe(first())
      .subscribe({
        next: category => {
          this.form.patchValue(category);
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

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;

    const category: Category = {
      name: this.form.value.name,
      icon: this.form.value.icon,
      color: this.form.value.color
    };

    const request = this.categoryId ?
      this.#categoryService.editCategory(this.categoryId, category) :
      this.#categoryService.createCategory(category);

    request
      .pipe(first())
      .subscribe({
        next: result => {
          this.#messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.categoryId ? 'Category is updated' : 'Category is created'
          });

          timer(2000).toPromise().then(() => {
            this.#router.navigate(this.categoryId ? ['../..'] : ['../'], { relativeTo: this.#route });
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
