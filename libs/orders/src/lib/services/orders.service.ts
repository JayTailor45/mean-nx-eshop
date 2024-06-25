import { Inject, inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../models/order-item.model';
import { Product } from '@eshop/products';
import { ORDER_DATA } from '../constant/order.constant';
import { APP_CONFIG, AppConfig } from '@eshop/app-config';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  #http = inject(HttpClient);

  #apiUrl!: string;

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {
    this.#apiUrl = appConfig.baseURL;
  }

  getOrders(): Observable<Order[]> {
    return this.#http.get<Order[]>(`${this.#apiUrl}v1/orders/`);
  }

  getOrderCount(): Observable<number> {
    return this.#http.get<{ orderCount: number }>(`${this.#apiUrl}v1/orders/count`)
      .pipe(map(result => result.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.#http.get<{ totalSales: number }>(`${this.#apiUrl}v1/orders/total-sales`)
      .pipe(map(result => result.totalSales));
  }

  getOrder(orderId: string): Observable<Order> {
    return this.#http.get<Order>(`${this.#apiUrl}v1/orders/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.#http.post(`${this.#apiUrl}v1/orders/`, order);
  }

  deleteOrder(orderId: string): Observable<Order[]> {
    return this.#http.delete<Order[]>(`${this.#apiUrl}v1/orders/${orderId}`);
  }

  updateOrderStatus(orderId: string, status: string): Observable<Order> {
    return this.#http.put<Order>(`${this.#apiUrl}v1/orders/${orderId}`, { status });
  }

  getProduct(productId: string): Observable<Product> {
    return this.#http.get<Product>(`${this.#apiUrl}v1/products/${productId}`);
  }

  createCheckoutSession(orderItems: OrderItem[]): Observable<{ id: string }> {
    return this.#http.post<{ id: string }>(`${this.#apiUrl}v1/orders/create-checkout-session`, orderItems);
  }

  cacheOrderData(order: Order) {
    localStorage.setItem(ORDER_DATA, JSON.stringify(order));
  }

  getCachedOrderData(): Order | null {
    const data = localStorage.getItem(ORDER_DATA);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  clearCachedOrderData() {
    localStorage.removeItem(ORDER_DATA);
  }
}
