import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '@eshop/orders';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  #http = inject(HttpClient);

  getOrders(): Observable<Order[]> {
    return this.#http.get<Order[]>('http://localhost:3000/api/v1/orders/');
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

}
