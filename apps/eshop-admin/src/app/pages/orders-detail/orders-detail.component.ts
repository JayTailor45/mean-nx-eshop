import { Component, inject, OnInit } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { Order, ORDER_STATUS, OrdersService } from '@eshop/orders';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { GetCountryPipe } from '@eshop/users';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';

@Component({
  selector: 'admin-orders-detail',
  standalone: true,
  imports: [
    ToastModule,
    CardModule,
    FieldsetModule,
    DropdownModule,
    DatePipe,
    CurrencyPipe,
    GetCountryPipe,
    FormsModule
  ],
  templateUrl: './orders-detail.component.html',
  styles: ``
})
export class OrdersDetailComponent implements OnInit {

  #orderService = inject(OrdersService);
  #route = inject(ActivatedRoute);
  #messageService = inject(MessageService);

  orderId!: string;

  order: Order = {};

  orderStatusList = [];
  selectedStatus: string;

  ngOnInit() {
    this.orderId = this.#route.snapshot.params['id'];

    this.#getOrderDetail();
    this.#getOrderStatus();
  }

  #getOrderDetail() {
    if (!this.orderId) return;
    this.#orderService.getOrder(this.orderId)
      .pipe(first())
      .subscribe({
        next: order => {
          this.order = order;
          this.selectedStatus = order.status;
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

  #getOrderStatus() {
    this.orderStatusList = Object.keys(ORDER_STATUS).map(status => {
      return { value: status, label: ORDER_STATUS[status]?.label };
    });
  }

  onStatusChange($event: DropdownChangeEvent) {
    this.#orderService.updateOrderStatus(this.orderId, $event.value)
      .pipe(first())
      .subscribe({
        next: value => {
          this.#messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Orders status updated'
          });
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
}
