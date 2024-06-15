import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { ProductsService } from '@eshop/products';
import { UsersService } from '@eshop/users';
import { OrdersService } from '@eshop/orders';
import { combineLatest, Observable, shareReplay } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [
    CardModule,
    CurrencyPipe,
    ProgressSpinnerModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  #productService = inject(ProductsService);
  #userService = inject(UsersService);
  #orderService = inject(OrdersService);

  dashboardData$: Observable<number[]>;

  ngOnInit() {
    this.dashboardData$ = combineLatest([
      this.#orderService.getOrderCount(),
      this.#productService.getProductCount(),
      this.#userService.getUserCount(),
      this.#orderService.getTotalSales()
    ]).pipe(shareReplay());
  }
}
