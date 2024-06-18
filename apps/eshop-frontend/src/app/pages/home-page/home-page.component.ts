import { Component } from '@angular/core';
import { BannerComponent } from '@eshop/ui';

@Component({
  selector: 'client-home-page',
  standalone: true,
  imports: [
    BannerComponent
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

}
