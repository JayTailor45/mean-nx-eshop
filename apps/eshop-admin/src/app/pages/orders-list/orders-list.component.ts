import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService, PrimeTemplate } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Order, ORDER_STATUS, OrdersService, OrderStatus } from '@eshop/orders';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'admin-orders-list',
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
    DatePipe,
    TagModule
  ],
  templateUrl: './orders-list.component.html',
  styles: ``
})
export class OrdersListComponent implements OnInit {

  #orderService = inject(OrdersService);
  #messageService = inject(MessageService);
  #confirmationService = inject(ConfirmationService);

  orders: Order[] = [];
  isLoading = false;

  orderStatus: OrderStatus = ORDER_STATUS;

  ngOnInit() {
    this.#getOrders();
  }

  #getOrders() {
    this.isLoading = true;
    this.#orderService.getOrders()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: orders => {
          this.orders = orders;
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

  deleteOrder(categoryId: string) {
    this.#confirmationService.confirm({
      message: 'Are you sure you want to delete this order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'mx-4',
      accept: () => {
        this.#orderService.deleteOrder(categoryId).subscribe({
          next: value => {
            this.#messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted'
            });
            this.#getOrders();
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
