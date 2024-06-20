import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { Location, NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { countries as countryList, Country, User } from '@eshop/users';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { Order } from '../../models/order.model';
import { OrderItem } from '../../models/order-item.model';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { finalize, first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'orders-checkout-page',
  standalone: true,
  imports: [
    Button,
    DropdownModule,
    InputMaskModule,
    InputSwitchModule,
    NgIf,
    ReactiveFormsModule,
    OrderSummaryComponent
  ],
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {

  #locationService = inject(Location);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #cartService = inject(CartService);
  #orderService = inject(OrdersService);

  isSubmitted!: boolean;
  countries: Country[] = [];
  orderItems: OrderItem[] = [];
  userId!: string;
  isSubmitting = false;

  form: FormGroup = this.#fb.group({
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, Validators.required],
    street: [null, Validators.required],
    apartment: [null, Validators.required],
    zip: [null, Validators.required],
    city: [null, Validators.required],
    country: [null, Validators.required]
  });

  get checkoutForm() {
    return this.form.controls;
  }

  ngOnInit() {
    this.#getCountries();
    this.#getCartItems();
  }

  #getCountries() {
    this.countries = countryList;
  }

  navigateBack() {
    this.#locationService.back();
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const formValues = this.form.value;

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: formValues.street,
      shippingAddress2: formValues.apartment,
      city: formValues.city,
      zip: formValues.zip,
      country: formValues.country,
      phone: formValues.phone,
      status: '0',
      user: this.userId, // TODO: Add dynamic user id
      dateOrdered: Date.now().toString()
    };
    this.isSubmitting = true;

    this.#orderService.createOrder(order)
      .pipe(first(), finalize(() => this.isSubmitting = false))
      .subscribe({
        next: response => {
          this.#router.navigate(['/success']);
          this.#cartService.emptyCart();
        },
        error: err => {
        }
      });

  }

  #getCartItems() {
    const cart = this.#cartService.getCart();
    this.orderItems = (cart.items || []).map(item => ({
      product: item.productId,
      quantity: item.quantity
    }));
  }
}
