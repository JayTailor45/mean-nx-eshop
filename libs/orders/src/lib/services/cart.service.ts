import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject, Subject } from 'rxjs';

const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  #http = inject(HttpClient);

  #cart$ = new BehaviorSubject<Cart>({});
  readonly cart$ = this.#cart$.asObservable();

  constructor() {
    if (!this.isCartExist()) {
      this.initCartLocalStorage();
    }
    this.#cart$.next(this.getCart());
  }

  initCartLocalStorage() {
    const initialCart: Cart = {
      items: []
    };

    localStorage.setItem(CART_KEY, JSON.stringify(initialCart));
  }

  getCart(): Cart {
    const localStorageData = localStorage.getItem(CART_KEY);
    const cart: Cart = JSON.parse(localStorageData as string);
    return cart;
  }

  isCartExist() {
    const checkCartExist = localStorage.getItem(CART_KEY);
    return checkCartExist !== null && checkCartExist !== undefined;
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart = this.getCart();

    const cartItemExists = (cart.items || []).find(item => item.productId === cartItem.productId);
    if (cartItemExists) {
      (cart.items || []).map(item => {
        if (item.productId === cartItem.productId) {
          item.quantity!++;
        }
        return item;
      });
    } else {
      cart.items!.push(cartItem);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.#cart$.next(cart);
    return cart;
  }

}
