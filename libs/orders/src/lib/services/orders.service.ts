import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../models/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  #http = inject(HttpClient);

  getOrders(): Observable<Order[]> {
    return this.#http.get<Order[]>('http://localhost:3000/api/v1/orders/');
  }

  getOrderCount(): Observable<number> {
    return this.#http.get<{ orderCount: number }>('http://localhost:3000/api/v1/orders/count')
      .pipe(map(result => result.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.#http.get<{ totalSales: number }>('http://localhost:3000/api/v1/orders/total-sales')
      .pipe(map(result => result.totalSales));
  }

  getOrder(orderId: string): Observable<Order> {
    return this.#http.get<Order>(`http://localhost:3000/api/v1/orders/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.#http.post('http://localhost:3000/api/v1/orders/', order);
  }

  deleteOrder(orderId: string): Observable<Order[]> {
    return this.#http.delete<Order[]>(`http://localhost:3000/api/v1/orders/${orderId}`);
  }

  updateOrderStatus(orderId: string, status: string): Observable<Order> {
    return this.#http.put<Order>(`http://localhost:3000/api/v1/orders/${orderId}`, { status });
  }

  getProduct(productId: string): Observable<any> {
    return this.#http.get<any>(`http://localhost:3000/api/v1/products/${productId}`);
  }

  createCheckoutSession(orderItems: OrderItem[]): Observable<{ id: string }> {
    return this.#http.post<{ id: string }>('http://localhost:3000/api/v1/orders/create-checkout-session', orderItems);
  }

  cacheOrderData(order: Order) {
    localStorage.setItem('orderData', JSON.stringify(order));
  }

  getCachedOrderData(): Order | null {
    const data = localStorage.getItem('orderData');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  clearCachedOrderData() {
    localStorage.removeItem('orderData');
  }
}
