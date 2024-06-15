import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService, PrimeTemplate } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { finalize, first } from 'rxjs';
import { UsersService, User, GetCountryPipe } from '@eshop/users';
import { TagModule } from 'primeng/tag';
import { NgIf } from '@angular/common';

@Component({
  selector: 'admin-users-list',
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
    TagModule,
    NgIf,
    GetCountryPipe
  ],
  templateUrl: './users-list.component.html',
  styles: ``
})
export class UsersListComponent implements OnInit {

  #userService = inject(UsersService);
  #messageService = inject(MessageService);
  #confirmationService = inject(ConfirmationService);
  #router = inject(Router);

  users: User[] = [];
  isLoading = false;

  ngOnInit() {
    this.#getUsers();
  }

  #getUsers() {
    this.#userService.getUsers()
      .pipe(
        first(),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: users => {
          this.users = users;
        },
        error: err => {
          {
            this.#messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong while retrieving users'
            });
          }
        }
      });
  }

  deleteUser(id: string) {
    this.#confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'mx-4',
      accept: () => {
        this.#userService.deleteUser(id)
          .pipe(first())
          .subscribe({
            next: value => {
              this.#messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'User is deleted'
              });
              this.#getUsers();
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

  updateUser(id: string) {
    this.#router.navigate(['/users/form/' + id]);
  }
}
