import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { first, timer } from 'rxjs';
import { countries as countryList, User, UsersService } from '@eshop/users';
import { NgIf } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Country } from '@eshop/users';

@Component({
  selector: 'admin-users-form',
  standalone: true,
  imports: [
    Button,
    CardModule,
    PaginatorModule,
    ReactiveFormsModule,
    ToastModule,
    ToolbarModule,
    RouterLink,
    NgIf,
    InputMaskModule,
    InputSwitchModule
  ],
  templateUrl: './users-form.component.html',
  styles: ``
})
export class UsersFormComponent implements OnInit {

  #fb = inject(FormBuilder);
  #userService = inject(UsersService);
  #messageService = inject(MessageService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);

  isSubmitted = false;
  isSubmitting = false;
  userId!: string;

  countries: Country[] = [];

  form: FormGroup = this.#fb.group({
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null],
    phone: [null],
    isAdmin: [false],
    street: [null],
    apartment: [null],
    zip: [null],
    city: [null],
    country: [null, Validators.required]
  });

  get userForm() {
    return this.form.controls;
  }

  ngOnInit() {
    this.userId = this.#route.snapshot.params['id'];

    this.#getCategoryDetails();
    this.#getCountries();
  }

  #getCategoryDetails() {
    if (!this.userId) return;
    this.#userService.getUser(this.userId)
      .pipe(first())
      .subscribe({
        next: user => {
          this.form.patchValue(user);
          this.form.controls['password'].setValidators([]);
          this.form.controls['email'].disable();
          this.form.controls['password'].updateValueAndValidity();
        },
        error: err => {
          this.#messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong while retrieving user details'
          });
        }
      });
  }

  #getCountries() {
    this.countries = countryList;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;

    const user: User = {};

    Object.keys(this.form.value).forEach(key => {
      user[key] = this.form.value[key];
    });

    const request = this.userId ?
      this.#userService.editUser(this.userId, user) :
      this.#userService.createUser(user);

    request
      .pipe(first())
      .subscribe({
        next: result => {
          this.#messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.userId ? 'User is updated' : 'User is created'
          });

          timer(2000).toPromise().then(() => {
            this.#router.navigate(this.userId ? ['../..'] : ['../'], { relativeTo: this.#route });
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
