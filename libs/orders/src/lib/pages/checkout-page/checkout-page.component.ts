import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { Location, NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { countries as countryList, Country, UsersService } from '@eshop/users';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { OrderItem } from '../../models/order-item.model';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { first, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { StripeService } from 'ngx-stripe';
import { Order } from '../../models/order.model';

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
  #userService = inject(UsersService);
  #orderService = inject(OrdersService);
  #stripeService = inject(StripeService);

  isSubmitted!: boolean;
  countries: Country[] = [];
  orderItems: OrderItem[] = [];
  isSubmitting = false;
  userId!: string;

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
    this.#setUserData();
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
    this.isSubmitting = true;

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
      user: this.userId,
      dateOrdered: Date.now().toString()
    };

    this.#orderService.cacheOrderData(order);

    this.#orderService.createCheckoutSession(this.orderItems)
      .pipe(
        switchMap((seesion) => {
          return this.#stripeService.redirectToCheckout({ sessionId: seesion.id });
        })
      )
      .subscribe({
        next: error => {
          if (error) {
            console.error('Error in redirect ', error);
          }
        },
        error: err => {
          console.log('Something went wrong');
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


  #setUserData() {
    this.#userService.currentUser$
      .pipe(first())
      .subscribe(user => {
        if (!user) {
          return;
        }
        this.form.controls['name'].setValue(user.name);
        this.form.controls['email'].setValue(user.email);
        this.form.controls['street'].setValue(user.street);
        this.form.controls['apartment'].setValue(user.apartment);
        this.form.controls['city'].setValue(user.city);
        this.form.controls['zip'].setValue(user.zip);
        this.form.controls['country'].setValue(user.country);
        this.form.controls['phone'].setValue(user.phone);
        this.userId = user?.id || '';
      });
  }
}
