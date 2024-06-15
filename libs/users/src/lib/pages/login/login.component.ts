import { Component, inject } from '@angular/core';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { Button } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { finalize, first } from 'rxjs';
import { MessageService } from 'primeng/api';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users-login',
  standalone: true,
  imports: [
    InputGroupAddonModule,
    InputTextModule,
    InputGroupModule,
    Button,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

  #fb = inject(FormBuilder);
  #authService = inject(AuthService);
  #router = inject(Router);
  #localStorageService = inject(LocalstorageService);
  #messageService = inject(MessageService);

  loginForm = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  isSubmitted = false;
  isSubmitting = false;
  authError = false;

  get loginFormRef() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isSubmitted = true;
    this.isSubmitting = true;
    this.authError = false;
    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;
    this.#authService.loginUser(email, password)
      .pipe(
        first(),
        finalize(() => this.isSubmitting = false)
      )
      .subscribe({
        next: user => {
          this.#messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Successfully Logged in'
          });
          this.#localStorageService.setToken(user.token!);
          this.#router.navigate(['/dashboard']);
        },
        error: err => {
          this.authError = true;
          this.#messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong, Please try again!'
          });
        }
      });
  }
}
