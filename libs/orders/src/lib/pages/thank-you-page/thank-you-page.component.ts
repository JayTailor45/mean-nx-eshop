import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'orders-thank-you-page',
  standalone: true,
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './thank-you-page.component.html',
})
export class ThankYouPageComponent {

}
